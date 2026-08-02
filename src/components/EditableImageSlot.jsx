import { ImageUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Display-only image slot (same public empty-state and image styling as before).
 * Upload / auth / toolbar behaviour has been removed for the static site.
 */
export default function EditableImageSlot({
  alt = '',
  aspectRatio = '',
  className = '',
  compact = false,
  emptyClassName = '',
  emptyTextClassName = '',
  image,
  title = 'Official Project Photograph',
  wrapperClassName = '',
}) {
  const [previewUrl, setPreviewUrl] = useState(image || null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(Boolean(image));

  useEffect(() => {
    if (image === undefined) return;
    setPreviewUrl(image || null);
    setIsPreviewVisible(Boolean(image));
  }, [image]);

  const hasPreview = Boolean(previewUrl);

  return (
    <div className={wrapperClassName}>
      <div className={`group relative overflow-hidden ${aspectRatio} ${className}`}>
        {hasPreview ? (
          <img
            src={previewUrl}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => {
              requestAnimationFrame(() => setIsPreviewVisible(true));
            }}
            onError={() => {
              setPreviewUrl(null);
              setIsPreviewVisible(false);
            }}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-300 ease-out motion-safe:group-hover:scale-[1.03] ${
              isPreviewVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className={`flex h-full w-full flex-col items-center justify-center px-4 text-center ${emptyClassName}`}>
            <ImageUp size={compact ? 22 : 28} aria-hidden="true" className="text-slate-500" />
            {compact ? (
              <span className="sr-only">{title}</span>
            ) : (
              <p className={`mt-3 text-sm font-semibold ${emptyTextClassName || 'text-slate-800'}`}>{title}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
