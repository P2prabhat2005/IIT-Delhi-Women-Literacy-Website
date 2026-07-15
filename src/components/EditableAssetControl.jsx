import { X } from 'lucide-react';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Generic subtle upload/replace/remove control used for any editable media
 * asset (PDF, thumbnail image, video). Kept visually minimal so it can be
 * dropped onto existing cards without altering their layout.
 */
const TONE_CLASSES = {
  dark: 'text-white/35 hover:bg-white/10 hover:text-white/70 focus-visible:ring-white/40',
  light: 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-slate-300',
};

export default function EditableAssetControl({
  accept,
  allowRemove,
  allowUpload,
  hasAsset = false,
  Icon,
  label = 'asset',
  onAttach,
  onRemove,
  tone = 'dark',
}) {
  const { isAdmin } = useAuth();
  const inputRef = useRef(null);
  const canRemove = allowRemove ?? isAdmin;
  const isEditable = allowUpload ?? isAdmin;
  const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.dark;

  if (!isEditable) return null;

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <span
      className="ml-auto flex shrink-0 items-center gap-1"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => {
          onAttach?.(event.target.files?.[0]);
          event.target.value = '';
        }}
      />

      {hasAsset && canRemove ? (
        <button
          type="button"
          onClick={() => onRemove?.()}
          aria-label={`Remove ${label}`}
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 ${toneClass}`}
        >
          <X size={12} aria-hidden="true" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={openFilePicker}
        aria-label={hasAsset ? `Replace ${label}` : `Upload ${label}`}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 ${toneClass}`}
      >
        <Icon size={13} aria-hidden="true" />
      </button>
    </span>
  );
}
