import './loadEnv.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import { env } from './config/env.js';
import { seedDatabase } from './database/seed.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';
import { ensureDefaultAdmin } from './services/authService.js';

fs.mkdirSync(env.uploadsRoot, { recursive: true });
seedDatabase();
ensureDefaultAdmin();

const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(env.uploadsPublicPath, express.static(env.uploadsRoot));

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Project Bharti API listening on http://localhost:${env.port}`);
});
