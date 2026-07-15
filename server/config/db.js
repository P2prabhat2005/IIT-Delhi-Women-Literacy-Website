import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';

/**
 * Single SQLite connection for the whole process, using Node's built-in
 * `node:sqlite` driver (no native build step required).
 *
 * This module is the ONLY place that talks to the physical database file.
 * Every model/service goes through `getDb()`. Migrating to PostgreSQL or
 * MySQL later means swapping this file (and the SQL dialect in
 * `database/schema.sql`) — the rest of the codebase depends only on the
 * query methods used below (`.exec`, `.prepare`), which most drivers mirror.
 */

let db = null;

export function getDb() {
  if (db) return db;

  fs.mkdirSync(path.dirname(env.dbFile), { recursive: true });
  db = new DatabaseSync(env.dbFile);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
