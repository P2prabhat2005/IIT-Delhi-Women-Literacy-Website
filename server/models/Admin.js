import crypto from 'node:crypto';
import { getDb } from '../config/db.js';

export function countAdmins() {
  const db = getDb();
  return db.prepare('SELECT COUNT(*) AS count FROM admins').get().count;
}

export function findByUsername(username) {
  const db = getDb();
  return db.prepare('SELECT * FROM admins WHERE username = ? COLLATE NOCASE').get(username) || null;
}

export function findById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM admins WHERE id = ?').get(id) || null;
}

export function createAdmin(username, passwordHash) {
  const db = getDb();
  const id = crypto.randomUUID();
  db.prepare('INSERT INTO admins (id, username, password_hash) VALUES (?, ?, ?)').run(id, username, passwordHash);
  return findById(id);
}
