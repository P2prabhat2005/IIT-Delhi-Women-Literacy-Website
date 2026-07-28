# Project Bharti

Static React + Vite website for Project Bharti, an IIT Delhi initiative focused on digital and financial literacy in the context of women’s entrepreneurship.

The site is frontend-only. All page content lives in `src/data`. Images, PDFs, and videos are local static assets — no Express API, database, authentication, or cloud media service.

## Tech stack

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- React Simple Maps

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  assets/
    images/          # Site images (hero, logos, about, activities, team)
    pdfs/            # Downloadable PDFs
    maps/            # India GeoJSON for the impact map
  components/        # UI components
  data/              # Editable website content (JS)
  layouts/
  pages/
  styles/
public/
  videos/            # Local videos served as static files
```

## Content and media

Edit copy and structure in `src/data`:

| File | Purpose |
|------|---------|
| `homepage.js` | Hero, about snippets, activities/resources previews, partners, footer |
| `activities.js` | Activities page |
| `resources.js` | Resources library |
| `team.js` | Project leadership and development team |
| `contact.js` | Contact page |
| `stateImpact.js` | India map state data |
| `siteImages.js` | Image slot keys → local asset URLs (or `null` for empty state) |
| `heroDocuments.js` | Hero capability PDF links |
| `settings.js` | Site name, tagline, copyright, base URL |
| `navigation.js` | Primary nav links |

When final media is ready:

1. Place images under `src/assets/images/…` and wire them in `siteImages.js` / team / resources data.
2. Place PDFs under `src/assets/pdfs/` and set `document: { url, fileName }` (or hero document entries).
3. Place videos under `public/videos/` and set `video: { url: '/videos/…' }`.

Empty slots keep the existing placeholder UI until assets are linked. No backend changes are required.

## Deployment (Vercel)

This project is a static SPA. `vercel.json` rewrites all routes to `index.html`.

1. Connect the repo to Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `siteSettings.baseUrl` in `src/data/settings.js` to the production domain for correct canonical/OG URLs.

No server environment variables are required.

## Release checklist

Before each production deployment:

1. Run `npm run build` and confirm it completes without errors.
2. Check every public route directly, including a fresh load of each nested route.
3. Verify keyboard navigation, visible focus states, reduced-motion behavior, and mobile layouts.
4. Confirm all images, PDFs, videos, map data, and external links load as expected.
5. Review the browser console for errors and confirm the production domain is configured in `siteSettings.baseUrl` before publishing.
