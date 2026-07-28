import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import AccessibleModal from './AccessibleModal.jsx';

export default function MediaLightbox({ items = [], initialIndex = 0, isOpen, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const total = items.length;
  const current = total > 0 ? items[((index % total) + total) % total] : null;

  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen || total < 2) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex((value) => (value - 1 + total) % total);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex((value) => (value + 1) % total);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, total]);

  if (!current) return null;

  const goPrevious = () => setIndex((value) => (value - 1 + total) % total);
  const goNext = () => setIndex((value) => (value + 1) % total);

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={current.alt || 'Media preview'}
      closeOnOverlayClick
      overlayClassName="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 px-3 py-6 sm:px-6"
      className="relative flex h-full max-h-[min(92vh,920px)] w-full max-w-6xl flex-col outline-none"
    >
      <div className="mb-3 flex items-center justify-between gap-3 text-white">
        <p className="min-w-0 truncate text-sm font-medium text-slate-200">
          {current.caption || 'Media'}
          {total > 1 ? (
            <span className="ml-2 text-slate-400">
              {index + 1} / {total}
            </span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close media preview"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {total > 1 ? (
          <button
            type="button"
            onClick={goPrevious}
            className="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white transition hover:bg-slate-950/80 sm:left-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
        ) : null}

        <img
          key={current.id}
          src={current.src}
          alt={current.alt}
          className="max-h-full max-w-full object-contain"
        />

        {total > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white transition hover:bg-slate-950/80 sm:right-2"
            aria-label="Next image"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </AccessibleModal>
  );
}
