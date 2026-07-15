import fs from 'node:fs';
import path from 'node:path';
import { env } from '../config/env.js';
import { buildUniqueFileName } from '../utils/fileNaming.js';
import {
  getMediaAsset,
  listMediaByOwnerType,
  listMediaForOwners,
  removeAllMediaForOwner,
  removeMediaAsset,
  upsertMediaAsset,
} from '../models/MediaAsset.js';

function toPublicUrl(absolutePath) {
  const relative = path.relative(env.uploadsRoot, absolutePath).split(path.sep).join('/');
  return `${env.uploadsPublicPath}/${relative}`;
}

function toDto(row) {
  if (!row) return null;
  return {
    id: row.id,
    ownerType: row.owner_type,
    ownerId: row.owner_id,
    assetType: row.asset_type,
    fileName: row.file_name,
    originalName: row.original_name,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    url: row.url,
    updatedAt: row.updated_at,
  };
}

function unlinkIfExists(url) {
  if (!url) return;
  const relative = url.replace(env.uploadsPublicPath, '').replace(/^\/+/, '');
  const absolutePath = path.join(env.uploadsRoot, relative);
  fs.unlink(absolutePath, () => {});
}

export function getAsset(ownerType, ownerId, assetType) {
  return toDto(getMediaAsset(ownerType, ownerId, assetType));
}

export function getAssetsForOwners(ownerType, ownerIds) {
  const map = listMediaForOwners(ownerType, ownerIds);
  const result = {};
  Object.entries(map).forEach(([ownerId, assets]) => {
    result[ownerId] = Object.fromEntries(Object.entries(assets).map(([assetType, row]) => [assetType, toDto(row)]));
  });
  return result;
}

export function getAssetsByOwnerType(ownerType) {
  return listMediaByOwnerType(ownerType).map(toDto);
}

export function saveUploadedAsset(ownerType, ownerId, assetType, file) {
  const previous = getMediaAsset(ownerType, ownerId, assetType);
  if (previous && previous.url) {
    unlinkIfExists(previous.url);
  }

  const url = toPublicUrl(file.path);
  const saved = upsertMediaAsset(ownerType, ownerId, assetType, {
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    sizeBytes: file.size,
    url,
  });

  return toDto(saved);
}

export function deleteAsset(ownerType, ownerId, assetType) {
  const removed = removeMediaAsset(ownerType, ownerId, assetType);
  if (removed?.url) unlinkIfExists(removed.url);
  return toDto(removed);
}

export function deleteAllAssetsForOwner(ownerType, ownerId) {
  const removed = removeAllMediaForOwner(ownerType, ownerId);
  removed.forEach((row) => unlinkIfExists(row.url));
  return removed.map(toDto);
}

export function duplicateAsset(ownerType, sourceOwnerId, targetOwnerId, assetType) {
  const source = getMediaAsset(ownerType, sourceOwnerId, assetType);
  if (!source || !source.url) return null;

  const relative = source.url.replace(env.uploadsPublicPath, '').replace(/^\/+/, '');
  const sourcePath = path.join(env.uploadsRoot, relative);
  const folder = path.dirname(relative);
  const newFileName = buildUniqueFileName(source.original_name || source.file_name);
  const targetPath = path.join(env.uploadsRoot, folder, newFileName);

  try {
    fs.copyFileSync(sourcePath, targetPath);
  } catch {
    return null;
  }

  const saved = upsertMediaAsset(ownerType, targetOwnerId, assetType, {
    fileName: newFileName,
    originalName: source.original_name,
    mimeType: source.mime_type,
    sizeBytes: source.size_bytes,
    url: toPublicUrl(targetPath),
  });

  return toDto(saved);
}
