import * as mediaService from '../services/mediaService.js';
import { ApiError } from '../utils/errors.js';
import { sendSuccess } from '../utils/responses.js';

const VALID_ASSET_TYPES = new Set(['image', 'thumbnail', 'document', 'video']);

function assertValidAssetType(assetType) {
  if (!VALID_ASSET_TYPES.has(assetType)) {
    throw ApiError.badRequest(`Unsupported asset type: ${assetType}`);
  }
}

export function getAsset(req, res) {
  const { ownerType, ownerId, assetType } = req.params;
  assertValidAssetType(assetType);
  const asset = mediaService.getAsset(ownerType, ownerId, assetType);
  sendSuccess(res, asset);
}

export function listAssetsByOwnerType(req, res) {
  const { ownerType } = req.query;
  if (!ownerType) {
    throw ApiError.badRequest('ownerType query parameter is required');
  }

  if (req.query.ownerIds) {
    const ownerIds = String(req.query.ownerIds).split(',').filter(Boolean);
    sendSuccess(res, mediaService.getAssetsForOwners(ownerType, ownerIds));
    return;
  }

  sendSuccess(res, mediaService.getAssetsByOwnerType(ownerType));
}

export function uploadAsset(req, res) {
  const { ownerType, ownerId, assetType } = req.params;
  assertValidAssetType(assetType);

  if (!req.file) {
    throw ApiError.badRequest('No file uploaded');
  }

  const asset = mediaService.saveUploadedAsset(ownerType, ownerId, assetType, req.file);
  sendSuccess(res, asset);
}

export function removeAsset(req, res) {
  const { ownerType, ownerId, assetType } = req.params;
  assertValidAssetType(assetType);

  const removed = mediaService.deleteAsset(ownerType, ownerId, assetType);
  sendSuccess(res, { removed: Boolean(removed) });
}
