import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_ROOT = path.resolve(__dirname, '..');

function parseList(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

const localFrontendOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178',
  'http://localhost:5179',
  'http://localhost:5180',
  'http://localhost:5181',
  'http://localhost:5182',
  'http://localhost:5183',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176',
  'http://127.0.0.1:5177',
  'http://127.0.0.1:5178',
  'http://127.0.0.1:5179',
  'http://127.0.0.1:5180',
  'http://127.0.0.1:5181',
  'http://127.0.0.1:5182',
  'http://127.0.0.1:5183',
];

const explicitCorsOrigins = [
  ...parseList(process.env.CORS_ORIGIN),
  ...parseList(process.env.FRONTEND_URL),
  ...parseList(process.env.PRODUCTION_FRONTEND_URL),
];
const isProduction = process.env.NODE_ENV === 'production';

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction,
  allowedCorsOrigins: Array.from(new Set([
    ...explicitCorsOrigins,
    ...(process.env.NODE_ENV === 'production' ? [] : localFrontendOrigins),
  ])),
  serverRoot: SERVER_ROOT,
  dbFile: process.env.DB_FILE || path.join(SERVER_ROOT, 'data', 'bharti.sqlite'),
  databaseUrl: (process.env.DATABASE_URL || '').trim(),
  databaseBackend: (process.env.DATABASE_BACKEND || 'sqlite').trim().toLowerCase(),
  uploadsRoot: process.env.UPLOADS_ROOT || path.join(SERVER_ROOT, 'uploads'),
  uploadsPublicPath: '/uploads',
  jsonLimit: process.env.JSON_BODY_LIMIT || '2mb',
  limits: {
    imageMaxBytes: 10 * 1024 * 1024,
    pdfMaxBytes: 15 * 1024 * 1024,
    videoMaxBytes: 60 * 1024 * 1024,
    documentMaxBytes: 20 * 1024 * 1024,
  },
  auth: {
    adminUsername: (process.env.ADMIN_USERNAME || (isProduction ? '' : 'Shashank@11')).trim(),
    adminPassword: (process.env.ADMIN_PASSWORD || (isProduction ? '' : 'Shashank@2026')).trim(),
    jwtSecret: process.env.JWT_SECRET || (isProduction ? '' : 'project-bharti-development-jwt-secret'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    cookieName: 'bharti_admin_token',
    cookieMaxAgeMs: 7 * 24 * 60 * 60 * 1000,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
};

export default env;
