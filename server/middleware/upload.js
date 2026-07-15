import fs from 'node:fs';
import multer from 'multer';
import path from 'node:path';
import { env } from '../config/env.js';
import { buildUniqueFileName } from '../utils/fileNaming.js';

const ASSET_RULES = {
  image: {
    folder: 'images',
    mimeTypes: new Set(['image/jpeg', 'image/png', 'image/webp']),
    maxBytes: env.limits.imageMaxBytes,
  },
  thumbnail: {
    folder: 'thumbnails',
    mimeTypes: new Set(['image/jpeg', 'image/png', 'image/webp']),
    maxBytes: env.limits.imageMaxBytes,
  },
  video: {
    folder: 'videos',
    mimeTypes: new Set(['video/mp4', 'video/webm', 'video/quicktime']),
    maxBytes: env.limits.videoMaxBytes,
  },
  document: {
    // PDFs land in uploads/pdfs; any other future document type (doc/docx,
    // etc.) falls back to uploads/documents.
    folder: (mimeType) => (mimeType === 'application/pdf' ? 'pdfs' : 'documents'),
    mimeTypes: new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]),
    maxBytes: env.limits.documentMaxBytes,
  },
};

function resolveFolder(rule, mimeType) {
  return typeof rule.folder === 'function' ? rule.folder(mimeType) : rule.folder;
}

function createStorage(assetType) {
  const rule = ASSET_RULES[assetType];

  return multer.diskStorage({
    destination(req, file, callback) {
      const folder = resolveFolder(rule, file.mimetype);
      const destination = path.join(env.uploadsRoot, folder);
      fs.mkdirSync(destination, { recursive: true });
      req.uploadFolder = folder;
      callback(null, destination);
    },
    filename(req, file, callback) {
      callback(null, buildUniqueFileName(file.originalname));
    },
  });
}

function createFileFilter(assetType) {
  const rule = ASSET_RULES[assetType];

  return (req, file, callback) => {
    if (!rule.mimeTypes.has(file.mimetype)) {
      callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', `Unsupported file type: ${file.mimetype}`));
      return;
    }
    callback(null, true);
  };
}

function createUploader(assetType) {
  const rule = ASSET_RULES[assetType];

  return multer({
    storage: createStorage(assetType),
    fileFilter: createFileFilter(assetType),
    limits: { fileSize: rule.maxBytes },
  });
}

export const uploaders = {
  image: createUploader('image'),
  thumbnail: createUploader('thumbnail'),
  video: createUploader('video'),
  document: createUploader('document'),
};

export const assetTypeLimits = Object.fromEntries(
  Object.entries(ASSET_RULES).map(([key, rule]) => [key, rule.maxBytes]),
);
