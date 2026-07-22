import { apiDelete, apiGet, apiUpload } from './apiClient.js';

/**
 * Generic, backend-backed editable media layer.
 *
 * This used to persist Base64 data URLs in localStorage. It now talks to the
 * Express + SQLite API (`/api/media/:ownerType/:ownerId/:assetType`) and
 * simply returns/receives a permanent URL, so every consumer (Hero capability
 * documents, activity photographs, etc.) gets real persistence across
 * refreshes, browser restarts, and server restarts without changing its own
 * public API.
 */

export const PDF_ACCEPT = 'application/pdf';
export const PDF_MAX_BYTES = 15 * 1024 * 1024;

export const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp';
export const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const IMAGE_MAX_BYTES = 10 * 1024 * 1024;

export const VIDEO_ACCEPT = 'video/mp4,video/webm,video/quicktime';
export const VIDEO_MIME_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime']);
export const VIDEO_MAX_BYTES = 60 * 1024 * 1024;

export function releaseObjectUrl(url) {
  if (url?.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export function labelToDocumentKey(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function validatePdfFile(file) {
  if (!file) return { ok: false, error: 'No file selected.' };
  if (file.type !== PDF_ACCEPT) return { ok: false, error: 'Use a PDF document.' };
  if (file.size > PDF_MAX_BYTES) return { ok: false, error: 'PDF files must be 15 MB or smaller.' };
  return { ok: true, error: '' };
}

export function validateImageFile(file) {
  if (!file) return { ok: false, error: 'No file selected.' };
  if (!IMAGE_MIME_TYPES.has(file.type)) return { ok: false, error: 'Use a PNG, JPG, or WEBP image.' };
  if (file.size > IMAGE_MAX_BYTES) return { ok: false, error: 'Image files must be 10 MB or smaller.' };
  return { ok: true, error: '' };
}

export function validateVideoFile(file) {
  if (!file) return { ok: false, error: 'No file selected.' };
  if (!VIDEO_MIME_TYPES.has(file.type)) return { ok: false, error: 'Use an MP4, WEBM, or MOV video.' };
  if (file.size > VIDEO_MAX_BYTES) return { ok: false, error: 'Video files must be 60 MB or smaller.' };
  return { ok: true, error: '' };
}

export function openDocumentInNewTab(url) {
  if (!url) return false;
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}

const pendingMediaAssetBatches = new Map();

function getMediaAssetBatchKey(ownerType, assetType) {
  return `${ownerType}::${assetType}`;
}

function queueMediaAssetBatch(ownerType, ownerId, assetType) {
  const batchKey = getMediaAssetBatchKey(ownerType, assetType);
  let batch = pendingMediaAssetBatches.get(batchKey);

  if (!batch) {
    batch = {
      ownerIds: new Set(),
      resolvers: new Map(),
    };
    pendingMediaAssetBatches.set(batchKey, batch);

    const schedule = typeof queueMicrotask === 'function' ? queueMicrotask : (callback) => setTimeout(callback, 0);
    schedule(async () => {
      pendingMediaAssetBatches.delete(batchKey);
      const ownerIds = [...batch.ownerIds];
      const mediaMap = await fetchMediaMap(ownerType, ownerIds, assetType);

      batch.resolvers.forEach((callbacks, queuedOwnerId) => {
        callbacks.forEach((resolve) => resolve(mediaMap[queuedOwnerId] || null));
      });
    });
  }

  batch.ownerIds.add(ownerId);
  if (!batch.resolvers.has(ownerId)) {
    batch.resolvers.set(ownerId, []);
  }

  return new Promise((resolve) => {
    batch.resolvers.get(ownerId).push(resolve);
  });
}

/**
 * Fetches a single persisted media asset for a given owner/asset type, or
 * `null` when nothing has been uploaded yet.
 */
export async function fetchMediaAsset(ownerType, ownerId, assetType = 'document') {
  if (!ownerType || !ownerId) return null;
  return queueMediaAssetBatch(ownerType, ownerId, assetType);
}

/**
 * Bulk-fetches media assets for many owner ids in one round trip and
 * flattens the result to `{ [ownerId]: assetDto }` for the given asset type,
 * mirroring the shape the older `loadStoredDocumentMap` returned.
 */
export async function fetchMediaMap(ownerType, ownerIds = [], assetType = 'document') {
  if (!ownerType || !ownerIds.length) return {};

  try {
    const map = await apiGet('/media', { ownerType, ownerIds: ownerIds.join(',') });
    return Object.entries(map || {}).reduce((result, [ownerId, assets]) => {
      if (assets?.[assetType]) {
        result[ownerId] = assets[assetType];
      }
      return result;
    }, {});
  } catch {
    return {};
  }
}

const VALIDATORS = {
  document: validatePdfFile,
  thumbnail: validateImageFile,
  image: validateImageFile,
  video: validateVideoFile,
};

export async function uploadMediaAsset(ownerType, ownerId, file, assetType = 'document') {
  const validate = VALIDATORS[assetType] || (() => ({ ok: true, error: '' }));
  const validation = validate(file);
  if (!validation.ok) {
    return { ok: false, error: validation.error, entry: null };
  }

  try {
    const entry = await apiUpload(`/media/${encodeURIComponent(ownerType)}/${encodeURIComponent(ownerId)}/${assetType}`, file);
    return { ok: true, error: '', entry };
  } catch (error) {
    return { ok: false, error: error.message || 'This file could not be saved.', entry: null };
  }
}

export async function removeMediaAsset(ownerType, ownerId, assetType = 'document') {
  try {
    await apiDelete(`/media/${encodeURIComponent(ownerType)}/${encodeURIComponent(ownerId)}/${assetType}`);
  } catch {
    // Deletion is best-effort; the UI already reflects removal optimistically.
  }
  return null;
}
