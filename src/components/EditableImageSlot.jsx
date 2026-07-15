import { ImageUp, LoaderCircle, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DEV_IMAGE_EDITOR } from '../config/development.js';

const acceptedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxFileSize = 10 * 1024 * 1024;

export default function EditableImageSlot({
  allowRemove = DEV_IMAGE_EDITOR,
  allowUpload = DEV_IMAGE_EDITOR,
  alt = '',
  aspectRatio = '',
  className = '',
  compact = false,
  emptyClassName = '',
  emptyTextClassName = '',
  image,
  onChange,
  title = 'Official Project Photograph',
  wrapperClassName = '',
}) {
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);
  const dragDepthRef = useRef(0);
  const [previewUrl, setPreviewUrl] = useState(image || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(Boolean(image));
  const [validationMessage, setValidationMessage] = useState('');
  const isEditable = DEV_IMAGE_EDITOR && allowUpload;

  useEffect(() => {
    if (image === undefined) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreviewUrl(image || null);
    setIsPreviewVisible(Boolean(image));
  }, [image]);

  useEffect(() => () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
  }, []);

  const openFilePicker = () => {
    if (isEditable) inputRef.current?.click();
  };

  const applyFile = (file) => {
    if (!file) return;

    if (!acceptedTypes.has(file.type)) {
      setValidationMessage('Use a PNG, JPG, or WEBP image.');
      return;
    }

    if (file.size > maxFileSize) {
      setValidationMessage('Image files must be 10 MB or smaller.');
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextPreviewUrl;
    setValidationMessage('');
    setIsLoading(true);
    setIsPreviewVisible(false);
    setPreviewUrl(nextPreviewUrl);
    onChange?.(file, nextPreviewUrl);
  };

  const removeImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreviewUrl(null);
    setIsPreviewVisible(false);
    setIsLoading(false);
    setValidationMessage('');
    onChange?.(null, null);
  };

  const handleDragEnter = (event) => {
    if (!isEditable || !event.dataTransfer.types.includes('Files')) return;
    event.preventDefault();
    dragDepthRef.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    if (!isEditable) return;
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    if (!isEditable) return;
    event.preventDefault();
    dragDepthRef.current -= 1;
    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = (event) => {
    if (!isEditable) return;
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragging(false);
    applyFile(event.dataTransfer.files?.[0]);
  };

  const hasPreview = Boolean(previewUrl);
  const showToolbar = isEditable && hasPreview;

  return (
    <div className={wrapperClassName}>
      <div
        className={`group relative overflow-hidden ${aspectRatio} ${className} ${
          isDragging ? 'border-red-300 bg-red-50' : ''
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isEditable ? (
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              applyFile(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
        ) : null}

        {hasPreview ? (
          <img
            src={previewUrl}
            alt={alt}
            onLoad={() => {
              setIsLoading(false);
              requestAnimationFrame(() => setIsPreviewVisible(true));
            }}
            onError={() => {
              setIsLoading(false);
              setIsPreviewVisible(false);
              setValidationMessage('This image could not be previewed.');
            }}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              isPreviewVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className={`flex h-full w-full flex-col items-center justify-center px-4 text-center ${emptyClassName}`}>
            <ImageUp size={compact ? 22 : 28} aria-hidden="true" className="text-slate-500" />
            {compact ? <span className="sr-only">{title}</span> : (
              <>
                <p className={`mt-3 text-sm font-semibold ${emptyTextClassName || 'text-slate-800'}`}>{title}</p>
                {isEditable ? (
                  <>
                    <p className={`mt-1 text-xs ${emptyTextClassName || 'text-slate-500'}`}>Click or Drag &amp; Drop</p>
                    <p className={`mt-1 text-[11px] ${emptyTextClassName || 'text-slate-400'}`}>PNG • JPG • WEBP</p>
                  </>
                ) : null}
              </>
            )}
          </div>
        )}

        {isDragging ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-50/90 text-sm font-semibold text-red-900">
            Drop image here
          </div>
        ) : null}

        {isLoading ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
            <LoaderCircle size={24} className="animate-spin text-red-900" aria-label="Loading image preview" />
          </div>
        ) : null}

        {isEditable ? (
          <button
            type="button"
            onClick={openFilePicker}
            aria-label={hasPreview ? `Change ${alt || title}` : `Upload ${alt || title}`}
            className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-inset"
          />
        ) : null}

        {showToolbar ? (
          <div className="absolute bottom-3 right-3 z-30 hidden items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:flex">
            <button
              type="button"
              onClick={openFilePicker}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-800"
            >
              <Pencil size={13} aria-hidden="true" />
              Change Image
            </button>
            {allowRemove ? (
              <button
                type="button"
                onClick={removeImage}
                aria-label={`Remove ${alt || title}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100"
              >
                <Trash2 size={14} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {showToolbar ? (
        <div className="mt-3 flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openFilePicker}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Pencil size={13} aria-hidden="true" />
            Change Image
          </button>
          {allowRemove ? (
            <button
              type="button"
              onClick={removeImage}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Trash2 size={13} aria-hidden="true" />
              Remove
            </button>
          ) : null}
        </div>
      ) : null}

      {validationMessage ? <p role="alert" className="mt-2 text-xs font-medium text-red-800">{validationMessage}</p> : null}
    </div>
  );
}
