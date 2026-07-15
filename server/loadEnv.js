import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Loaded before anything else in `index.js` so `.env` values are available
// by the time `config/env.js` reads `process.env`. Safe to skip if no
// `.env` file exists (e.g. in environments that inject real env vars).
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env');

if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}
