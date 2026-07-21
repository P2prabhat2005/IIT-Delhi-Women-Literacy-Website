import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDb } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function runMigrations() {
  const db = getDb();
  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schemaSql);
  
  // Add public_id column for Cloudinary integration if it doesn't exist
  try {
    const columns = db.prepare("PRAGMA table_info(media_assets)").all();
    const hasPublicId = columns.some(col => col.name === 'public_id');
    
    if (!hasPublicId) {
      db.exec('ALTER TABLE media_assets ADD COLUMN public_id TEXT;');
      console.log('✅ Added public_id column to media_assets table for Cloudinary integration');
    }
  } catch (error) {
    // Column might already exist or table might not exist yet
    console.log('ℹ️  public_id column migration skipped:', error.message);
  }
  
  return db;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runMigrations();
  console.log('Database schema migrated.');
}
