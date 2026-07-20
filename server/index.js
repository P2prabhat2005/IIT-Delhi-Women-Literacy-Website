import './loadEnv.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import { env } from './config/env.js';
import { seedDatabase, seedTeamDirectory } from './database/seed.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { corsOptions, sanitizeRequest, securityHeaders, validateSecurityConfig } from './middleware/security.js';
import apiRoutes from './routes/index.js';
import { ensureDefaultAdmin } from './services/authService.js';

validateSecurityConfig();
fs.mkdirSync(env.uploadsRoot, { recursive: true });
seedDatabase();
seedTeamDirectory();
ensureDefaultAdmin();

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: env.jsonLimit, strict: true }));
app.use(express.urlencoded({ extended: false, limit: env.jsonLimit }));
app.use(sanitizeRequest);
app.use(env.uploadsPublicPath, express.static(env.uploadsRoot));

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  if (!env.isProduction) {
    console.log(`Project Bharti API listening on http://localhost:${env.port}`);
  }
});
