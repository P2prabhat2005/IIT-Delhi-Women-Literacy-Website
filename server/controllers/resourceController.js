import { getById } from '../models/Resource.js';
import * as mediaService from '../services/mediaService.js';
import * as resourceService from '../services/resourceService.js';
import { ApiError } from '../utils/errors.js';
import { sendCreated, sendSuccess } from '../utils/responses.js';

const RESOURCE_OWNER_TYPE = 'resource';

function ensureResourceExists(id) {
  const resource = getById(id);
  if (!resource) throw ApiError.notFound(`Resource ${id} not found`);
  return resource;
}

export function listResources(req, res) {
  const { section, search, category } = req.query;
  const data = resourceService.listResources({ section: section || category, search });
  sendSuccess(res, data);
}

export function getResource(req, res) {
  const data = resourceService.getResourceDto(req.params.id);
  sendSuccess(res, data);
}

export function createResource(req, res) {
  if (!req.body?.title) {
    throw ApiError.badRequest('title is required');
  }
  const data = resourceService.createResourceEntry(req.body);
  sendCreated(res, data);
}

export function updateResourceMetadata(req, res) {
  const data = resourceService.updateResourceEntry(req.params.id, req.body || {});
  sendSuccess(res, data);
}

export function deleteResource(req, res) {
  resourceService.deleteResourceEntry(req.params.id);
  sendSuccess(res, { id: req.params.id, deleted: true });
}

export function duplicateResource(req, res) {
  const data = resourceService.duplicateResourceEntry(req.params.id);
  sendCreated(res, data);
}

export function reorderResources(req, res) {
  const { sectionId, orderedIds } = req.body || {};
  if (!sectionId || !Array.isArray(orderedIds)) {
    throw ApiError.badRequest('sectionId and orderedIds[] are required');
  }
  const data = resourceService.reorderResourcesInSection(sectionId, orderedIds);
  sendSuccess(res, data);
}

function handleAssetUpload(assetType) {
  return (req, res) => {
    ensureResourceExists(req.params.id);
    if (!req.file) {
      throw ApiError.badRequest('No file uploaded');
    }
    const asset = mediaService.saveUploadedAsset(RESOURCE_OWNER_TYPE, req.params.id, assetType, req.file);
    sendSuccess(res, asset);
  };
}

function handleAssetRemove(assetType) {
  return (req, res) => {
    ensureResourceExists(req.params.id);
    const removed = mediaService.deleteAsset(RESOURCE_OWNER_TYPE, req.params.id, assetType);
    sendSuccess(res, { removed: Boolean(removed) });
  };
}

export const uploadThumbnail = handleAssetUpload('thumbnail');
export const removeThumbnail = handleAssetRemove('thumbnail');
export const uploadDocument = handleAssetUpload('document');
export const removeDocument = handleAssetRemove('document');
export const uploadVideo = handleAssetUpload('video');
export const removeVideo = handleAssetRemove('video');
