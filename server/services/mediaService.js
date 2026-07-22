import fs from 'node:fs';
import path from 'node:path';
import { isCloudinaryConfigured } from '../config/cloudinary.js';
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
import { deleteFromCloudinary, getPublicIdFromCloudinaryUrl, getResourceType, uploadToCloudinary } from './cloudinaryUpload.js';

function toPublicUrl(absolutePath) {
  const relative = path.relative(env.uploadsRoot, absolutePath).split(path.sep).join('/');
  return `${env.uploadsPublicPath}/${relative}`;
}

function resolveUploadPathFromUrl(url) {
  if (!url?.startsWith(`${env.uploadsPublicPath}/`)) return null;

  const relative = url.replace(env.uploadsPublicPath, '').replace(/^\/+/, '');
  const absolutePath = path.resolve(env.uploadsRoot, relative);
  const uploadsRoot = path.resolve(env.uploadsRoot);

  if (absolutePath !== uploadsRoot && !absolutePath.startsWith(`${uploadsRoot}${path.sep}`)) {
    return null;
  }

  return absolutePath;
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
    // publicId is stored internally but not exposed to maintain API compatibility
  };
}

function unlinkIfExists(url) {
  const absolutePath = resolveUploadPathFromUrl(url);
  if (!absolutePath) return;
  fs.unlink(absolutePath, () => {});
}

async function cleanupAsset(row) {
  if (!row) return;

  const publicId = row.public_id || getPublicIdFromCloudinaryUrl(row.url);
  if (publicId) {
    await deleteFromCloudinary(publicId, getResourceType(row.mime_type));
    return;
  }

  if (row.url) {
    unlinkIfExists(row.url);
  }
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

export async function saveUploadedAsset(ownerType, ownerId, assetType, file) {
  const previous = getMediaAsset(ownerType, ownerId, assetType);
  
  // Clean up previous asset (both local and Cloudinary)
  await cleanupAsset(previous);

  // Try Cloudinary first if configured, fallback to local
  if (isCloudinaryConfigured()) {
    try {
      const cloudinaryResult = await uploadToCloudinary(file, ownerType, ownerId, assetType);
      
      const saved = upsertMediaAsset(ownerType, ownerId, assetType, {
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: cloudinaryResult.sizeBytes,
        url: cloudinaryResult.secureUrl,
        publicId: cloudinaryResult.publicId,
      });

      // Clean up local temp file
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        // Ignore cleanup errors
      }

      return toDto(saved);
    } catch (error) {
      console.warn('Cloudinary upload failed, falling back to local storage:', error.message);
      // Continue to local storage fallback below
    }
  }

  // Local storage fallback (existing behavior)
  const url = toPublicUrl(file.path);
  const saved = upsertMediaAsset(ownerType, ownerId, assetType, {
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    sizeBytes: file.size,
    url,
    publicId: null, // Local files don't have Cloudinary public_id
  });

  return toDto(saved);
}

export async function deleteAsset(ownerType, ownerId, assetType) {
  const removed = removeMediaAsset(ownerType, ownerId, assetType);
  
  await cleanupAsset(removed);
  
  return toDto(removed);
}

export async function deleteAllAssetsForOwner(ownerType, ownerId) {
  const removed = removeAllMediaForOwner(ownerType, ownerId);
  
  // Clean up both Cloudinary and local assets
  await Promise.all(removed.map(cleanupAsset));
  
  return removed.map(toDto);
}

export async function duplicateAsset(ownerType, sourceOwnerId, targetOwnerId, assetType) {
  const source = getMediaAsset(ownerType, sourceOwnerId, assetType);
  if (!source || !source.url) return null;

  // If source is on Cloudinary, we can't easily duplicate it without re-uploading
  // For now, Cloudinary assets won't be duplicated (this matches the existing behavior for cross-region assets)
  if (source.public_id) {
    console.warn(`Cannot duplicate Cloudinary asset ${source.public_id} - duplication not supported for cloud assets`);
    return null;
  }

  // Handle local assets (existing behavior)
  const sourcePath = resolveUploadPathFromUrl(source.url);
  if (!sourcePath) return null;

  const folder = path.relative(env.uploadsRoot, path.dirname(sourcePath));
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
    publicId: null, // Duplicated local file has no Cloudinary ID
  });

  return toDto(saved);
}
