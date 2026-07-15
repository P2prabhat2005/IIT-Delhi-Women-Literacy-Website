import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  FileText,
  Handshake,
  MapPin,
  Newspaper,
  Pencil,
  PlayCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import indiaGeographyUrl from '../assets/maps/india-states.geojson?url';
import {
  projectBhartiStateByName,
  projectBhartiStateNames,
  projectBhartiStates,
} from '../data/stateImpact.js';
import { DEV_IMAGE_EDITOR } from '../config/development.js';
import EditableImageSlot from './EditableImageSlot.jsx';
import SectionTitle from './SectionTitle.jsx';

const metricIconMap = {
  MapPin,
  Users: UsersRound,
  BookOpen: BookOpenCheck,
  Shield: ShieldCheck,
  Handshake,
  FileText,
};

let mediaEntrySequence = 0;

const createEntryId = (groupKey) => `${groupKey}-${Date.now()}-${mediaEntrySequence++}`;
const releaseObjectUrl = (url) => {
  if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
};

function createMediaEntry(groupKey, item = {}) {
  const id = item.id || createEntryId(groupKey);

  if (groupKey === 'gallery') return { id, image: item.image || item.url || null };
  if (groupKey === 'activities') return { id, title: item.title || '', date: item.date || '', description: item.description || '', image: item.image || null };
  if (groupKey === 'videos') return { id, title: item.title || '', url: item.url || '' };
  if (groupKey === 'research') return { id, title: item.title || '', fileName: item.fileName || '', url: item.url || '' };
  return { id, title: item.title || '', date: item.date || '', description: item.description || '', link: item.link || '' };
}

function createMediaContent(mediaGroups = []) {
  return mediaGroups.reduce((content, group) => ({
    ...content,
    [group.key]: (group.items || []).map((item) => createMediaEntry(group.key, item)),
  }), {});
}

const fieldClassName = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100';

function EditorButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function DrawerImageSlot({ image, ...props }) {
  const initialImageRef = useRef(image || undefined);

  return <EditableImageSlot image={initialImageRef.current} {...props} />;
}

function GalleryEditor({ entries, onChange, stateName }) {
  const [addSlotKey, setAddSlotKey] = useState(0);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map((entry, index) => (
        <DrawerImageSlot
          key={entry.id}
          image={entry.image}
          onChange={(_file, image) => {
            if (!image) {
              releaseObjectUrl(entry.image);
              onChange(entries.filter((item) => item.id !== entry.id));
              return;
            }
            releaseObjectUrl(entry.image);
            onChange(entries.map((item) => (item.id === entry.id ? { ...item, image } : item)));
          }}
          title={`Gallery image ${index + 1}`}
          alt={`${stateName} gallery image ${index + 1}`}
          aspectRatio="aspect-[4/3]"
          className="rounded-xl border border-slate-200 bg-white shadow-sm"
        />
      ))}
      {DEV_IMAGE_EDITOR ? (
        <DrawerImageSlot
          key={addSlotKey}
          onChange={(_file, image) => {
            if (!image) return;
            onChange([...entries, createMediaEntry('gallery', { image })]);
            setAddSlotKey((key) => key + 1);
          }}
          title="Add Image"
          alt={`${stateName} gallery image`}
          aspectRatio="aspect-[4/3]"
          className="rounded-xl border border-dashed border-slate-300 bg-white shadow-sm"
        />
      ) : null}
    </div>
  );
}

