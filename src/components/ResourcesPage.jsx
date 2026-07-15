import { useMemo, useRef, useState } from 'react';
import { FileText, Plus, PlayCircle, Search, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { resourceCategoryOptions, resourceCollections } from '../data/resources.js';
import { useResourceLibrary } from '../hooks/useResourceLibrary.js';
import AccessibleModal from './AccessibleModal.jsx';
import ResourceCard from './ResourceCard.jsx';
import ResourceEditModal from './ResourceEditModal.jsx';

const DEFAULT_KIND_BY_COLLECTION = {
  'downloadable-pdfs': 'pdf',
  videos: 'video',
  'government-schemes': 'scheme',
  'training-material': 'pdf',
  'financial-literacy': 'pdf',
  'digital-literacy': 'pdf',
};

function ResourceSection({ collection, editorState, isAdminMode, library, onOpenModal, onOpenVideo, resources }) {
  const { Icon, accent, description, id, title } = collection;
  const dragState = useRef(null);

  const handleDragStart = (event, resource) => {
    dragState.current = resource.id;
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetResource) => {
    event.preventDefault();
    const draggedId = dragState.current;
    if (!draggedId || draggedId === targetResource.id) return;
    const fallbackOrder = resources.map((item) => item.id);
    library.moveBefore(id, draggedId, targetResource.id, fallbackOrder);
    dragState.current = null;
  };

  const handleDragEnd = () => {
    dragState.current = null;
  };

  return (
    <section id={id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${accent}`}>
            <Icon size={15} aria-hidden="true" />
            {title}
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {isAdminMode ? (
          <button
            type="button"
            onClick={() => editorState.openCreate(collection)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={16} aria-hidden="true" />
            Add Resource
          </button>
        ) : null}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            collection={collection}
            resource={resource}
            isAdminMode={isAdminMode}
            onOpenModal={onOpenModal}
            onOpenVideo={onOpenVideo}
            onEdit={editorState.handleCardAction}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [editorTarget, setEditorTarget] = useState(null);

  const library = useResourceLibrary();
  const { isAdmin: isAdminMode } = useAuth();

  const filteredCollections = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    return resourceCollections
      .map((collection) => ({
        ...collection,
        resources: library.library[collection.id] || [],
      }))
      .filter((collection) => {
        const matchesCategory = activeCategory === 'all' || collection.id === activeCategory;
        if (!matchesCategory) return false;

        if (!normalizedQuery) return true;

        const haystack = [
          collection.title,
          collection.description,
          ...collection.resources.flatMap((resource) => [
            resource.title,
            resource.description,
            resource.category,
            ...resource.tags,
          ]),
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      });
  }, [activeCategory, library.library, searchValue]);

  const editorState = {
    openCreate: (collection) => {
      setEditorTarget({
        mode: 'create',
        collectionId: collection.id,
        resource: null,
        kind: DEFAULT_KIND_BY_COLLECTION[collection.id] || 'pdf',
      });
    },
    handleCardAction: (resource, action, file) => {
      const { collectionId } = resource;

      switch (action) {
        case 'edit':
          setEditorTarget({ mode: 'edit', collectionId, resource, kind: resource.kind });
          break;
        case 'duplicate':
          library.duplicateResource(collectionId, resource);
          break;
        case 'delete':
          if (window.confirm(`Delete "${resource.title}"? This cannot be undone.`)) {
            library.deleteResource(collectionId, resource.id);
          }
          break;
        case 'attach-thumbnail':
          library.attachThumbnail(collectionId, resource, file);
          break;
        case 'remove-thumbnail':
          library.removeThumbnail(collectionId, resource.id);
          break;
        case 'attach-document':
          library.attachDocument(collectionId, resource, file);
          break;
        case 'remove-document':
          library.removeDocument(collectionId, resource.id);
          break;
        case 'attach-video':
          library.attachVideo(collectionId, resource, file);
          break;
        case 'remove-video':
          library.removeVideo(collectionId, resource.id);
          break;
        default:
          break;
      }
    },
  };

  const handleSaveEditor = (fields) => {
    if (editorTarget.mode === 'create') {
      library.addResource(editorTarget.collectionId, fields);
    } else {
      library.updateContent(editorTarget.collectionId, editorTarget.resource.id, fields);
    }
    setEditorTarget(null);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-8 text-white shadow-2xl shadow-slate-300/70 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-200">Resources</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Practical resources for learning, implementation, and scale.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Explore downloadable material, short videos, scheme references, and training content aligned to Project Bharti’s financial and digital literacy goals.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-100">
              Content will be added by the Project Bharti team.
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Search size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Quick discovery</p>
                <p className="text-sm text-slate-300">Search by topic, category, or resource type.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <label className="sr-only" htmlFor="resource-search">
                Search resources
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3">
                <Search size={16} aria-hidden="true" />
                <input
                  id="resource-search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search resources"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {resourceCategoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setActiveCategory(option.value)}
                    className={`rounded-full px-3 py-2 text-sm font-semibold transition ${activeCategory === option.value ? 'bg-white text-red-900' : 'bg-white/10 text-slate-200 hover:bg-white/20'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {library.validationMessage ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {library.validationMessage}
        </div>
      ) : null}

      <div className="space-y-6">
        {filteredCollections.length ? (
          filteredCollections.map((collection) => (
            <ResourceSection
              key={collection.id}
              collection={collection}
              resources={collection.resources}
              isAdminMode={isAdminMode}
              library={library}
              editorState={editorState}
              onOpenModal={setActiveModal}
              onOpenVideo={setActiveVideo}
            />
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-600">
            No resources matched your search. Try a broader keyword or switch filters.
          </div>
        )}
      </div>

      <AccessibleModal
        isOpen={Boolean(activeModal)}
        onClose={() => setActiveModal(null)}
        ariaLabel="Resource preview information"
        overlayClassName="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 px-4 py-6"
        className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl"
      >
        {activeModal ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-900">
                  {activeModal.kind === 'video' ? <PlayCircle size={18} aria-hidden="true" /> : <FileText size={18} aria-hidden="true" />}
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">Coming Soon</p>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-950">{activeModal.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                data-autofocus
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                aria-label="Close preview information"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This {activeModal.kind === 'video' ? 'video' : 'resource'} will be shared by the Project Bharti Team once the final content is ready.
            </p>
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-900">
              Official resources will be added by the Project Bharti Team.
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </>
        ) : null}
      </AccessibleModal>

      <AccessibleModal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        ariaLabel="Video player"
        overlayClassName="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 py-6"
        className="w-full max-w-2xl rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl"
      >
        {activeVideo ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-950">{activeVideo.title}</h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                data-autofocus
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                aria-label="Close video player"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <video
              key={activeVideo.video?.url}
              src={activeVideo.video?.url}
              controls
              autoPlay
              className="mt-4 w-full rounded-2xl bg-slate-950"
            />
          </>
        ) : null}
      </AccessibleModal>

      <ResourceEditModal
        isOpen={Boolean(editorTarget)}
        mode={editorTarget?.mode}
        kind={editorTarget?.kind}
        resource={editorTarget?.resource}
        defaultCategory={editorTarget?.collectionId}
        onClose={() => setEditorTarget(null)}
        onSave={handleSaveEditor}
      />
    </div>
  );
}
