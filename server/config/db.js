import { closeDatabaseConnections, getSqliteDb } from './database.js';

/**
 * Compatibility facade for the existing synchronous SQLite models.
 *
 * Phase 1 of the PostgreSQL migration introduces `config/database.js` as the
 * reusable database layer, but the business logic still calls this module's
 * SQLite-oriented `getDb()` API. Later phases can migrate models/services to
 * the async PostgreSQL query interface without changing controllers yet.
 */

export function getDb() {
  return getSqliteDb();
}

export async function closeDb() {
  await closeDatabaseConnections();
}
