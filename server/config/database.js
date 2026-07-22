import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';
import { env } from './env.js';

export const DATABASE_BACKENDS = Object.freeze({
  SQLITE: 'sqlite',
  POSTGRES: 'postgres',
});

let sqliteDb = null;
let postgresPool = null;
let postgresPoolPromise = null;

function normalizeDatabaseBackend(value) {
  const normalized = String(value || '').trim().toLowerCase();

  if (normalized === 'postgresql' || normalized === 'pg') {
    return DATABASE_BACKENDS.POSTGRES;
  }

  if (normalized === DATABASE_BACKENDS.POSTGRES || normalized === DATABASE_BACKENDS.SQLITE) {
    return normalized;
  }

  return DATABASE_BACKENDS.SQLITE;
}

export function getDatabaseBackend() {
  return normalizeDatabaseBackend(env.databaseBackend);
}

export function getSqliteDb() {
  if (sqliteDb) return sqliteDb;

  fs.mkdirSync(path.dirname(env.dbFile), { recursive: true });
  sqliteDb = new DatabaseSync(env.dbFile);
  sqliteDb.exec('PRAGMA journal_mode = WAL;');
  sqliteDb.exec('PRAGMA foreign_keys = ON;');
  return sqliteDb;
}

export async function getPostgresPool() {
  if (postgresPool) return postgresPool;
  if (postgresPoolPromise) return await postgresPoolPromise;

  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is required to initialize the PostgreSQL connection pool.');
  }

  postgresPoolPromise = (async () => {
    const pool = new pg.Pool({
      connectionString: env.databaseUrl,
    });

    try {
      const client = await pool.connect();
      try {
        await client.query('SELECT 1');
      } finally {
        client.release();
      }

      postgresPool = pool;
      return postgresPool;
    } catch (error) {
      await pool.end().catch(() => {});
      throw new Error(`Unable to initialize PostgreSQL connection pool: ${error.message}`);
    } finally {
      postgresPoolPromise = null;
    }
  })();

  return await postgresPoolPromise;
}

export async function queryPostgres(text, params = []) {
  const pool = await getPostgresPool();
  return pool.query(text, params);
}

export async function closeDatabaseConnections() {
  if (postgresPool) {
    await postgresPool.end();
    postgresPool = null;
  }

  if (sqliteDb) {
    sqliteDb.close();
    sqliteDb = null;
  }
}
