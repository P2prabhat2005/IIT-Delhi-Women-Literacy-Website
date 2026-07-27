/**
 * Static hero pillar PDFs keyed by slugified pillar labels.
 * Shape when present: { url, fileName }
 */

export function labelToDocumentKey(label) {
  return String(label || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const heroDocuments = {
  'financial-literacy': null,
  'digital-literacy': null,
  'women-empowerment': null,
};

export function getHeroDocument(key) {
  return heroDocuments[key] ?? null;
}

export function openHeroDocument(key) {
  const entry = getHeroDocument(key);
  if (!entry?.url) return false;
  window.open(entry.url, '_blank', 'noopener,noreferrer');
  return true;
}
