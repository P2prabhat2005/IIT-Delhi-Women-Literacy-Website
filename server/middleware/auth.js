import { env } from '../config/env.js';
import { verifyToken } from '../services/authService.js';
import { ApiError } from '../utils/errors.js';

function extractToken(req) {
  return req.cookies?.[env.auth.cookieName] || null;
}

/**
 * Attaches `req.admin` when a valid session exists, but never rejects the
 * request. Used for read-oriented endpoints (like `/api/auth/me`) that need
 * to know whether a visitor is authenticated without requiring it.
 */
export function attachAdmin(req, res, next) {
  const token = extractToken(req);
  req.admin = token ? verifyToken(token) : null;
  next();
}

/**
 * Rejects the request with 401 unless a valid admin session is present.
 * Every content-mutating route (upload, replace, delete, create, update,
 * reorder, duplicate) must be wrapped with this middleware.
 */
export function requireAuth(req, res, next) {
  const token = extractToken(req);
  const admin = token ? verifyToken(token) : null;

  if (!admin) {
    next(ApiError.unauthorized('Please sign in as an administrator to perform this action.'));
    return;
  }

  req.admin = admin;
  next();
}
