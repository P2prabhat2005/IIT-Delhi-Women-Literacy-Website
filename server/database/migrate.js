import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDb } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function runMigrations() {
  const db = getDb();
  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schemaSql);
  return db;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runMigrations();
  console.log('Database schema migrated.');
}
