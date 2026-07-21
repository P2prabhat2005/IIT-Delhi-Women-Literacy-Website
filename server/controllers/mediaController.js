import * as mediaService from '../services/mediaService.js';
import { ApiError } from '../utils/errors.js';
import { sendSuccess } from '../utils/responses.js';
import { assertSafeOwnerValue } from '../utils/validation.js';

const VALID_ASSET_TYPES = new Set(['image', 'thumbnail', 'document', 'video']);

function assertValidAssetType(assetType) {
  if (!VALID_ASSET_TYPES.has(assetType)) {
    throw ApiError.badRequest(`Unsupported asset type: ${assetType}`);
  }
}

export function getAsset(req, res) {
  const { ownerType, ownerId, assetType } = req.params;
  assertSafeOwnerValue(ownerType, 'ownerType');
  assertSafeOwnerValue(ownerId, 'ownerId');
  assertValidAssetType(assetType);
  const asset = mediaService.getAsset(ownerType, ownerId, assetType);
  sendSuccess(res, asset);
}

export function listAssetsByOwnerType(req, res) {
  const { ownerType } = req.query;
  if (!ownerType) {
    throw ApiError.badRequest('ownerType query parameter is required');
  }
  assertSafeOwnerValue(ownerType, 'ownerType');

  if (req.query.ownerIds) {
    const ownerIds = String(req.query.ownerIds).split(',').filter(Boolean);
    if (ownerIds.length > 500) throw ApiError.badRequest('too many ownerIds');
    ownerIds.forEach((ownerId) => assertSafeOwnerValue(ownerId, 'ownerId'));
    sendSuccess(res, mediaService.getAssetsForOwners(ownerType, ownerIds));
    return;
  }

  sendSuccess(res, mediaService.getAssetsByOwnerType(ownerType));
}

export async function uploadAsset(req, res) {
  const { ownerType, ownerId, assetType } = req.params;
  assertSafeOwnerValue(ownerType, 'ownerType');
  assertSafeOwnerValue(ownerId, 'ownerId');
  assertValidAssetType(assetType);

  if (!req.file) {
    throw ApiError.badRequest('No file uploaded');
  }

  const asset = await mediaService.saveUploadedAsset(ownerType, ownerId, assetType, req.file);
  sendSuccess(res, asset);
}

export async function removeAsset(req, res) {
  const { ownerType, ownerId, assetType } = req.params;
  assertSafeOwnerValue(ownerType, 'ownerType');
  assertSafeOwnerValue(ownerId, 'ownerId');
  assertValidAssetType(assetType);

  const removed = await mediaService.deleteAsset(ownerType, ownerId, assetType);
  sendSuccess(res, { removed: Boolean(removed) });
}
