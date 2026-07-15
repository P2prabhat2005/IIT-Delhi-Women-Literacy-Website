import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { resourceCategoryOptions } from '../data/resources.js';
import AccessibleModal from './AccessibleModal.jsx';

const categoryChoices = resourceCategoryOptions.filter((option) => option.value !== 'all');

function toTagsInput(tags) {
  return Array.isArray(tags) ? tags.join(', ') : '';
}

function fromTagsInput(value) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default function ResourceEditModal({ defaultCategory, isOpen, kind, mode, onClose, onSave, resource }) {
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    setFormState({
      title: resource?.title || '',
      subtitle: resource?.subtitle || '',
      description: resource?.description || '',
      category: resource?.category || defaultCategory,
      tagsInput: toTagsInput(resource?.tags),
      duration: resource?.duration || '',
      pages: resource?.pages || '',
      source: resource?.source || '',
      featured: resource?.featured || false,
      kind: resource?.kind || kind,
    });
  }, [isOpen, resource, defaultCategory, kind]);

  if (!isOpen || !formState) return null;

  const isVideo = formState.kind === 'video';
  const isPdf = formState.kind === 'pdf';

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      title: formState.title.trim() || 'Untitled resource',
      subtitle: formState.subtitle.trim(),
      description: formState.description.trim(),
      category: formState.category,
      tags: fromTagsInput(formState.tagsInput),
      duration: formState.duration.trim(),
      pages: formState.pages.trim(),
      source: formState.source.trim(),
      featured: formState.featured,
      kind: formState.kind,
    });
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={mode === 'create' ? 'Add resource' : 'Edit resource'}
      overlayClassName="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 px-4 py-6"
      className="w-full max-w-lg rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-950">
          {mode === 'create' ? 'Add Resource' : 'Edit Resource'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
          aria-label="Close resource editor"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resource-title" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Title
          </label>
          <input
            id="resource-title"
            required
            value={formState.title}
            onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </div>

        <div>
          <label htmlFor="resource-subtitle" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Subtitle
          </label>
          <input
            id="resource-subtitle"
            value={formState.subtitle}
            onChange={(event) => setFormState((current) => ({ ...current, subtitle: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </div>

        <div>
          <label htmlFor="resource-description" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Description
          </label>
          <textarea
            id="resource-description"
            rows={3}
            value={formState.description}
            onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="resource-category" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              id="resource-category"
              value={formState.category}
              onChange={(event) => setFormState((current) => ({ ...current, category: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
            >
              {categoryChoices.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="resource-source" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Source
            </label>
            <input
              id="resource-source"
              value={formState.source}
              onChange={(event) => setFormState((current) => ({ ...current, source: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
            />
          </div>
        </div>

        <div>
          <label htmlFor="resource-tags" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tags (comma separated)
          </label>
          <input
            id="resource-tags"
            value={formState.tagsInput}
            onChange={(event) => setFormState((current) => ({ ...current, tagsInput: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </div>

        {isVideo || isPdf ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {isVideo ? (
              <div>
                <label htmlFor="resource-duration" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Duration
                </label>
                <input
                  id="resource-duration"
                  placeholder="e.g. 6 min"
                  value={formState.duration}
                  onChange={(event) => setFormState((current) => ({ ...current, duration: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
                />
              </div>
            ) : null}
            {isPdf ? (
              <div>
                <label htmlFor="resource-pages" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pages
                </label>
                <input
                  id="resource-pages"
                  placeholder="e.g. 3"
                  value={formState.pages}
                  onChange={(event) => setFormState((current) => ({ ...current, pages: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={formState.featured}
            onChange={(event) => setFormState((current) => ({ ...current, featured: event.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-red-800 focus:ring-red-800"
          />
          Featured resource
        </label>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {mode === 'create' ? 'Add Resource' : 'Save Changes'}
          </button>
        </div>
      </form>
    </AccessibleModal>
  );
}
