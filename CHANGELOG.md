# Changelog

## 2026-07-10 - Scalable Media Architecture

### Summary

Built a centralized media architecture under `src/assets/` matching the Project Bharti Google Drive layout. Added `src/data/media.js` as the folder registry and `src/utils/mediaLoader.js` for dynamic asset resolution. No React UI components were modified.

### Files Added

- `src/data/media.js`
- `src/utils/mediaLoader.js`
- `src/assets/hero/.gitkeep`
- `src/assets/about/.gitkeep`
- `src/assets/activities/.gitkeep`
- `src/assets/activities/inaugural/.gitkeep`
- `src/assets/activities/fgd/.gitkeep`
- `src/assets/activities/phase1/.gitkeep`
- `src/assets/activities/phase2/.gitkeep`
- `src/assets/news/.gitkeep`
- `src/assets/research/.gitkeep`
- `src/assets/resources/training-modules/.gitkeep`
- `src/assets/resources/policy-briefs/.gitkeep`
- `src/assets/resources/toolkits/.gitkeep`
- `src/assets/states/{delhi,haryana,himachal-pradesh,uttarakhand,uttar-pradesh}/{gallery,news-clippings,research-documents,activities,videos}/.gitkeep`

### Files Modified

- `PROJECT_CONTEXT.md` — updated folder structure, media architecture (§8), data architecture, sprint priorities
- `CHANGELOG.md` — this entry

### Asset Folders Created

| Category | Path |
|----------|------|
| Hero | `src/assets/hero/` |
| About | `src/assets/about/` |
| Activities | `src/assets/activities/{inaugural,fgd,phase1,phase2}/` + legacy flat root |
| News | `src/assets/news/` |
| Research | `src/assets/research/` |
| Resources | `src/assets/resources/{training-modules,policy-briefs,toolkits}/` |
| States | `src/assets/states/{stateId}/{gallery,news-clippings,research-documents,activities,videos}/` |

### Media Registry (`src/data/media.js`)

- `mediaFolders` — canonical folder definitions with Google Drive mapping
- `PROJECT_STATE_IDS`, `ACTIVITY_PHASES`, `STATE_MEDIA_COLLECTIONS`, `RESOURCE_CATEGORIES`
- Path helpers: `getActivityPhasePath`, `getStateCollectionPath`, `getResourceCategoryPath`
- `googleDriveMapping` — Drive → local path reference table

### Media Loader (`src/utils/mediaLoader.js`)

- Preloads all asset folders via static Vite `import.meta.glob` patterns
- `resolveMediaForFolder`, `resolveActivityPhaseAsset`, `resolveResourceCategoryAsset`
- `listStateCollectionAssets`, `listStateAssets`, `buildStateImpactMediaItems`
- `getMediaInventory` for debugging asset counts

### Routes Changed

- None.

### Components Changed

- None (UI not modified per task requirements).

### Known Issues

- UI components still use inline `import.meta.glob` — migration to `mediaLoader.js` pending
- All new asset folders are empty (`.gitkeep` only) — awaiting Google Drive media copy
- Legacy `Activities.jsx` reads flat `src/assets/activities/*` only; phased subfolders require UI migration or flat fallback copies

### Verification Performed

- `npm run build` pending for this entry at creation time.

## 2026-07-09 - Homepage and About Page Refinement

### Summary

Refined the homepage and About page visual presentation without changing routing, the Interactive India Map, or the Activities page. The pass focused on typography hierarchy, spacing, card polish, button affordance, responsive alignment, subtle Framer Motion usage, and accessibility improvements.

### Files Modified

- `src/components/Hero.jsx`
- `src/components/AboutPreview.jsx`
- `src/components/ContactCTA.jsx`
- `src/pages/About.jsx`

### Components Updated

- `Hero`
  - Improved collaborator logo alignment, statistic card polish, button accessibility labels, and responsive type spacing.
- `AboutPreview`
  - Improved institutional cards, image placeholder language, Vision/Mission card motion, and section hierarchy.
- `ContactCTA`
  - Improved button polish and accessible CTA labeling.
- `About`
  - Replaced the placeholder page with a refined page using existing centralized Project Bharti content from `homepage.js`.

### Routes Changed

- No route definitions changed.
- Existing `/about` route now renders the refined About page content.

### Data Files Changed

- No data files changed in this refinement pass.

### Dependencies Added

- None.

### Known Issues

- Official images are still pending for:
  - `src/assets/hero/`
  - `src/assets/about/`
  - `src/assets/activities/`
- Some official metrics remain `TBD` until verified project data is available.

### Verification Performed

- `npm run build` pending for this entry at creation time.

## 2026-07-09 - Project Bharti Website Foundation and Presentation Build

### Summary

Built the React/Vite foundation for the Project Bharti website and upgraded the homepage plus Activities route into a production-quality institutional prototype. The site now uses centralized data files, reusable components, responsive layouts, Framer Motion animations, Lucide icons, and an interactive India map foundation.

