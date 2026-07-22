import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDatabaseBackend, DATABASE_BACKENDS, getPostgresPool } from '../config/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runPostgresMigrations() {
  if (getDatabaseBackend() !== DATABASE_BACKENDS.POSTGRES) {
    console.log('ℹ️  PostgreSQL migrations skipped (using SQLite backend)');
    return;
  }

  try {
    console.log('🚀 Running PostgreSQL migrations for media_assets...');

    // Read and execute the PostgreSQL schema
    const schemaSql = fs.readFileSync(path.join(__dirname, 'postgres-schema.sql'), 'utf8');
    const pool = await getPostgresPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query(schemaSql);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {});
      throw error;
    } finally {
      client.release();
    }

    console.log('✅ PostgreSQL media_assets table migrations completed successfully');
  } catch (error) {
    throw new Error(`PostgreSQL media_assets migration failed: ${error.message}`);
  }
}

// Run migrations if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPostgresMigrations()
    .then(() => {
      console.log('✅ PostgreSQL migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ PostgreSQL migration script failed:', error);
      process.exit(1);
    });
}

export { runPostgresMigrations };