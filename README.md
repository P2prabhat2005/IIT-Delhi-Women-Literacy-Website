# Project Bharti

## Overview

Project Bharti is an IIT Delhi research and outreach initiative focused on financial and digital literacy, women entrepreneurship, capacity building, and field evidence. This repository contains its public, frontend-only website: institutional information, activities, stories, resources, an interactive India map, contact details, and local media.

There is no application server, database, authentication flow, or environment-backed content service in the current implementation.

## Technology Stack

- React 18
- Vite 8
- React Router 7
- Tailwind CSS 4
- Framer Motion
- Lucide React
- React Simple Maps
- Vercel static hosting configuration

## Repository Structure

```text
src/
  assets/       Imported images, the India GeoJSON, and reserved PDF space
  components/   Reusable page sections and interaction components
  data/         Authoritative editable site content and presentation data
  layouts/      Shared route layout, navigation, footer, and scroll handling
  pages/        Route-level React components
  styles/       Global Tailwind and application styles
  utils/        Motion, safe URL, and intro-video utilities
public/
  case-studies/ Published case-study PDFs served by stable URLs
  videos/       Intro and testimonial video assets served by stable URLs
scripts/        Asset-authoring utilities; not part of normal development or build
```

`media-source/`, when retained locally, is source media rather than an application runtime path. Vite emits imported `src/assets` files as hashed build assets and copies `public` files to stable root-relative paths.

## Local Development

Use the lockfile for a reproducible local install:

```bash
npm ci
npm run dev
```

Vite prints the local development URL. The repository does not currently declare a Node.js `engines` field; use a Node.js release supported by the locked Vite version.

On Windows systems where PowerShell blocks `npm.ps1`, use `npm.cmd run dev` instead.

## Production Build

```bash
npm run build
npm run preview
```

The production output directory is `dist/`. The verified command for this handoff was `npm.cmd run build` on Windows PowerShell.

## Deployment

The site is configured for Vercel as a static single-page application:

- build command: `npm run build`
- output directory: `dist`
- route handling: `vercel.json` rewrites public paths to `index.html`
- headers: `vercel.json` applies security headers and immutable caching to hashed `/assets/*`

No deployment credentials or environment variables are stored in this repository. Update `siteSettings.baseUrl` in `src/data/settings.js` with the approved production origin before launch so canonical and Open Graph URLs have an explicit fallback origin.

## Routing

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about` | About, leadership, objectives, and interactive map |
| `/activities` | Programme activities and implementation content |
| `/stories` | Stories from the Field index |
| `/stories/:slug` | Individual case-study narrative and PDF link |
| `/resources` | Case studies and practical resource library |
| `/resources/:slug` | Individual practical guide |
| `/contact` | Contact details, enquiry mailto form, and IIT Delhi map |
| `*` | Not found page |

Routes are code-split with `React.lazy`; `MainLayout` supplies shared navigation, footer, page transition, hash scrolling, and the homepage-only intro overlay.

## Content Management

| Content | Primary location |
| --- | --- |
| Homepage copy, objectives, previews, and calls to action | `src/data/homepage.js` |
| Activities page | `src/data/activities.js` |
| Stories and case-study metadata | `src/data/caseStudies.js`, `src/data/fieldStories.js` |
| Case-study image dimensions | `src/data/caseStudyImageSizes.js` |
| Resource collections and practical guides | `src/data/resources.js`, `src/data/practicalGuides.js` |
| India map coverage, metrics, and highlighting | `src/data/stateImpact.js` |
| State-panel media | `src/data/stateMedia.js` and `src/data/stateMedia/` |
| Team directory | `src/data/team.js` |
| Contact content | `src/data/contact.js` |
| Navigation, footer, site settings, and reusable image slots | `src/data/navigation.js`, `src/data/footer.js`, `src/data/settings.js`, `src/data/siteImages.js` |

Keep factual programme content in these data modules rather than embedding substantial content datasets in React components. Stories remain narrative pages; the Resources area links their source PDFs and contains separate practical guides.

## Media and Assets

- Imported images: `src/assets/images/`
- Interactive India map: `src/assets/maps/india-states.geojson`
- Case-study PDFs: `public/case-studies/`
- Intro video: `public/videos/project-bharti-opening.*`
- Participant testimonial videos and posters: `public/videos/testimonials/`

Use imported `src/assets` files when a Vite-hashed asset is appropriate. Use `public` only for assets that require stable public URLs, such as PDFs and video sources. Before removing any asset, trace its source/data reference and verify the production build.

## Interactive India Map

`src/components/InteractiveIndiaMap.jsx` renders `src/assets/maps/india-states.geojson` through React Simple Maps. Its projection, viewport configuration, visual styling, and state interaction are intentionally coupled to that source geometry.

`src/data/stateImpact.js` is the single source of truth for Project Bharti state coverage, derived district/place totals, map-name matching, and highlight colours. State gallery and media data is separate in `src/data/stateMedia.js`; it is loaded only with the lazy map component, rather than by unrelated routes.

Do not replace or edit individual state geometries without an approved authoritative geographic source and a focused map verification pass.

## Security

`vercel.json` provides the current production header policy:

- Content Security Policy (including self-only scripts/media and restricted Google Maps frames)
- HSTS, `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff`
- Referrer Policy, Permissions Policy, COOP, CORP, and cross-domain policy restrictions
- Immutable caching for hashed `/assets/*`

Client-side navigation uses `src/utils/safeUrl.js` to restrict external links to HTTP(S), reject unsafe relative URLs, validate mailto targets, and sanitize hash targets. New-tab links use `noopener noreferrer`. The codebase does not use `dangerouslySetInnerHTML`, `eval`, or `new Function`.

## Performance

- Routes and the interactive map are lazy-loaded.
- The GeoJSON is fetched and cached only when the map component mounts.
- State media is separated from state-impact data.
- The intro video uses a shared deferred source attachment after critical paint and respects reduced-motion and reduced-data preferences.
- Testimonial cards load poster images; their MP4 sources are mounted only after a user opens the modal.
- Case-study images include intrinsic dimensions, with non-primary gallery images lazy-loaded.
- Imported assets are content-hashed by Vite; production source maps are disabled in `vite.config.js`.

## Environment Variables

No environment variables are currently required. `.env` files are ignored and should not be committed. If a future integration requires configuration, document its purpose and provide an `.env.example` without secrets.

## Build Verification

Run before handoff or deployment:

```bash
npm run build
npm audit
```

This handoff verified `npm.cmd run build` successfully and `npm audit` reported `0 vulnerabilities`.

## Deployment Notes

After deployment, verify fresh loads of every public route, the Vercel SPA rewrite, all PDF/video URLs, Google Maps embedding, keyboard and reduced-motion behaviour, canonical URLs, and browser console output.

Replace the relative `<loc>` values in `public/sitemap.xml` with absolute URLs after the approved production domain is known. Confirm that `siteSettings.baseUrl` uses the same canonical origin.

## Known Non-Blocking Items

- `package.json` uses `latest` ranges for several direct dependencies. The committed lockfile currently provides reproducible installs through `npm ci`, but IIT Delhi should replace floating ranges with reviewed version ranges in a separate dependency-maintenance change.
- The project does not currently declare a Node.js `engines` version.
- The contact phone number and research collaboration email are marked as placeholders in `src/data/contact.js` and require institutional confirmation before public launch.
- `scripts/` contains retained, one-off PDF/image asset-authoring utilities. They are not invoked by development or production builds; review and explicitly maintain their tool dependencies before using them for new source material.
