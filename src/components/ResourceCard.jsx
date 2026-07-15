import {
  ArrowUpRight,
  Copy,
  Download,
  FileText,
  FileUp,
  GripVertical,
  ImageUp,
  Pencil,
  PlayCircle,
  Sparkles,
  Trash2,
  Video,
} from 'lucide-react';
import { IMAGE_ACCEPT, PDF_ACCEPT, VIDEO_ACCEPT } from '../utils/editableMediaStorage.js';
import EditableAssetControl from './EditableAssetControl.jsx';

const kindLabel = { pdf: 'PDF', video: 'Video', scheme: 'Scheme' };

export default function ResourceCard({
  collection,
  isAdminMode,
  onDragEnd,
  onDragOver,
  onDragStart,
  onDrop,
  onEdit,
  onOpenModal,
  onOpenVideo,
  resource,
}) {
  const isPlaceholderAction = resource.kind === 'pdf' || resource.kind === 'video';
  const hasThumbnail = Boolean(resource.thumbnail?.url);
  const hasDocument = Boolean(resource.document?.url);
  const hasVideo = Boolean(resource.video?.url);
  const hasResolvedMedia = (resource.kind === 'pdf' && hasDocument) || (resource.kind === 'video' && hasVideo);

  const handlePrimaryAction = () => {
    if (resource.kind === 'pdf' && hasDocument) {
      window.open(resource.document.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (resource.kind === 'video' && hasVideo) {
      onOpenVideo(resource);
      return;
    }
    onOpenModal(resource);
  };

  return (
    <div
      draggable={isAdminMode}
      onDragStart={isAdminMode ? (event) => onDragStart(event, resource) : undefined}
      onDragOver={isAdminMode ? (event) => onDragOver(event, resource) : undefined}
      onDrop={isAdminMode ? (event) => onDrop(event, resource) : undefined}
      onDragEnd={isAdminMode ? onDragEnd : undefined}
      className="group relative flex h-full flex-col rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {isAdminMode ? (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full border border-slate-200 bg-white/95 p-1 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="cursor-grab px-1 text-slate-400" aria-hidden="true">
            <GripVertical size={14} />
          </span>
          <button
            type="button"
            onClick={() => onEdit(resource, 'edit')}
            aria-label={`Edit ${resource.title}`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Pencil size={13} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(resource, 'duplicate')}
            aria-label={`Duplicate ${resource.title}`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Copy size={13} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(resource, 'delete')}
            aria-label={`Delete ${resource.title}`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={13} aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[1.2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-red-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-900 shadow-sm">
            <collection.Icon size={20} aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2">
            {resource.featured ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800">
                Featured
              </span>
            ) : null}
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {kindLabel[resource.kind] || 'Resource'}
            </span>
          </div>
        </div>

        {hasThumbnail ? (
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img src={resource.thumbnail.url} alt="" className="h-40 w-full object-cover" />
            {isAdminMode ? (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/95 p-1 shadow-sm">
                <EditableAssetControl
                  accept={IMAGE_ACCEPT}
                  hasAsset={hasThumbnail}
                  Icon={ImageUp}
                  label={`${resource.title} thumbnail`}
                  onAttach={(file) => onEdit(resource, 'attach-thumbnail', file)}
                  onRemove={() => onEdit(resource, 'remove-thumbnail')}
                  tone="light"
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="relative mt-4 rounded-2xl border border-slate-200 bg-white/85 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Sparkles size={14} aria-hidden="true" />
              Professional preview
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-900 shadow-sm">
                {resource.kind === 'video' ? <PlayCircle size={18} aria-hidden="true" /> : <FileText size={18} aria-hidden="true" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {resource.kind === 'video' ? 'Video thumbnail preview' : 'Document thumbnail preview'}
                </p>
                <p className="text-xs text-slate-500">Final media will be uploaded by the Project Bharti Team.</p>
              </div>
            </div>
            {isAdminMode ? (
              <div className="mt-3 flex justify-end">
                <EditableAssetControl
                  accept={IMAGE_ACCEPT}
                  hasAsset={hasThumbnail}
                  Icon={ImageUp}
                  label={`${resource.title} thumbnail`}
                  onAttach={(file) => onEdit(resource, 'attach-thumbnail', file)}
                  onRemove={() => onEdit(resource, 'remove-thumbnail')}
                  tone="light"
                />
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-5 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-800">{resource.meta}</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-950">{resource.title}</h3>
        {resource.subtitle ? <p className="mt-1 text-sm font-medium text-slate-500">{resource.subtitle}</p> : null}
        <p className="mt-4 text-sm leading-7 text-slate-600">{resource.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {hasResolvedMedia ? (
          <>
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              {resource.kind === 'video' ? 'Play Video' : 'Open PDF'}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            {resource.kind === 'pdf' ? (
              <a
                href={resource.document.url}
                download={resource.document.fileName || 'resource.pdf'}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            ) : null}
          </>
        ) : isPlaceholderAction ? (
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Preview coming soon
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            Official resources will be added by the Project Bharti Team.
          </div>
        )}

        {isAdminMode && resource.kind === 'pdf' ? (
          <EditableAssetControl
            accept={PDF_ACCEPT}
            hasAsset={hasDocument}
            Icon={FileUp}
            label={`${resource.title} PDF`}
            onAttach={(file) => onEdit(resource, 'attach-document', file)}
            onRemove={() => onEdit(resource, 'remove-document')}
            tone="light"
          />
        ) : null}

        {isAdminMode && resource.kind === 'video' ? (
          <EditableAssetControl
            accept={VIDEO_ACCEPT}
            hasAsset={hasVideo}
            Icon={Video}
            label={`${resource.title} video`}
            onAttach={(file) => onEdit(resource, 'attach-video', file)}
            onRemove={() => onEdit(resource, 'remove-video')}
            tone="light"
          />
        ) : null}
      </div>
    </div>
  );
}
