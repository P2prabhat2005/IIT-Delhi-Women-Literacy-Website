import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { countAdmins, createAdmin, findByUsername, findById } from '../models/Admin.js';
import { ApiError } from '../utils/errors.js';

import { getDb } from '../config/db.js';

const BCRYPT_SALT_ROUNDS = 10;

/**
 * Seeds the first administrator from environment variables so credentials
 * are never hardcoded in source. Ensures the env credentials always work.
 */
export function ensureDefaultAdmin() {
  const { adminUsername, adminPassword } = env.auth;
  if (!adminUsername || !adminPassword) return;

  const existing = findByUsername(adminUsername);
  const passwordHash = bcrypt.hashSync(adminPassword, BCRYPT_SALT_ROUNDS);

  if (existing) {
    getDb().prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(passwordHash, existing.id);
  } else {
    createAdmin(adminUsername, passwordHash);
  }
}

function issueToken(admin) {
  return jwt.sign({ sub: admin.id, username: admin.username }, env.auth.jwtSecret, {
    expiresIn: env.auth.jwtExpiresIn,
  });
}

export async function login(username, password) {
  if (!username || !password) {
    throw ApiError.badRequest('Username and password are required.');
  }

  const admin = findByUsername(username.trim());
  if (!admin) {
    throw ApiError.unauthorized('Invalid username or password.');
  }

  const isValid = await bcrypt.compare(password, admin.password_hash);
  if (!isValid) {
    throw ApiError.unauthorized('Invalid username or password.');
  }

  const token = issueToken(admin);
  return { token, admin: { id: admin.id, username: admin.username } };
}

/**
 * TEMPORARY DIAGNOSTIC — remove after the login issue is confirmed fixed.
 * Returns DB path, stored admin rows (no hashes), and whether the env
 * credentials currently match what is stored.
 */
export async function getAuthDiagnostics() {
  const { adminUsername, adminPassword } = env.auth;
  const admins = getDb()
    .prepare('SELECT id, username, password_hash FROM admins')
    .all();

  const results = await Promise.all(
    admins.map(async (a) => {
      const match = await bcrypt.compare(adminPassword, a.password_hash);
      return {
        id: a.id,
        username: a.username,
        hashPrefix: a.password_hash ? a.password_hash.slice(0, 7) : null,
        passwordMatchesEnvPassword: match,
      };
    }),
  );

  return {
    dbFile: env.dbFile,
    envUsername: adminUsername,
    envPasswordLength: adminPassword.length,
    adminCount: admins.length,
    admins: results,
  };
}

export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, env.auth.jwtSecret);
    const admin = findById(payload.sub);
    if (!admin) return null;
    return { id: admin.id, username: admin.username };
  } catch {
    return null;
  }
}