## Files Modified

- `package.json`
- `package-lock.json`
- `vite.config.js`
- `src/App.jsx`
- `src/main.jsx`
- `src/styles/global.css`
- `src/layouts/MainLayout.jsx`
- `src/pages/Home.jsx`
- `src/pages/Activities.jsx`
- `src/pages/About.jsx`
- `src/pages/Resources.jsx`
- `src/pages/Contact.jsx`
- `src/pages/StateDetails.jsx`
- `src/pages/NotFound.jsx`
- `src/components/Hero.jsx`
- `src/components/AboutPreview.jsx`
- `src/components/Objectives.jsx`
- `src/components/InteractiveIndiaMap.jsx`
- `src/components/ActivitiesPreview.jsx`
- `src/components/ResourcesPreview.jsx`
- `src/components/Partners.jsx`
- `src/components/ContactCTA.jsx`
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `src/components/SectionTitle.jsx`
- `src/components/index.js`
- `src/data/homepage.js`
- `src/data/navigation.js`

## Files Added

- `CHANGELOG.md`
- `README.md`
- `docs/architecture.md`
- `start-project.bat`
- `src/components/ActivityCard.jsx`
- `src/components/ActivityTimeline.jsx`
- `src/data/activities.js`
- `src/data/stateImpact.js`
- `src/assets/logos/iit-delhi-logo.png`
- `src/assets/logos/exl-logo.png`
- `src/assets/maps/india-states.geojson`
- `src/assets/about/`
- `src/assets/activities/`
- `src/assets/hero/`
- `src/hooks/.gitkeep`
- `src/utils/.gitkeep`
- `src/assets/.gitkeep`

## Components Created

- `Navbar`
- `Footer`
- `Hero`
- `SectionTitle`
- `AboutPreview`
- `Objectives`
- `InteractiveIndiaMap`
- `ActivitiesPreview`
- `ResourcesPreview`
- `Partners`
- `ContactCTA`
- `ActivityCard`
- `ActivityTimeline`

## Routes Changed

React Router is configured in `src/App.jsx` with the shared `MainLayout`.

- `/` -> `Home`
- `/about` -> `About`
- `/activities` -> `Activities`
- `/resources` -> `Resources`
- `/states/:stateId` -> `StateDetails`
- `/contact` -> `Contact`
- `*` -> `NotFound`

The `/activities` route was upgraded from a placeholder into a full production-quality page.

## Data Files Changed

- `src/data/homepage.js`
  - Centralized homepage content.
  - Added Project Bharti hero content.
  - Added About Project Bharti, IIT Delhi, EXL, Vision, Mission, and CTA content.
  - Added objective and impact highlight data.
  - Retained placeholders for unavailable official metrics.

- `src/data/stateImpact.js`
  - Added scalable state-wise data for the interactive map.
  - Current Project Bharti states:
    - Delhi
    - Haryana
    - Himachal Pradesh
    - Uttarakhand
    - Uttar Pradesh
  - Each state supports districts, objectives, statistics, gallery images, news clippings, research documents, activities, and videos.

- `src/data/activities.js`
  - Added structured content for the Activities page:
    - Activities Overview
    - Inaugural Programme
    - Focus Group Discussions
    - District-wise Training Programmes
    - Training Methodology
    - Impact Highlights
    - Call-to-Action
    - Timeline phases

- `src/data/navigation.js`
  - Added primary navigation items.

## Dependencies Added

Runtime:

- `react`
- `react-dom`
- `react-router-dom`
- `framer-motion`
- `lucide-react`
- `react-simple-maps`

Development:

- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `@tailwindcss/vite`

Overrides:

- `d3-color@^3.1.0`
  - Added to resolve a high-severity transitive audit warning introduced through `react-simple-maps`.

## Known Issues

- Several official metrics are still unavailable and intentionally remain as `TBD`:
  - Districts covered
  - Women reached
  - SHGs engaged
  - Training sessions
  - Research outputs
- Real media has not been integrated yet.
  - `src/assets/hero/` needs an official hero image.
  - `src/assets/about/` needs official About/field images.
  - `src/assets/activities/` needs official activity images.
- Non-home pages other than `/activities` are still basic placeholders.
- The India GeoJSON asset is functional but large; it may need further optimization before deployment.
- The interactive map drawer uses placeholder media collections until official state-wise content is available.

## Verification Performed

- `npm install`
  - Dependencies installed successfully.
- `npm run build`
  - Production build completed successfully after each major implementation phase.
- `npm audit --audit-level=high`
  - Reported `0 vulnerabilities` after adding the `d3-color` override.
- Local Vite development server verified at:
  - `http://127.0.0.1:5173/`
  - `http://127.0.0.1:5173/activities`
- Route checks confirmed the React app renders nonblank pages.
- Browser/runtime checks found no React console errors during prior health checks.
