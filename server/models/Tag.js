import { getDb } from '../config/db.js';

export function findOrCreateTag(name) {
  const db = getDb();
  const trimmed = name.trim();
  if (!trimmed) return null;

  db.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)').run(trimmed);
  return db.prepare('SELECT id FROM tags WHERE name = ?').get(trimmed).id;
}

export function getTagsForResource(resourceId) {
  const db = getDb();
  return db
    .prepare(
      `SELECT t.name FROM tags t
       INNER JOIN resource_tags rt ON rt.tag_id = t.id
       WHERE rt.resource_id = ?
       ORDER BY t.name ASC`,
    )
    .all(resourceId)
    .map((row) => row.name);
}

export function getTagsForResources(resourceIds) {
  if (!resourceIds.length) return {};
  const db = getDb();
  const placeholders = resourceIds.map(() => '?').join(',');
  const rows = db
    .prepare(
      `SELECT rt.resource_id AS resourceId, t.name AS name
       FROM resource_tags rt
       INNER JOIN tags t ON t.id = rt.tag_id
       WHERE rt.resource_id IN (${placeholders})`,
    )
    .all(...resourceIds);

  return rows.reduce((map, row) => {
    if (!map[row.resourceId]) map[row.resourceId] = [];
    map[row.resourceId].push(row.name);
    return map;
  }, {});
}

export function setResourceTags(resourceId, tagNames = []) {
  const db = getDb();
  db.prepare('DELETE FROM resource_tags WHERE resource_id = ?').run(resourceId);

  const insertLink = db.prepare('INSERT OR IGNORE INTO resource_tags (resource_id, tag_id) VALUES (?, ?)');
  tagNames
    .map((name) => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean)
    .forEach((name) => {
      const tagId = findOrCreateTag(name);
      if (tagId) insertLink.run(resourceId, tagId);
    });
}
