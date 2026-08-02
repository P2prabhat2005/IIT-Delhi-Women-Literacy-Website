import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  FileText,
  Handshake,
  MapPin,
  Newspaper,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import indiaGeographyUrl from '../assets/maps/india-states.geojson?url';
import {
  projectBhartiStateByMapName,
  projectBhartiStates,
} from '../data/stateImpact.js';
import EditableImageSlot from './EditableImageSlot.jsx';
import MediaLightbox from './MediaLightbox.jsx';
import SectionTitle from './SectionTitle.jsx';

const metricIconMap = {
  MapPin,
  Users: UsersRound,
  BookOpen: BookOpenCheck,
  Shield: ShieldCheck,
  Handshake,
  FileText,
};

function isLiveStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  return normalized === 'active' || normalized === 'ongoing';
}

function StatusBadge({ status, className = '' }) {
  const live = isLiveStatus(status);

  return (
    <span
      className={`${className}${live ? ' status-badge-pulse' : ''}`}
      aria-label={live ? `${status} status` : undefined}
    >
      {live ? <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" /> : null}
      {status}
    </span>
  );
}

const brightenHexColor = (color, amount = 0.12) => {
  const hex = color.replace('#', '');

  if (!/^[\da-f]{6}$/i.test(hex)) return color;

  const channels = hex.match(/\w\w/g).map((channel) => parseInt(channel, 16));
  const brightened = channels.map((channel) => Math.round(channel + (255 - channel) * amount));

  return `#${brightened.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
};

let mediaEntrySequence = 0;

const createEntryId = (groupKey) => `${groupKey}-${Date.now()}-${mediaEntrySequence++}`;

function createMediaEntry(groupKey, item = {}) {
  const id = item.id || createEntryId(groupKey);

  if (groupKey === 'gallery') {
    return {
      id,
      image: item.image || item.url || null,
      alt: item.alt || '',
      caption: item.caption || '',
    };
  }
  if (groupKey === 'activities') {
    return {
      id,
      title: item.title || '',
      date: item.date || '',
      description: item.description || '',
      image: item.image || null,
      alt: item.alt || '',
    };
  }
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

function EmptyMediaState({ label }) {
  return (
    <div className="rounded-[1.1rem] border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm font-semibold text-slate-500">
      {label} will be added soon.
    </div>
  );
}

function toLightboxItems(entries, stateName, fallbackCaption = 'Media') {
  return entries
    .filter((entry) => entry.image)
    .map((entry, index) => ({
      id: entry.id,
      src: entry.image,
      alt: entry.alt || `${stateName} ${fallbackCaption.toLowerCase()} ${index + 1}`,
      caption: entry.caption || entry.title || `${fallbackCaption} ${index + 1}`,
    }));
}

function GalleryViewer({ entries, stateName, onOpenLightbox }) {
  if (!entries.length) return <EmptyMediaState label="Gallery images" />;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map((entry, index) => (
        <button
          key={entry.id}
          type="button"
          onClick={() => onOpenLightbox?.(toLightboxItems(entries, stateName, 'Gallery'), index)}
          className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-red-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/40"
          aria-label={`Open gallery image ${index + 1}`}
        >
          <EditableImageSlot
            image={entry.image}
            title={`Gallery image ${index + 1}`}
            alt={entry.alt || `${stateName} gallery image ${index + 1}`}
            aspectRatio="aspect-[4/3]"
            className="rounded-xl bg-white"
          />
        </button>
      ))}
    </div>
  );
}

function ActivityViewer({ entries, stateName, onOpenLightbox }) {
  if (!entries.length) return <EmptyMediaState label="Activities" />;

  const lightboxItems = toLightboxItems(entries, stateName, 'Activity');

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const lightboxIndex = lightboxItems.findIndex((item) => item.id === entry.id);

        return (
          <article key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
            {entry.title ? <h4 className="text-base font-semibold text-slate-900">{entry.title}</h4> : null}
            {entry.date ? <p className="mt-2 text-xs font-semibold text-slate-500">{entry.date}</p> : null}
            {entry.description ? <p className="mt-3 text-sm leading-7 text-slate-600">{entry.description}</p> : null}
            {entry.image ? (
              <button
                type="button"
                onClick={() => onOpenLightbox?.(lightboxItems, Math.max(lightboxIndex, 0))}
                className="mt-3 block w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left transition hover:border-red-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/40"
                aria-label={`Open image for ${entry.title || 'activity'}`}
              >
                <EditableImageSlot
                  image={entry.image}
                  title={entry.title || 'Activity image'}
                  alt={entry.alt || `${stateName} activity image`}
                  aspectRatio="aspect-[4/3]"
                  className="rounded-xl bg-slate-50"
                />
              </button>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function VideosViewer({ entries }) {
  if (!entries.length) return <EmptyMediaState label="Videos" />;

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            <PlayCircle size={15} aria-hidden="true" />
            Video {index + 1}
          </p>
          {entry.title ? <h4 className="mt-3 text-base font-semibold text-slate-900">{entry.title}</h4> : null}
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-red-900 underline-offset-2 hover:underline"
            >
              Watch video
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ResearchDocumentViewer({ entries }) {
  if (!entries.length) return <EmptyMediaState label="Research documents" />;

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            <FileText size={15} aria-hidden="true" />
            Document {index + 1}
          </p>
          {entry.title ? <h4 className="mt-3 text-base font-semibold text-slate-900">{entry.title}</h4> : null}
          {entry.fileName ? <p className="mt-2 text-xs text-slate-500">{entry.fileName}</p> : null}
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-red-900 underline-offset-2 hover:underline"
            >
              Open document
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function NewsViewer({ entries }) {
  if (!entries.length) return <EmptyMediaState label="News" />;

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.1rem] border border-slate-200 bg-white p-3 shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Newspaper size={15} aria-hidden="true" />
            News {index + 1}
          </p>
          {entry.title ? <h4 className="mt-3 text-base font-semibold text-slate-900">{entry.title}</h4> : null}
          {entry.date ? <p className="mt-2 text-xs font-semibold text-slate-500">{entry.date}</p> : null}
          {entry.description ? <p className="mt-3 text-sm leading-7 text-slate-600">{entry.description}</p> : null}
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-red-900 underline-offset-2 hover:underline"
            >
              Read more
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function MediaGroupViewer({ entries, group, stateName, onOpenLightbox }) {
  if (group.key === 'gallery') {
    return <GalleryViewer entries={entries} stateName={stateName} onOpenLightbox={onOpenLightbox} />;
  }
  if (group.key === 'activities') {
    return <ActivityViewer entries={entries} stateName={stateName} onOpenLightbox={onOpenLightbox} />;
  }
  if (group.key === 'videos') return <VideosViewer entries={entries} />;
  if (group.key === 'research') return <ResearchDocumentViewer entries={entries} />;
  return <NewsViewer entries={entries} />;
}

function StatePanel({ onClose, selectedState }) {
  const [openSection, setOpenSection] = useState('gallery');
  const [lightbox, setLightbox] = useState({ isOpen: false, items: [], index: 0 });
  const mediaContent = useMemo(
    () => createMediaContent(selectedState?.mediaGroups),
    [selectedState],
  );
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isLightboxOpen = lightbox.isOpen;

  const openLightbox = (items, index = 0) => {
    if (!items?.length) return;
    setLightbox({ isOpen: true, items, index });
  };

  const closeLightbox = () => {
    setLightbox((current) => ({ ...current, isOpen: false }));
  };

  useEffect(() => {
    setOpenSection('gallery');
    setLightbox({ isOpen: false, items: [], index: 0 });
  }, [selectedState]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const handleKeyDown = (event) => {
      if (isLightboxOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(dialog.querySelectorAll(focusableSelector)).filter(
        (element) => element.getClientRects().length > 0,
      );

      if (!focusableElements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstFocusableElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && (activeElement === lastFocusableElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [onClose, isLightboxOpen]);

  if (!selectedState) return null;

  const accordionSections = selectedState.mediaGroups;

  return (
    <>
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="state-sidebar-title"
          tabIndex={-1}
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
                  <StatusBadge
                    status={selectedState.status}
                    className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-900"
                  />
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
                District list
              </div>
              <div className="mt-4 space-y-2">
                {selectedState.districts.map((district) => (
                  <div key={district.name} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-semibold text-slate-800">{district.name}</span>
                    <span className="text-sm font-semibold text-slate-600">{district.womenTrained.toLocaleString('en-IN')} women trained</span>
                  </div>
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
                        id={`state-media-trigger-${group.key}`}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                        onClick={() => setOpenSection(isOpen ? '' : group.key)}
                        aria-expanded={isOpen}
                        aria-controls={`state-media-panel-${group.key}`}
                      >
                        <span className="text-sm font-semibold text-slate-900">
                          {group.label} ({entries.length})
                        </span>
                        <ChevronDown size={16} className={`shrink-0 text-slate-600 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      {isOpen ? (
                        <div id={`state-media-panel-${group.key}`} className="px-4 pb-4" role="region" aria-labelledby={`state-media-trigger-${group.key}`}>
                          <MediaGroupViewer
                            entries={entries}
                            group={group}
                            stateName={selectedState.stateName}
                            onOpenLightbox={openLightbox}
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

    <MediaLightbox
      items={lightbox.items}
      initialIndex={lightbox.index}
      isOpen={lightbox.isOpen}
      onClose={closeLightbox}
    />
    </>
  );
}

export default function InteractiveIndiaMap() {
  const [indiaGeography, setIndiaGeography] = useState(null);
  const [mapError, setMapError] = useState('');
  const [selectedState, setSelectedState] = useState(projectBhartiStates[0]);
  const [activeStateName, setActiveStateName] = useState(projectBhartiStates[0].mapName);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const stateTriggerRef = useRef(null);
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

  const handleStateSelect = (mapName, trigger) => {
    const nextState = projectBhartiStateByMapName[mapName];

    if (!nextState) return;

    stateTriggerRef.current = trigger || document.activeElement;
    setSelectedState(nextState);
    setActiveStateName(mapName);
    setIsPanelOpen(true);
  };

  const handleStatePanelClose = () => {
    setIsPanelOpen(false);

    window.requestAnimationFrame(() => {
      stateTriggerRef.current?.focus?.();
    });
  };

  return (
    <section aria-labelledby="india-map-title" className="interactive-india-map section bg-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Geographic Coverage"
              id="india-map-title"
              description="State-wise profiles of Project Bharti field activity, media documentation, research outputs, and impact reporting."
            >
              Interactive map of project implementation.
            </SectionTitle>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {projectBhartiStates.map((state) => {
                const stateKey = state.id || state.stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                return (
                  <button
                    key={stateKey}
                    type="button"
                    onClick={(event) => handleStateSelect(state.mapName, event.currentTarget)}
                    className={`group rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                      activeStateName === state.mapName
                        ? 'border-red-200 bg-red-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-red-900 shadow-sm">
                      <StatusBadge status={state.status} className="inline-flex items-center uppercase tracking-[0.04em]" />
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
                <div role="alert" className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 px-6 text-center text-sm font-semibold text-red-900">
                  The interactive map is unavailable right now. Please try again shortly.
                </div>
              ) : !indiaGeography?.features?.length ? (
                <div role="status" aria-live="polite" className="flex min-h-[320px] items-center justify-center text-sm font-semibold text-slate-500">
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
                        const state = projectBhartiStateByMapName[stateName];
                        const isHighlighted = Boolean(state);
                        const isActive = activeStateName === stateName;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            role={isHighlighted ? 'button' : 'img'}
                            tabIndex={isHighlighted ? 0 : -1}
                            aria-label={stateName}
                            onClick={(event) => handleStateSelect(stateName, event.currentTarget)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleStateSelect(stateName, event.currentTarget);
                              }
                            }}
                            style={{
                              default: {
                                fill: isHighlighted ? state.color : '#e2e8f0',
                                stroke: '#ffffff',
                                strokeWidth: isActive ? 1.15 : isHighlighted ? 0.8 : 0.45,
                                outline: 'none',
                                transition: shouldReduceMotion ? 'none' : 'fill 180ms ease, transform 180ms ease',
                              },
                              hover: {
                                fill: isHighlighted ? brightenHexColor(state.color) : '#cbd5e1',
                                stroke: '#ffffff',
                                strokeWidth: isHighlighted ? 1.1 : 0.45,
                                outline: 'none',
                                cursor: isHighlighted ? 'pointer' : 'default',
                              },
                              pressed: {
                                fill: isHighlighted ? state.color : '#cbd5e1',
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
        <StatePanel selectedState={selectedState} onClose={handleStatePanelClose} />
      ) : null}
    </section>
  );
}
