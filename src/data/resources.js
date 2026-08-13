import {
  FileText,
  UsersRound,
} from 'lucide-react';
import { caseStudies } from './caseStudies.js';
import { getPracticalGuideLibraryItems } from './practicalGuides.js';

function slugifyTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function shapeResource(item, collectionId) {
  return {
    id: item.id || slugifyTitle(item.title),
    collectionId,
    category: item.category || collectionId,
    categoryLabel: item.categoryLabel || null,
    title: item.title,
    description: item.description,
    meta: item.meta || '',
    kind: item.kind,
    typeLabel: item.typeLabel || null,
    tags: item.tags || [],
    featured: Boolean(item.featured),
    subtitle: item.subtitle || null,
    href: item.href ?? null,
    sourceLabel: item.sourceLabel ?? null,
    sourceUrl: item.sourceUrl ?? null,
    officialUrl: item.officialUrl ?? null,
    thumbnail: item.thumbnail ?? null,
    document: item.document ?? null,
    video: item.video ?? null,
  };
}

export const resourceCollections = [
  {
    id: 'case-studies',
    title: 'Case Studies',
    description: 'Official field case studies of women entrepreneurs featured in Stories from the Field.',
    Icon: UsersRound,
    accent: 'bg-rose-50 text-red-900 border-red-100',
    layout: 'case-grid',
    items: caseStudies.map((study) => ({
      id: `case-study-${study.slug}`,
      title: study.name,
      subtitle: study.title,
      description: study.location?.display || '',
      href: `/stories/${study.slug}`,
      meta: 'PDF • Case study',
      category: 'case-studies',
      kind: 'pdf',
      tags: [],
      thumbnail: study.image ? { url: study.image.src, alt: study.image.alt || '' } : null,
      document: {
        url: study.pdfUrl,
        fileName: study.pdfFileName,
      },
      video: null,
    })),
  },
  {
    id: 'other-documents',
    title: 'Practical Resource Library',
    description:
      'Curated guides, checklists, worksheets, and official scheme explainers for women entrepreneurs, SHGs, facilitators, and community enterprises.',
    Icon: FileText,
    accent: 'bg-red-50 text-red-900 border-red-100',
    layout: 'document-list',
    items: getPracticalGuideLibraryItems(),
  },
];

export function getStaticResourceLibrary() {
  return resourceCollections.flatMap((collection) =>
    (collection.items || []).map((item) => shapeResource(item, collection.id)),
  );
}

export const resourceCategoryOptions = [
  { value: 'all', label: 'All Resources' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'other-documents', label: 'Practical Resource Library' },
];
