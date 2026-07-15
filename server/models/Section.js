import { getDb } from '../config/db.js';

export function listSections() {
  const db = getDb();
  return db.prepare('SELECT * FROM sections ORDER BY order_index ASC').all();
}

export function getSection(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM sections WHERE id = ?').get(id) || null;
}

export function sectionExists(id) {
  return Boolean(getSection(id));
}
