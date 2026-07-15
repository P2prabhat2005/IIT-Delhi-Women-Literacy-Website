import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_ROOT = path.resolve(__dirname, '..');

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  // `true` makes the `cors` package reflect the request's Origin header,
  // which is required for cookies to work with `credentials: true` (a
  // literal '*' is rejected by browsers when credentials are involved).
  corsOrigin: process.env.CORS_ORIGIN || true,
  serverRoot: SERVER_ROOT,
  dbFile: process.env.DB_FILE || path.join(SERVER_ROOT, 'data', 'bharti.sqlite'),
  uploadsRoot: process.env.UPLOADS_ROOT || path.join(SERVER_ROOT, 'uploads'),
  uploadsPublicPath: '/uploads',
  limits: {
    imageMaxBytes: 10 * 1024 * 1024,
    pdfMaxBytes: 15 * 1024 * 1024,
    videoMaxBytes: 60 * 1024 * 1024,
    documentMaxBytes: 20 * 1024 * 1024,
  },
  auth: {
    adminUsername: process.env.ADMIN_USERNAME || 'Shashank@11',
    adminPassword: process.env.ADMIN_PASSWORD || 'Shashank@2026',
    jwtSecret: process.env.JWT_SECRET || 'project-bharti-dev-secret-change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    cookieName: 'bharti_admin_token',
    cookieMaxAgeMs: 7 * 24 * 60 * 60 * 1000,
  },
};

export default env;
