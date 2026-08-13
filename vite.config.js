import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Production source maps would ship the original frontend source in dist/.
    // Keep them off for public releases; enable locally only when debugging a production bundle.
    sourcemap: false,
  },
});
