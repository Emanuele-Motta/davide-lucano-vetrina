import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  showCloseButton = true
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthMap = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
    '2xl': 'max-w-4xl'
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        data-lenis-prevent
        className={`relative z-10 w-full ${maxWidthMap[maxWidth]} bg-white rounded-[24px] shadow-2xl border border-black/[0.08] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Header if title exists */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-black/[0.06]">
            <div>
              {title && (
                <h3 id="modal-title" className="text-[20px] sm:text-[22px] font-semibold text-[#1d1d1f]">
                  {title}
                </h3>
              )}
              {description && (
                <p id="modal-description" className="text-[14px] text-[#6e6e73] mt-1">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi finestra modale"
                className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#6e6e73] hover:text-[#1d1d1f] transition-colors focus-visible:ring-2 focus-visible:ring-[#006875] focus-visible:outline-hidden cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-7 max-h-[calc(85vh-120px)] overflow-y-auto modal-scrollable-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
