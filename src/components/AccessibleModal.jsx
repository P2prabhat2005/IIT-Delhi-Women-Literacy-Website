import { useEffect, useRef } from 'react';

const focusableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(focusableSelector)).filter(
    (element) => !element.hasAttribute('hidden') && element.getClientRects().length > 0,
  );
}

export default function AccessibleModal({
  ariaLabel,
  ariaLabelledby,
  children,
  className,
  closeOnOverlayClick = false,
  isOpen,
  onClose,
  overlayClassName,
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const triggerRef = useRef(null);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusDialog = () => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const initialFocus = dialog.querySelector('[data-autofocus]');
      const [firstFocusableElement] = getFocusableElements(dialog);
      (initialFocus || firstFocusableElement || dialog).focus();
    };

    const animationFrame = window.requestAnimationFrame(focusDialog);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = getFocusableElements(dialog);
      if (!focusableElements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstFocusableElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && (activeElement === lastFocusableElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`accessible-modal ${overlayClassName || ''}`}
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        tabIndex={-1}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
