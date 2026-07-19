import crypto from 'node:crypto';
import { getDb } from '../config/db.js';

const CATEGORY_FIELDS = ['title', 'slug', 'description', 'display_order', 'is_active'];
const MEMBER_FIELDS = ['category_id', 'full_name', 'designation', 'display_order', 'is_active'];

export function countTeamCategories() {
  const db = getDb();
  return db.prepare('SELECT COUNT(*) AS count FROM team_categories').get().count;
}

export function listCategories({ includeInactive = false } = {}) {
  const db = getDb();
  const where = includeInactive ? '' : 'WHERE is_active = 1';
  return db
    .prepare(`SELECT * FROM team_categories ${where} ORDER BY display_order ASC, created_at ASC`)
    .all();
}

export function listMembers({ includeInactive = false } = {}) {
  const db = getDb();
  const where = includeInactive ? '' : 'WHERE tm.is_active = 1 AND tc.is_active = 1';
  return db
    .prepare(
      `SELECT tm.*
       FROM team_members tm
       JOIN team_categories tc ON tc.id = tm.category_id
       ${where}
       ORDER BY tc.display_order ASC, tm.display_order ASC, tm.created_at ASC`,
    )
    .all();
}

export function getCategoryById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM team_categories WHERE id = ?').get(id) || null;
}

export function getCategoryBySlug(slug) {
  const db = getDb();
  return db.prepare('SELECT * FROM team_categories WHERE slug = ?').get(slug) || null;
}

export function getMemberById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM team_members WHERE id = ?').get(id) || null;
}

export function getMaxCategoryOrder() {
  const db = getDb();
  const row = db.prepare('SELECT MAX(display_order) AS maxOrder FROM team_categories').get();
  return row?.maxOrder ?? -1;
}

export function getMaxMemberOrder(categoryId) {
  const db = getDb();
  const row = db.prepare('SELECT MAX(display_order) AS maxOrder FROM team_members WHERE category_id = ?').get(categoryId);
  return row?.maxOrder ?? -1;
}

export function createCategory({ title, slug, description = '', displayOrder, isActive = true }) {
  const db = getDb();
  const id = `team-category-${crypto.randomUUID()}`;
  const orderIndex = Number.isInteger(displayOrder) ? displayOrder : getMaxCategoryOrder() + 1;

  db.prepare(
    `INSERT INTO team_categories (id, title, slug, description, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, title, slug, description, orderIndex, isActive ? 1 : 0);

  return getCategoryById(id);
}

export function updateCategory(id, fields) {
  const db = getDb();
  const updates = [];
  const values = [];

  CATEGORY_FIELDS.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      updates.push(`${field} = ?`);
      values.push(field === 'is_active' ? (fields[field] ? 1 : 0) : fields[field]);
    }
  });

  if (!updates.length) return getCategoryById(id);

  updates.push("updated_at = datetime('now')");
  db.prepare(`UPDATE team_categories SET ${updates.join(', ')} WHERE id = ?`).run(...values, id);
  return getCategoryById(id);
}

export function deleteCategory(id) {
  const db = getDb();
  const row = getCategoryById(id);
  db.prepare('DELETE FROM team_categories WHERE id = ?').run(id);
  return row;
}

export function createMember({ categoryId, fullName, designation = '', displayOrder, isActive = true }) {
  const db = getDb();
  const id = `team-member-${crypto.randomUUID()}`;
  const orderIndex = Number.isInteger(displayOrder) ? displayOrder : getMaxMemberOrder(categoryId) + 1;

  db.prepare(
    `INSERT INTO team_members (id, category_id, full_name, designation, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, categoryId, fullName, designation, orderIndex, isActive ? 1 : 0);

  return getMemberById(id);
}

export function updateMember(id, fields) {
  const db = getDb();
  const updates = [];
  const values = [];

  MEMBER_FIELDS.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      updates.push(`${field} = ?`);
      values.push(field === 'is_active' ? (fields[field] ? 1 : 0) : fields[field]);
    }
  });

  if (!updates.length) return getMemberById(id);

  updates.push("updated_at = datetime('now')");
  db.prepare(`UPDATE team_members SET ${updates.join(', ')} WHERE id = ?`).run(...values, id);
  return getMemberById(id);
}

export function deleteMember(id) {
  const db = getDb();
  const row = getMemberById(id);
  db.prepare('DELETE FROM team_members WHERE id = ?').run(id);
  return row;
}

