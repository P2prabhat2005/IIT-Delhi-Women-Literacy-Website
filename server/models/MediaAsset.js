import crypto from 'node:crypto';
import { getDatabaseBackend, DATABASE_BACKENDS } from '../config/database.js';
import { getDb } from '../config/db.js';
import * as PostgresMediaAsset from './MediaAssetPostgres.js';

// Route to appropriate backend based on configuration
function usePostgres() {
  return getDatabaseBackend() === DATABASE_BACKENDS.POSTGRES;
}

export async function getMediaAsset(ownerType, ownerId, assetType) {
  if (usePostgres()) {
    return await PostgresMediaAsset.getMediaAsset(ownerType, ownerId, assetType);
  }
  
  const db = getDb();
  return (
    db
      .prepare('SELECT * FROM media_assets WHERE owner_type = ? AND owner_id = ? AND asset_type = ?')
      .get(ownerType, ownerId, assetType) || null
  );
}

export async function listMediaForOwners(ownerType, ownerIds) {
  if (usePostgres()) {
    return await PostgresMediaAsset.listMediaForOwners(ownerType, ownerIds);
  }
  
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

export async function listMediaByOwnerType(ownerType) {
  if (usePostgres()) {
    return await PostgresMediaAsset.listMediaByOwnerType(ownerType);
  }
  
  const db = getDb();
  return db.prepare('SELECT * FROM media_assets WHERE owner_type = ?').all(ownerType);
}

export async function upsertMediaAsset(ownerType, ownerId, assetType, { fileName, originalName, mimeType, sizeBytes, url, publicId = null }) {
  if (usePostgres()) {
    return await PostgresMediaAsset.upsertMediaAsset(ownerType, ownerId, assetType, { fileName, originalName, mimeType, sizeBytes, url, publicId });
  }
  
  const db = getDb();
  const existing = await getMediaAsset(ownerType, ownerId, assetType);

  if (existing) {
    db.prepare(
      `UPDATE media_assets
       SET file_name = ?, original_name = ?, mime_type = ?, size_bytes = ?, url = ?, public_id = ?, updated_at = datetime('now')
       WHERE id = ?`,
    ).run(fileName, originalName, mimeType, sizeBytes, url, publicId, existing.id);
    return await getMediaAsset(ownerType, ownerId, assetType);
  }

  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO media_assets (id, owner_type, owner_id, asset_type, file_name, original_name, mime_type, size_bytes, url, public_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, ownerType, ownerId, assetType, fileName, originalName, mimeType, sizeBytes, url, publicId);

  return await getMediaAsset(ownerType, ownerId, assetType);
}

export async function removeMediaAsset(ownerType, ownerId, assetType) {
  if (usePostgres()) {
    return await PostgresMediaAsset.removeMediaAsset(ownerType, ownerId, assetType);
  }
  
  const db = getDb();
  const existing = await getMediaAsset(ownerType, ownerId, assetType);
  db.prepare('DELETE FROM media_assets WHERE owner_type = ? AND owner_id = ? AND asset_type = ?').run(
    ownerType,
    ownerId,
    assetType,
  );
  return existing;
}

export async function removeAllMediaForOwner(ownerType, ownerId) {
  if (usePostgres()) {
    return await PostgresMediaAsset.removeAllMediaForOwner(ownerType, ownerId);
  }
  
  const db = getDb();
  const rows = db.prepare('SELECT * FROM media_assets WHERE owner_type = ? AND owner_id = ?').all(ownerType, ownerId);
  db.prepare('DELETE FROM media_assets WHERE owner_type = ? AND owner_id = ?').run(ownerType, ownerId);
  return rows;
}