function ActivityEditor({ entries, onChange, stateName }) {
  const updateEntry = (id, patch) => onChange(entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800">Activity {index + 1}</p>
            {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange(entries.filter((item) => item.id !== entry.id))} aria-label={`Remove activity ${index + 1}`}><Trash2 size={13} aria-hidden="true" />Remove</EditorButton> : null}
          </div>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Title<input className={fieldClassName} value={entry.title} onChange={(event) => updateEntry(entry.id, { title: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Date<input type="date" className={fieldClassName} value={entry.date} onChange={(event) => updateEntry(entry.id, { date: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Description<textarea className={`${fieldClassName} min-h-24 resize-y`} value={entry.description} onChange={(event) => updateEntry(entry.id, { description: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <DrawerImageSlot
            image={entry.image}
            onChange={(_file, image) => updateEntry(entry.id, { image })}
            title="Optional activity image"
            alt={`${stateName} activity ${index + 1}`}
            aspectRatio="aspect-[4/3]"
            className="mt-3 rounded-xl border border-slate-200 bg-slate-50"
          />
        </div>
      ))}
      {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange([...entries, createMediaEntry('activities')])}><Plus size={13} aria-hidden="true" />Add Activity</EditorButton> : null}
    </div>
  );
}

function VideosEditor({ entries, onChange }) {
  const updateEntry = (id, patch) => onChange(entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800"><PlayCircle size={15} aria-hidden="true" />Video {index + 1}</p>
            {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange(entries.filter((item) => item.id !== entry.id))} aria-label={`Remove video ${index + 1}`}><Trash2 size={13} aria-hidden="true" />Remove</EditorButton> : null}
          </div>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Title<input className={fieldClassName} value={entry.title} onChange={(event) => updateEntry(entry.id, { title: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Video URL<input type="url" className={fieldClassName} value={entry.url} onChange={(event) => updateEntry(entry.id, { url: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
        </div>
      ))}
      {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange([...entries, createMediaEntry('videos')])}><Plus size={13} aria-hidden="true" />Add Video</EditorButton> : null}
    </div>
  );
}

function ResearchDocumentEditor({ entries, onChange }) {
  const updateEntry = (id, patch) => onChange(entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <ResearchDocumentCard key={entry.id} entry={entry} index={index} onUpdate={(patch) => updateEntry(entry.id, patch)} onRemove={() => {
          releaseObjectUrl(entry.url);
          onChange(entries.filter((item) => item.id !== entry.id));
        }} />
      ))}
      {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange([...entries, createMediaEntry('research')])}><Plus size={13} aria-hidden="true" />Add Document</EditorButton> : null}
    </div>
  );
}

function ResearchDocumentCard({ entry, index, onRemove, onUpdate }) {
  const inputRef = useRef(null);
  const [validationMessage, setValidationMessage] = useState('');

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setValidationMessage('Use a PDF document.');
      return;
    }
    releaseObjectUrl(entry.url);
    setValidationMessage('');
    onUpdate({ fileName: file.name, url: URL.createObjectURL(file) });
  };

  return (
    <div className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800"><FileText size={15} aria-hidden="true" />Document {index + 1}</p>
        {DEV_IMAGE_EDITOR ? <EditorButton onClick={onRemove} aria-label={`Remove document ${index + 1}`}><Trash2 size={13} aria-hidden="true" />Remove</EditorButton> : null}
      </div>
      <label className="mt-3 block text-xs font-semibold text-slate-600">Title<input className={fieldClassName} value={entry.title} onChange={(event) => onUpdate({ title: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
      {DEV_IMAGE_EDITOR ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input ref={inputRef} type="file" accept="application/pdf" className="sr-only" onChange={(event) => { handleFile(event.target.files?.[0]); event.target.value = ''; }} />
          <EditorButton onClick={() => inputRef.current?.click()}><Pencil size={13} aria-hidden="true" />{entry.url ? 'Replace PDF' : 'Upload PDF'}</EditorButton>
          {entry.fileName ? <span className="max-w-full truncate text-xs text-slate-500">{entry.fileName}</span> : null}
        </div>
      ) : entry.fileName ? <p className="mt-3 text-xs text-slate-500">{entry.fileName}</p> : null}
      {validationMessage ? <p role="alert" className="mt-2 text-xs font-medium text-red-800">{validationMessage}</p> : null}
    </div>
  );
}

function NewsEditor({ entries, onChange }) {
  const updateEntry = (id, patch) => onChange(entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800"><Newspaper size={15} aria-hidden="true" />News {index + 1}</p>
            {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange(entries.filter((item) => item.id !== entry.id))} aria-label={`Remove news item ${index + 1}`}><Trash2 size={13} aria-hidden="true" />Remove</EditorButton> : null}
          </div>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Title<input className={fieldClassName} value={entry.title} onChange={(event) => updateEntry(entry.id, { title: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Date<input type="date" className={fieldClassName} value={entry.date} onChange={(event) => updateEntry(entry.id, { date: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Description<textarea className={`${fieldClassName} min-h-24 resize-y`} value={entry.description} onChange={(event) => updateEntry(entry.id, { description: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
          <label className="mt-3 block text-xs font-semibold text-slate-600">Optional Link<input type="url" className={fieldClassName} value={entry.link} onChange={(event) => updateEntry(entry.id, { link: event.target.value })} readOnly={!DEV_IMAGE_EDITOR} /></label>
        </div>
      ))}
      {DEV_IMAGE_EDITOR ? <EditorButton onClick={() => onChange([...entries, createMediaEntry('news')])}><Plus size={13} aria-hidden="true" />Add News</EditorButton> : null}
    </div>
  );
}

function MediaGroupEditor({ entries, group, onChange, stateName }) {
  if (group.key === 'gallery') return <GalleryEditor entries={entries} onChange={onChange} stateName={stateName} />;
  if (group.key === 'activities') return <ActivityEditor entries={entries} onChange={onChange} stateName={stateName} />;
  if (group.key === 'videos') return <VideosEditor entries={entries} onChange={onChange} />;
  if (group.key === 'research') return <ResearchDocumentEditor entries={entries} onChange={onChange} />;
  return <NewsEditor entries={entries} onChange={onChange} />;
}

function StatePanel({ onClose, selectedState }) {
  const [openSection, setOpenSection] = useState('gallery');
  const [mediaContent, setMediaContent] = useState(() => createMediaContent(selectedState?.mediaGroups));
  const closeButtonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setOpenSection('gallery');
    setMediaContent(createMediaContent(selectedState?.mediaGroups));
  }, [selectedState]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!selectedState) return null;

  const accordionSections = selectedState.mediaGroups;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] bg-slate-950/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        onClick={onClose}
      >
        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedState.stateName} project details`}
          className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl md:bottom-auto md:left-auto md:top-0 md:h-full md:max-h-none md:w-[440px] md:rounded-l-[2rem] md:rounded-tr-none md:p-8"
          initial={{ y: '100%', x: 0 }}
          animate={{ y: 0, x: 0 }}
          exit={{ y: '100%', x: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-10 -mx-6 border-b border-slate-200 bg-white/95 px-6 pb-4 pt-2 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">Project Bharti</p>
                <h3 id="state-sidebar-title" className="mt-2 text-3xl font-semibold text-slate-950">{selectedState.stateName}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-900">
                    {selectedState.status}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {selectedState.lastUpdated}
                  </span>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                aria-label="Close state details"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-6 pb-4 pt-5">
            <section>
              <p className="leading-7 text-slate-600">{selectedState.overview}</p>
            </section>

            <section className={`grid gap-3 ${selectedState.metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {selectedState.metrics.map((metric) => {
                const Icon = metricIconMap[metric.icon] || Sparkles;
                return (
                  <div key={metric.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-900">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-slate-950">{metric.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
                  </div>
                );
              })}
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-800">
                <Sparkles size={14} aria-hidden="true" />
                Focus areas
              </div>
              <ul className="mt-4 space-y-3">
                {selectedState.objectives.map((objective) => (
                  <li key={objective} className="flex gap-3 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-700 shadow-sm">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-800" />
                    {objective}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <MapPin size={14} aria-hidden="true" />
                District coverage summary
              </div>
              <h4 className="mt-4 text-lg font-semibold text-slate-950">{selectedState.districtSummary.title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600">{selectedState.districtSummary.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedState.districtSummary.districts.map((district) => (
                  <span key={district} className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-900">
                    {district}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <ShieldCheck size={14} aria-hidden="true" />
                Implementation snapshot
              </div>
              <h4 className="mt-4 text-lg font-semibold text-slate-950">{selectedState.implementationSnapshot.title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600">{selectedState.implementationSnapshot.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Partners</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{selectedState.implementationSnapshot.partners.join(' • ')}</p>
                </div>
                <div className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Focus</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{selectedState.implementationSnapshot.focus.join(' • ')}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <ArrowRight size={14} aria-hidden="true" />
                Project timeline
              </div>
              <div className="mt-5 space-y-4">
                {selectedState.timeline.map((step, index) => (
                  <div key={step.label} className="relative pl-7">
                    <span className={`absolute left-0 top-1 h-3 w-3 rounded-full ${step.status === 'completed' ? 'bg-red-800' : step.status === 'current' ? 'bg-red-500' : 'bg-slate-300'}`} />
                    {index < selectedState.timeline.length - 1 ? <span className="absolute left-[5px] top-4 h-full w-px bg-slate-200" /> : null}
                    <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                          {step.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-3">
                {accordionSections.map((group) => {
                  const isOpen = openSection === group.key;
                  const entries = mediaContent[group.key] || [];

                  return (
                    <div key={group.key} className="rounded-[1.15rem] border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                        onClick={() => setOpenSection(isOpen ? '' : group.key)}
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-semibold text-slate-900">
                          {group.label} ({entries.length})
                        </span>
                        <ChevronDown size={16} className={`shrink-0 text-slate-600 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      {isOpen ? (
                        <div className="px-4 pb-4">
                          <MediaGroupEditor
                            entries={entries}
                            group={group}
                            stateName={selectedState.stateName}
                            onChange={(nextEntries) => setMediaContent((current) => ({
                              ...current,
                              [group.key]: nextEntries,
                            }))}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/70">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-200">Professional collaboration</p>
              <h4 className="mt-3 text-xl font-semibold">{selectedState.cta.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">{selectedState.cta.description}</p>
              <div className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100">
                {selectedState.cta.label}
              </div>
            </section>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

export default function InteractiveIndiaMap() {
  const [indiaGeography, setIndiaGeography] = useState(null);
  const [mapError, setMapError] = useState('');
  const [selectedState, setSelectedState] = useState(projectBhartiStates[0]);
  const [activeStateName, setActiveStateName] = useState(projectBhartiStates[0].stateName);
  const highlightedStateSet = useMemo(() => new Set(projectBhartiStateNames), []);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      try {
        const response = await fetch(indiaGeographyUrl);

        if (!response.ok) {
          throw new Error(`Unable to load map data (${response.status})`);
        }

        const geography = await response.json();

        if (isMounted) {
          setIndiaGeography(geography);
          setMapError('');
        }
      } catch (error) {
        if (isMounted) {
          setMapError(error.message || 'Unable to load map data.');
        }
      }
    }

    loadMap();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStateSelect = (stateName) => {
    const nextState = projectBhartiStateByName[stateName];

    if (!nextState) return;

    setSelectedState(nextState);
    setActiveStateName(stateName);
    setIsPanelOpen(true);
  };

  return (
    <section aria-labelledby="india-map-title" className="interactive-india-map section bg-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Impact Across India"
              id="india-map-title"
              description="A scalable state-wise engine for Project Bharti field activity, media, research documents, and future impact reporting."
            >
              Interactive map foundation for project expansion.
            </SectionTitle>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {projectBhartiStates.map((state) => {
                const stateKey = state.id || state.stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                return (
                  <button
                    key={stateKey}
                    type="button"
                    onClick={() => handleStateSelect(state.stateName)}
                    className={`group rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                      activeStateName === state.stateName
                        ? 'border-red-200 bg-red-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-red-900 shadow-sm">
                      <MapPin size={14} aria-hidden="true" />
                      {state.status}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-950">{state.stateName}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{state.overview}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/70 md:p-6">
            <div className="absolute right-6 top-6 z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              Interactive Engine
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(153,27,27,0.10),transparent_28%),linear-gradient(145deg,#ffffff,#f8fafc)] p-3 md:min-h-[520px] md:p-6">
              {mapError ? (
                <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 px-6 text-center text-sm font-semibold text-red-900">
                  {mapError}
                </div>
              ) : !indiaGeography?.features?.length ? (
                <div className="flex min-h-[320px] items-center justify-center text-sm font-semibold text-slate-500">
                  Loading map data...
                </div>
              ) : (
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ center: [82.8, 23.5], scale: 980 }}
                  className="h-full min-h-[330px] w-full md:min-h-[500px]"
                  role="img"
                  aria-label="Interactive India map showing Project Bharti states"
                >
                  <Geographies geography={indiaGeography}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const stateName = geo.properties.name;
                        const isHighlighted = highlightedStateSet.has(stateName);
                        const isActive = activeStateName === stateName;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            role={isHighlighted ? 'button' : 'img'}
                            tabIndex={isHighlighted ? 0 : -1}
                            aria-label={stateName}
                            onClick={() => handleStateSelect(stateName)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleStateSelect(stateName);
                              }
                            }}
                            style={{
                              default: {
                                fill: isActive ? '#7f1d1d' : isHighlighted ? '#b91c1c' : '#e2e8f0',
                                stroke: '#ffffff',
                                strokeWidth: isHighlighted ? 0.8 : 0.45,
                                outline: 'none',
                                transition: shouldReduceMotion ? 'none' : 'fill 180ms ease, transform 180ms ease',
                              },
                              hover: {
                                fill: isHighlighted ? '#991b1b' : '#cbd5e1',
                                stroke: '#ffffff',
                                strokeWidth: isHighlighted ? 1.1 : 0.45,
                                outline: 'none',
                                cursor: isHighlighted ? 'pointer' : 'default',
                              },
                              pressed: {
                                fill: '#7f1d1d',
                                outline: 'none',
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-700" />
                Project Bharti states
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                Future expansion
              </span>
            </div>
          </div>
        </div>
      </div>

      {isPanelOpen ? (
        <StatePanel selectedState={selectedState} onClose={() => setIsPanelOpen(false)} />
      ) : null}
    </section>
  );
}
