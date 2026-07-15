import crypto from 'node:crypto';
import { getDb } from '../config/db.js';

const UPDATABLE_FIELDS = [
  'title',
  'subtitle',
  'description',
  'category',
  'duration',
  'pages',
  'source',
  'meta',
  'kind',
  'featured',
];

export function listBySection(sectionId) {
  const db = getDb();
  return db
    .prepare('SELECT * FROM resources WHERE section_id = ? AND deleted_at IS NULL ORDER BY order_index ASC, created_at ASC')
    .all(sectionId);
}

export function listAllActive() {
  const db = getDb();
  return db
    .prepare('SELECT * FROM resources WHERE deleted_at IS NULL ORDER BY section_id ASC, order_index ASC, created_at ASC')
    .all();
}

export function getById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM resources WHERE id = ? AND deleted_at IS NULL').get(id) || null;
}

export function getMaxOrderIndex(sectionId) {
  const db = getDb();
  const row = db
    .prepare('SELECT MAX(order_index) AS maxOrder FROM resources WHERE section_id = ?')
    .get(sectionId);
  return row?.maxOrder ?? -1;
}

export function createResource({
  sectionId,
  kind = 'pdf',
  title,
  subtitle = '',
  description = '',
  category = sectionId,
  duration = '',
  pages = '',
  source = '',
  meta = '',
  featured = false,
  isCustom = true,
}) {
  const db = getDb();
  const id = `${sectionId}::custom::${crypto.randomUUID()}`;
  const orderIndex = getMaxOrderIndex(sectionId) + 1;

  db.prepare(
    `INSERT INTO resources
       (id, section_id, kind, title, subtitle, description, category, duration, pages, source, meta, featured, is_custom, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, sectionId, kind, title, subtitle, description, category, duration, pages, source, meta, featured ? 1 : 0, isCustom ? 1 : 0, orderIndex);

  return getById(id);
}

export function updateResource(id, fields) {
  const db = getDb();
  const updates = [];
  const values = [];

  UPDATABLE_FIELDS.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      updates.push(`${field} = ?`);
      values.push(field === 'featured' ? (fields[field] ? 1 : 0) : fields[field]);
    }
  });

  if (!updates.length) return getById(id);

  updates.push("updated_at = datetime('now')");
  db.prepare(`UPDATE resources SET ${updates.join(', ')} WHERE id = ?`).run(...values, id);
  return getById(id);
}

export function moveResourceToSection(id, newSectionId) {
  const db = getDb();
  const orderIndex = getMaxOrderIndex(newSectionId) + 1;
  db.prepare(
    "UPDATE resources SET section_id = ?, category = ?, order_index = ?, updated_at = datetime('now') WHERE id = ?",
  ).run(newSectionId, newSectionId, orderIndex, id);
  return getById(id);
}

export function softDeleteResource(id) {
  const db = getDb();
  db.prepare("UPDATE resources SET deleted_at = datetime('now') WHERE id = ?").run(id);
}

export function insertDuplicate(sourceResource, overrides = {}) {
  const db = getDb();
  const id = `${sourceResource.section_id}::custom::${crypto.randomUUID()}`;
  const orderIndex = getMaxOrderIndex(sourceResource.section_id) + 1;

  const merged = {
    kind: sourceResource.kind,
    title: `${sourceResource.title} (Copy)`,
    subtitle: sourceResource.subtitle,
    description: sourceResource.description,
    category: sourceResource.category,
    duration: sourceResource.duration,
    pages: sourceResource.pages,
    source: sourceResource.source,
    meta: sourceResource.meta,
    featured: false,
    ...overrides,
  };

  db.prepare(
    `INSERT INTO resources
       (id, section_id, kind, title, subtitle, description, category, duration, pages, source, meta, featured, is_custom, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
  ).run(
    id,
    sourceResource.section_id,
    merged.kind,
    merged.title,
    merged.subtitle,
    merged.description,
    merged.category,
    merged.duration,
    merged.pages,
    merged.source,
    merged.meta,
    merged.featured ? 1 : 0,
    orderIndex,
  );

  return getById(id);
}

export function reorderSection(sectionId, orderedIds) {
  const db = getDb();
  const update = db.prepare("UPDATE resources SET order_index = ?, updated_at = datetime('now') WHERE id = ? AND section_id = ?");

  orderedIds.forEach((resourceId, index) => {
    update.run(index, resourceId, sectionId);
  });

  return listBySection(sectionId);
}
