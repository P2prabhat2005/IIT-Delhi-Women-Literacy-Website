import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { createAdmin, findByUsername, findById } from '../models/Admin.js';
import { ApiError } from '../utils/errors.js';

import { getDb } from '../config/db.js';

const BCRYPT_SALT_ROUNDS = 10;

/**
 * Ensures exactly one administrator exists with the credentials configured
 * via ADMIN_USERNAME and ADMIN_PASSWORD (defaults: Shashank@11 / Shashank@2026).
 *
 * Strategy: wipe every existing admin row and re-create a single fresh one.
 * This guarantees that stale records from old env-var values (e.g. a previous
 * deployment where ADMIN_USERNAME was set to "admin") never block login.
 */
export function ensureDefaultAdmin() {
  const { adminUsername, adminPassword } = env.auth;
  if (!adminUsername || !adminPassword) return;

  const passwordHash = bcrypt.hashSync(adminPassword, BCRYPT_SALT_ROUNDS);

  const db = getDb();
  db.prepare('DELETE FROM admins').run();
  createAdmin(adminUsername, passwordHash);
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
