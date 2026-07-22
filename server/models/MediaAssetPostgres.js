import crypto from 'node:crypto';
import { queryPostgres } from '../config/database.js';

export async function getMediaAsset(ownerType, ownerId, assetType) {
  const result = await queryPostgres(
    'SELECT * FROM media_assets WHERE owner_type = $1 AND owner_id = $2 AND asset_type = $3',
    [ownerType, ownerId, assetType]
  );
  return result.rows[0] || null;
}

export async function listMediaForOwners(ownerType, ownerIds) {
  if (!ownerIds.length) return {};
  
  const placeholders = ownerIds.map((_, i) => `$${i + 2}`).join(',');
  const result = await queryPostgres(
    `SELECT * FROM media_assets WHERE owner_type = $1 AND owner_id IN (${placeholders})`,
    [ownerType, ...ownerIds]
  );

  return result.rows.reduce((map, row) => {
    if (!map[row.owner_id]) map[row.owner_id] = {};
    map[row.owner_id][row.asset_type] = row;
    return map;
  }, {});
}

export async function listMediaByOwnerType(ownerType) {
  const result = await queryPostgres(
    'SELECT * FROM media_assets WHERE owner_type = $1',
    [ownerType]
  );
  return result.rows;
}

export async function upsertMediaAsset(ownerType, ownerId, assetType, { fileName, originalName, mimeType, sizeBytes, url, publicId = null }) {
  const existing = await getMediaAsset(ownerType, ownerId, assetType);

  if (existing) {
    await queryPostgres(
      `UPDATE media_assets
       SET file_name = $1, original_name = $2, mime_type = $3, size_bytes = $4, url = $5, public_id = $6, updated_at = NOW()
       WHERE id = $7`,
      [fileName, originalName, mimeType, sizeBytes, url, publicId, existing.id]
    );
    return await getMediaAsset(ownerType, ownerId, assetType);
  }

  const id = crypto.randomUUID();
  await queryPostgres(
    `INSERT INTO media_assets (id, owner_type, owner_id, asset_type, file_name, original_name, mime_type, size_bytes, url, public_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [id, ownerType, ownerId, assetType, fileName, originalName, mimeType, sizeBytes, url, publicId]
  );

  return await getMediaAsset(ownerType, ownerId, assetType);
}

export async function removeMediaAsset(ownerType, ownerId, assetType) {
  const existing = await getMediaAsset(ownerType, ownerId, assetType);
  await queryPostgres(
    'DELETE FROM media_assets WHERE owner_type = $1 AND owner_id = $2 AND asset_type = $3',
    [ownerType, ownerId, assetType]
  );
  return existing;
}

export async function removeAllMediaForOwner(ownerType, ownerId) {
  const result = await queryPostgres(
    'SELECT * FROM media_assets WHERE owner_type = $1 AND owner_id = $2',
    [ownerType, ownerId]
  );
  const rows = result.rows;
  
  await queryPostgres(
    'DELETE FROM media_assets WHERE owner_type = $1 AND owner_id = $2',
    [ownerType, ownerId]
  );
  
  return rows;
}