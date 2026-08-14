import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react';
import {
  getCaseStudyImageSize,
  getCaseStudyThumbnailObjectPosition,
} from '../data/caseStudyImageSizes.js';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';
import { isSafeNavigationUrl, openSafeUrl } from '../utils/safeUrl.js';

const kindFallbackLabel = {
  pdf: 'PDF',
  scheme: 'Government Scheme',
  guide: 'Guide',
  checklist: 'Checklist',
  worksheet: 'Worksheet',
  video: 'Video',
};

function openDocument(resource) {
  if (isSafeNavigationUrl(resource.document?.url)) {
    openSafeUrl(resource.document.url);
  }
}

export function CaseStudyResourceCard({ index = 0, resource }) {
  const reduceMotion = useReducedMotion();
  const hasDocument = isSafeNavigationUrl(resource.document?.url);
  const hasThumbnail = Boolean(resource.thumbnail?.url);
  const thumbnailSize = hasThumbnail ? getCaseStudyImageSize(resource.thumbnail.url) : null;
  const thumbnailObjectPosition = hasThumbnail
    ? getCaseStudyThumbnailObjectPosition(resource.thumbnail.url)
    : undefined;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.35)}
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-sm shadow-slate-200/50 transition duration-300 hover:-translate-y-0.5 hover:border-red-100 hover:shadow-md hover:shadow-slate-300/40"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        {hasThumbnail ? (
          <img
            src={resource.thumbnail.url}
            alt={resource.thumbnail.alt || ''}
            width={thumbnailSize?.width}
            height={thumbnailSize?.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.03]"
            style={{ objectPosition: thumbnailObjectPosition }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-50 via-white to-red-50 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-red-900 shadow-sm">
              <FileText size={20} aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-slate-700">{resource.title}</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-800">{resource.meta}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-950">{resource.title}</h3>
        {resource.subtitle ? (
          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{resource.subtitle}</p>
        ) : null}
        {resource.description ? (
          <p className="mt-3 text-sm leading-6 text-slate-500">{resource.description}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {hasDocument ? (
            <button
              type="button"
              onClick={() => openDocument(resource)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Open PDF
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ) : null}
          {resource.href ? (
            <Link
              to={resource.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Read Case Study
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function DocumentResourceCard({ index = 0, resource }) {
  const reduceMotion = useReducedMotion();
  const typeLabel = resource.typeLabel || kindFallbackLabel[resource.kind] || 'Document';
  const hasInternalGuide = typeof resource.href === 'string' && resource.href.startsWith('/resources/');
  const hasOfficial = isSafeNavigationUrl(resource.officialUrl);
  const hasDocument = isSafeNavigationUrl(resource.document?.url);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.3)}
      className="flex flex-col gap-4 rounded-[1.25rem] border border-slate-200/90 bg-white p-4 shadow-sm shadow-slate-200/40 transition hover:border-red-100 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
    >
      <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-[#f7f4ef] text-red-900">
          <FileText size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {resource.categoryLabel ? (
              <span className="rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-900">
                {resource.categoryLabel}
              </span>
            ) : null}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
              {typeLabel}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug text-slate-950 sm:text-lg">{resource.title}</h3>
          {resource.description ? (
            <p className="mt-1.5 text-sm leading-6 text-slate-600">{resource.description}</p>
          ) : null}
          {resource.sourceLabel ? (
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Source: {resource.sourceLabel}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:items-end sm:pl-2">
        {hasInternalGuide ? (
          <Link
            to={resource.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 sm:w-auto"
          >
            Read Guide
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ) : null}
        {hasOfficial ? (
          <button
            type="button"
            onClick={() => openSafeUrl(resource.officialUrl)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 sm:w-auto"
          >
            Open Official Resource
            <ExternalLink size={15} aria-hidden="true" />
          </button>
        ) : null}
        {!hasInternalGuide && hasDocument ? (
          <button
            type="button"
            onClick={() => openDocument(resource)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 sm:w-auto"
          >
            Open Document
            <ExternalLink size={15} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function ResourceCard(props) {
  if (props.layout === 'document-list') {
    return <DocumentResourceCard {...props} />;
  }
  return <CaseStudyResourceCard {...props} />;
}
