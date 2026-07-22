import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from '../config/env.js';
import { ApiError } from '../utils/errors.js';

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const NULL_BYTE = /\0/g;
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (env.allowedCorsOrigins.includes(origin)) return true;
  return !env.isProduction && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

function getRequestOrigin(req) {
  const origin = req.get('origin');
  if (origin) return origin.replace(/\/$/, '');

  const referer = req.get('referer');
  if (!referer) return '';

  try {
    return new URL(referer).origin;
  } catch {
    return '';
  }
}

export const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
};

export const securityHeaders = helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  hsts: env.isProduction ? undefined : false,
});

function rateLimitResponse(message) {
  return {
    success: false,
    error: { code: 'RATE_LIMITED', message },
  };
}

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitResponse('Too many authentication attempts. Please try again later.'),
});

export const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitResponse('Too many admin requests. Please try again later.'),
});

function sanitizeValue(value, depth = 0) {
  if (depth > 20) return null;
  if (typeof value === 'string') return value.replace(NULL_BYTE, '');
  if (!value || typeof value !== 'object') return value;

  if (Array.isArray(value)) {
    return value.map((entry) => sanitizeValue(entry, depth + 1));
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !DANGEROUS_KEYS.has(key))
      .map(([key, entry]) => [key.replace(NULL_BYTE, ''), sanitizeValue(entry, depth + 1)]),
  );
}

export function sanitizeRequest(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }

  try {
    if (req.query && typeof req.query === 'object') {
      req.query = sanitizeValue(req.query);
    }
  } catch {
    // Some Express query parser configurations expose req.query as read-only.
  }

  next();
}

export function validateRequestOrigin(req, res, next) {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const requestOrigin = getRequestOrigin(req);
  if (requestOrigin && isAllowedOrigin(requestOrigin)) {
    next();
    return;
  }

  if (!env.isProduction && !requestOrigin) {
    next();
    return;
  }

  next(ApiError.forbidden('Request origin is not allowed.'));
}

export function validateSecurityConfig() {
  if (!env.auth.jwtSecret) {
    throw new Error('JWT_SECRET must be set in the server environment.');
  }

  if (env.isProduction && env.allowedCorsOrigins.length === 0) {
    throw new Error('Set CORS_ORIGIN or PRODUCTION_FRONTEND_URL before starting the production server.');
  }

  if (env.isProduction && (!env.auth.adminUsername || !env.auth.adminPassword)) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in the production server environment.');
  }
}
