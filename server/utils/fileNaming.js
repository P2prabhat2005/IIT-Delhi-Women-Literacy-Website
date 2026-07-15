import crypto from 'node:crypto';
import path from 'node:path';

const SAFE_CHARS = /[^a-zA-Z0-9._-]/g;

/**
 * Builds a collision-proof filename while preserving a readable trace of the
 * original name and extension. Files are never overwritten because every
 * generated name embeds a random UUID segment.
 */
export function buildUniqueFileName(originalName = 'file') {
  const ext = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, ext)
    .replace(SAFE_CHARS, '-')
    .slice(0, 60) || 'file';
  const uniqueId = crypto.randomUUID();
  return `${base}-${uniqueId}${ext}`;
}
