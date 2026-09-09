import { useEffect } from 'react';
import { stopLenis, startLenis } from '../utils/lenis';

let activeLocksCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

/**
 * Hook to lock body scroll when a modal/dialog is open.
 * Prevents background page scrolling while allowing smooth scrolling inside the modal.
 * Stops Lenis smooth scroller so wheel events are not intercepted and redirected to the page.
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    if (activeLocksCount === 0) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // Stop Lenis smooth scroll engine
      stopLenis();
    }

    activeLocksCount++;

    // Prevent background dragging on backdrop for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow scroll inside modal scrollable areas
      if (target && (target.closest('.modal-scrollable-content') || target.closest('[data-lenis-prevent]'))) {
        return;
      }
      // Block dragging on backdrop/outside
      if (target && !target.closest('[role="dialog"]')) {
        e.preventDefault();
      }
    };

    // Prevent wheel bleed-through on the dark backdrop itself
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow wheel inside modal content
      if (target && (target.closest('.modal-scrollable-content') || target.closest('[data-lenis-prevent]'))) {
        return;
      }
      // If user wheels directly on backdrop, prevent scrolling the page
      if (target && !target.closest('[role="dialog"]')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      activeLocksCount = Math.max(0, activeLocksCount - 1);

      if (activeLocksCount === 0) {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        // Resume Lenis smooth scroll engine
        startLenis();
      }

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isLocked]);
};
