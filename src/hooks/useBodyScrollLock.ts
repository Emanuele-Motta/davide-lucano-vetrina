import { useEffect } from 'react';

/**
 * Hook to lock body scroll when a modal/dialog is open.
 * Prevents background page scrolling while allowing smooth scrolling inside the modal.
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // Save previous overflow & padding
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Check scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Touch event prevent on backdrop
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      // If event originated inside a scrollable container inside modal, let it scroll
      if (target && target.closest('.modal-scrollable-content')) {
        return;
      }
      // Otherwise prevent background page dragging
      if (target && !target.closest('[role="dialog"]')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked]);
};
