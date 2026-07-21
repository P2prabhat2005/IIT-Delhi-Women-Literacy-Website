import crypto from 'node:crypto';
import { getDb } from '../config/db.js';

export function getMediaAsset(ownerType, ownerId, assetType) {
  const db = getDb();
  return (
    db
      .prepare('SELECT * FROM media_assets WHERE owner_type = ? AND owner_id = ? AND asset_type = ?')
      .get(ownerType, ownerId, assetType) || null
  );
}

export function listMediaForOwners(ownerType, ownerIds) {
  if (!ownerIds.length) return {};
  const db = getDb();
  const placeholders = ownerIds.map(() => '?').join(',');
  const rows = db
    .prepare(`SELECT * FROM media_assets WHERE owner_type = ? AND owner_id IN (${placeholders})`)
    .all(ownerType, ...ownerIds);

  return rows.reduce((map, row) => {
    if (!map[row.owner_id]) map[row.owner_id] = {};
    map[row.owner_id][row.asset_type] = row;
    return map;
  }, {});
}

export function listMediaByOwnerType(ownerType) {
  const db = getDb();
  return db.prepare('SELECT * FROM media_assets WHERE owner_type = ?').all(ownerType);
}

export function upsertMediaAsset(ownerType, ownerId, assetType, { fileName, originalName, mimeType, sizeBytes, url, publicId = null }) {
  const db = getDb();
  const existing = getMediaAsset(ownerType, ownerId, assetType);

  if (existing) {
    db.prepare(
      `UPDATE media_assets
       SET file_name = ?, original_name = ?, mime_type = ?, size_bytes = ?, url = ?, public_id = ?, updated_at = datetime('now')
       WHERE id = ?`,
    ).run(fileName, originalName, mimeType, sizeBytes, url, publicId, existing.id);
    return getMediaAsset(ownerType, ownerId, assetType);
  }

  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO media_assets (id, owner_type, owner_id, asset_type, file_name, original_name, mime_type, size_bytes, url, public_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, ownerType, ownerId, assetType, fileName, originalName, mimeType, sizeBytes, url, publicId);

  return getMediaAsset(ownerType, ownerId, assetType);
}

export function removeMediaAsset(ownerType, ownerId, assetType) {
  const db = getDb();
  const existing = getMediaAsset(ownerType, ownerId, assetType);
  db.prepare('DELETE FROM media_assets WHERE owner_type = ? AND owner_id = ? AND asset_type = ?').run(
    ownerType,
    ownerId,
    assetType,
  );
  return existing;
}

export function removeAllMediaForOwner(ownerType, ownerId) {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM media_assets WHERE owner_type = ? AND owner_id = ?').all(ownerType, ownerId);
  db.prepare('DELETE FROM media_assets WHERE owner_type = ? AND owner_id = ?').run(ownerType, ownerId);
  return rows;
}
