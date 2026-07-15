import { useMemo, useState } from 'react';
import { ArrowUpRight, FileText, PlayCircle, Search, Sparkles, X } from 'lucide-react';
import { resourceCategoryOptions, resourceCollections } from '../data/resources.js';
import AccessibleModal from './AccessibleModal.jsx';

function ResourceItem({ collection, item, onOpenModal }) {
  const isPlaceholderAction = item.kind === 'pdf' || item.kind === 'video';

  return (
    <div className="group flex h-full flex-col rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="overflow-hidden rounded-[1.2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-red-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-900 shadow-sm">
            <collection.Icon size={20} aria-hidden="true" />
          </div>
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            {item.kind === 'pdf' ? 'PDF' : item.kind === 'video' ? 'Video' : item.kind === 'scheme' ? 'Scheme' : 'Resource'}
          </span>
        </div>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white/85 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <Sparkles size={14} aria-hidden="true" />
            Professional preview
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-900 shadow-sm">
              {item.kind === 'video' ? <PlayCircle size={18} aria-hidden="true" /> : <FileText size={18} aria-hidden="true" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.kind === 'video' ? 'Video thumbnail preview' : 'Document thumbnail preview'}
              </p>
              <p className="text-xs text-slate-500">Final media will be uploaded by the Project Bharti Team.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-800">{item.meta}</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      {isPlaceholderAction ? (
        <button
          type="button"
          onClick={() => onOpenModal(item)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          Preview coming soon
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      ) : (
        <div className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          Official resources will be added by the Project Bharti Team.
        </div>
      )}
    </div>
  );
}

function ResourceSection({ collection, onOpenModal }) {
  const { Icon, accent, description, id, items, title } = collection;

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
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <ResourceItem key={item.title} collection={collection} item={item} onOpenModal={onOpenModal} />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  const filteredCollections = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    return resourceCollections.filter((collection) => {
      const matchesCategory = activeCategory === 'all' || collection.id === activeCategory;
      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      return [collection.title, collection.description, ...collection.items.flatMap((item) => [item.title, item.description, ...item.tags])]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [activeCategory, searchValue]);

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

      <div className="space-y-6">
        {filteredCollections.length ? (
          filteredCollections.map((collection) => (
            <ResourceSection key={collection.id} collection={collection} onOpenModal={setActiveModal} />
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
    </div>
  );
}
