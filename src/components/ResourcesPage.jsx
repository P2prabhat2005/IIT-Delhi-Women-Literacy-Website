import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { resourceCategoryOptions, resourceCollections, getStaticResourceLibrary } from '../data/resources.js';
import ResourceCard from './ResourceCard.jsx';

function ResourceSection({ collection, resources }) {
  const { Icon, accent, description, id, layout, title } = collection;
  const isDocumentList = layout === 'document-list';

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-[1.75rem] border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/50 md:p-7"
    >
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${accent}`}>
            <Icon size={14} aria-hidden="true" />
            {title}
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          {resources.length} {resources.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div
        className={
          isDocumentList
            ? 'mt-5 grid gap-3'
            : 'mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
        }
      >
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.id}
            layout={layout}
            index={index}
            resource={resource}
          />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const library = useMemo(() => {
    const resources = getStaticResourceLibrary();
    return resources.reduce((map, resource) => {
      if (!map[resource.collectionId]) map[resource.collectionId] = [];
      map[resource.collectionId].push(resource);
      return map;
    }, {});
  }, []);

  const filteredCollections = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    return resourceCollections
      .map((collection) => ({
        ...collection,
        resources: (library[collection.id] || []).filter((resource) => {
          if (!normalizedQuery) return true;
          const haystack = [
            resource.title,
            resource.subtitle,
            resource.description,
            resource.meta,
            resource.category,
            resource.categoryLabel,
            resource.typeLabel,
            resource.sourceLabel,
            ...(resource.tags || []),
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        }),
      }))
      .filter((collection) => {
        const matchesCategory = activeCategory === 'all' || collection.id === activeCategory;
        if (!matchesCategory) return false;
        if (!normalizedQuery) return true;
        return collection.resources.length > 0;
      });
  }, [activeCategory, library, searchValue]);

  const filteredResourceCount = useMemo(
    () => filteredCollections.reduce((total, collection) => total + collection.resources.length, 0),
    [filteredCollections],
  );

  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-7 text-white shadow-xl shadow-slate-300/40 md:p-9">
        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-200">Resources</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Field case studies and a practical resource library.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Case-study PDFs plus concise guides, checklists, and verified government scheme explainers for women entrepreneurs and facilitators.
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-100">
              Search guides, schemes, and case studies
            </p>
            <label className="sr-only" htmlFor="resource-search">
              Search resources
            </label>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3">
              <Search size={16} aria-hidden="true" />
              <input
                id="resource-search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search resources"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {resourceCategoryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActiveCategory(option.value)}
                  aria-pressed={activeCategory === option.value}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    activeCategory === option.value
                      ? 'bg-white text-red-900'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <p className="sr-only" role="status" aria-live="polite">
          {filteredResourceCount} {filteredResourceCount === 1 ? 'resource' : 'resources'} shown.
        </p>
        {filteredCollections.length ? (
          filteredCollections.map((collection) => (
            <ResourceSection
              key={collection.id}
              collection={collection}
              resources={collection.resources}
            />
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-600">
            No resources matched your search. Try a broader keyword or adjust the filters.
          </div>
        )}
      </div>
    </div>
  );
}
