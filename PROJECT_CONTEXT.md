# PROJECT_CONTEXT.md

> **Purpose:** Onboarding document for any AI assistant (Cursor, Codex, Claude, etc.) working on **Project Bharti**. Read this file first before making changes.
>
> **Last updated:** 2026-07-10 (media architecture)  
> **Project path:** `C:\Users\prabh\OneDrive\Desktop\IIT-Delhi-Women-Literacy-Website`

---

## 1. Project Overview

**Project Bharti** is the official website for an IIT Delhi research initiative (with EXL as knowledge partner) focused on **digital and financial literacy for women entrepreneurs**, especially SHG-linked micro-enterprises.

| Field | Value |
|-------|-------|
| **Full title** | Digital and Financial Literacy in the Context of Women's Entrepreneurship |
| **Brand name** | Project Bharti |
| **Lead institution** | IIT Delhi |
| **Knowledge partner** | EXL |
| **Current states** | Delhi, Haryana, Himachal Pradesh, Uttarakhand, Uttar Pradesh |
| **Stage** | Institutional prototype (~60–70% complete) |
| **Package name** | `iit-delhi-women-literacy-website` |
| **Version** | `0.1.0` |

The site is a **static, content-driven React SPA** — no backend, CMS, or authentication yet. All copy and structured data live in `src/data/*.js`.

---

## 2. Architecture

### Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Build | Vite 8 | `@vitejs/plugin-react` |
| UI | React 18.3 | JSX only — **no TypeScript** |
| Routing | React Router | Nested routes under `MainLayout` |
| Styling | Tailwind CSS v4 | Via `@tailwindcss/vite` + `src/styles/global.css` |
| Animation | Framer Motion | Scroll parallax, `whileInView`, slide-over panels |
| Icons | Lucide React | Icon components passed from data files |
| Map | react-simple-maps | + local GeoJSON (~2.5 MB) |
| State | None | No Redux, Zustand, or Context for app data |

### Application flow

```
index.html
  └── main.jsx (BrowserRouter + global.css)
        └── App.jsx (Routes)
              └── MainLayout (Navbar + Outlet + Footer)
                    └── Page components
                          └── Section components
                                └── src/data/*.js (static content)
                                └── src/assets/* (images, GeoJSON)
```

### Key architectural decisions

1. **Data-first:** All page copy, metrics, navigation, and state impact data are centralized in `src/data/`. Components should import from data files — avoid hardcoding content in JSX.
2. **No API layer:** Metrics marked `TBD` until official field data is available.
3. **Asset discovery:** Centralized in `src/data/media.js` + `src/utils/mediaLoader.js`. Legacy UI still uses inline `import.meta.glob` in `Hero.jsx`, `AboutPreview.jsx`, `Activities.jsx` until migrated.
4. **Map UX:** State details open in a **slide-over panel** on the homepage — not via the `/states/:stateId` route (that route exists but is unused).
5. **Incremental build:** Foundation → homepage → activities → about refinement. Remaining pages are stubs.

### Installed dependencies (runtime)

- `react`, `react-dom`, `react-router-dom`
- `framer-motion`, `lucide-react`, `react-simple-maps`
- Override: `d3-color@^3.1.0` (security fix for transitive dep)

### Dev commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output → dist/
npm run preview
```

Desktop shortcut: `C:\Users\prabh\OneDrive\Desktop\start-project.bat` starts dev server and opens browser.

---

## 3. Folder Structure

```
IIT-Delhi-Women-Literacy-Website/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── PROJECT_CONTEXT.md      ← this file (AI onboarding)
├── CHANGELOG.md            ← authoritative change history
├── README.md               ← outdated — prefer this file + CHANGELOG
├── docs/
│   └── architecture.md     ← outdated — superseded by this file
├── dist/                   ← build output (do not edit manually)
└── src/
    ├── main.jsx            # Entry: ReactDOM + BrowserRouter
    ├── App.jsx             # Route definitions
    ├── layouts/
    │   └── MainLayout.jsx  # Navbar + <Outlet> + Footer
    ├── pages/              # One file per route
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Activities.jsx
    │   ├── Resources.jsx   # PLACEHOLDER
    │   ├── Contact.jsx     # PLACEHOLDER
    │   ├── StateDetails.jsx # PLACEHOLDER (orphan route)
    │   └── NotFound.jsx
    ├── components/         # Reusable UI (barrel: index.js)
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── SectionTitle.jsx
    │   ├── AboutPreview.jsx
    │   ├── Objectives.jsx
    │   ├── InteractiveIndiaMap.jsx
    │   ├── ActivitiesPreview.jsx
    │   ├── ResourcesPreview.jsx
    │   ├── Partners.jsx
    │   ├── ContactCTA.jsx
    │   ├── ActivityCard.jsx
    │   ├── ActivityTimeline.jsx
    │   └── index.js
    ├── data/               # ALL content lives here
    │   ├── homepage.js
    │   ├── activities.js
    │   ├── stateImpact.js
    │   ├── navigation.js
    │   └── media.js        # Centralized media folder registry
    ├── styles/
    │   └── global.css      # Tailwind import + design tokens
    ├── assets/             # See §8 Media Architecture
    │   ├── logos/          # iit-delhi-logo.png, exl-logo.png ✓
    │   ├── maps/           # india-states.geojson ✓
    │   ├── hero/
    │   ├── about/
    │   ├── activities/
    │   │   ├── inaugural/
    │   │   ├── fgd/
    │   │   ├── phase1/
    │   │   └── phase2/
    │   ├── news/
    │   ├── research/
    │   ├── resources/
    │   │   ├── training-modules/
    │   │   ├── policy-briefs/
    │   │   └── toolkits/
    │   └── states/
    │       ├── delhi/
    │       ├── haryana/
    │       ├── himachal-pradesh/
    │       ├── uttarakhand/
    │       └── uttar-pradesh/
    │           └── (each state: gallery, news-clippings,
    │                research-documents, activities, videos)
    ├── hooks/              # .gitkeep only
    └── utils/
        └── mediaLoader.js  # Dynamic asset loading helpers
```

---

## 4. Routing

Defined in `src/App.jsx`:

| Route | Page | Status |
|-------|------|--------|
| `/` | `Home` | ✅ Complete |
| `/about` | `About` | ✅ Complete (refined 2026-07-09) |
| `/activities` | `Activities` | ✅ Complete |
| `/resources` | `Resources` | ❌ Placeholder |
| `/contact` | `Contact` | ❌ Placeholder |
| `/states/:stateId` | `StateDetails` | ❌ Placeholder (not linked from UI) |
| `*` | `NotFound` | ✅ Basic 404 |

Navigation items (`src/data/navigation.js`): About, Activities, Resources, Contact.

---

## 5. Current Sprint

**Sprint focus (as of 2026-07-10):** Documentation + content readiness for launch polish.

### Recently completed (2026-07-09)

- Homepage visual refinement (Hero, AboutPreview, ContactCTA)
- About page upgraded from placeholder to full data-driven page
- Typography, spacing, card polish, accessibility labels
- Activities page built to production quality
- Interactive India map foundation with 5 states + slide-over panel

### Active / next-up priorities

1. ~~Create scalable media architecture~~ ✅ (2026-07-10)
2. Copy official media from Google Drive → `src/assets/` subfolders
3. Wire UI components to `mediaLoader.js` (Hero, AboutPreview, Activities, map panel)
4. Replace `TBD` metrics with verified field data
5. Build **Resources** and **Contact** pages
6. Add **mobile navigation** (navbar hidden below `md` breakpoint)
7. Populate state-wise media in `stateImpact.js` via `buildStateImpactMediaItems()`
8. Optimize GeoJSON asset size before deployment

### Out of scope for current sprint

- Backend / contact form API
- CMS integration
- i18n (Hindi/regional languages)
- Authentication

---

## 6. Completed Features

### Layout & shell
- [x] `MainLayout` with sticky Navbar and Footer
- [x] Responsive container system (`.site-container`, `.section`)
- [x] Design tokens: IIT Delhi red (`#7f1d1d`), institutional typography
- [x] Primary + secondary button styles

### Homepage (`/`) — 9 sections
- [x] **Hero** — logos, CTAs, stat cards, parallax, Framer Motion
- [x] **AboutPreview** — IIT Delhi / EXL cards, vision/mission, image collage slots
- [x] **Objectives** — 6 objective cards + animated impact counters (TBD-aware)
- [x] **InteractiveIndiaMap** — clickable map, 5 states, slide-over detail panel
- [x] **ActivitiesPreview** — 3 activity cards
- [x] **ResourcesPreview** — 3 resource cards + link to `/resources`
- [x] **Partners** — 4 partner categories
- [x] **ContactCTA** — collaboration channels + contact link

### About page (`/about`)
- [x] Institutional cards (IIT Delhi, EXL)
- [x] Project overview, vision, mission
- [x] Framer Motion scroll animations

### Activities page (`/activities`)
- [x] Overview + 4-phase timeline
- [x] Inaugural programme, FGDs, district training, methodology
- [x] Impact highlights + CTA
- [x] `ActivityCard` and `ActivityTimeline` components
- [x] Image slots via `import.meta.glob` (fallback placeholders when empty)

### Interactive map
- [x] GeoJSON async load with error handling
- [x] State highlighting on click (Delhi, Haryana, HP, Uttarakhand, UP)
- [x] Slide-over panel: objectives, stats, media collection placeholders
- [x] Keyboard support (Enter/Space) on highlighted states

### Data layer
- [x] `homepage.js` — hero, about, objectives, resources preview, partners, CTA
- [x] `activities.js` — full activities page content
- [x] `stateImpact.js` — 5 states with scalable schema
- [x] `navigation.js` — nav items
- [x] `media.js` — centralized folder registry + Google Drive mapping

### Media architecture
- [x] Scalable `src/assets/` folder tree (hero, about, activities, news, research, resources, states)
- [x] `mediaLoader.js` — dynamic asset resolution helpers
- [ ] Official images copied into asset folders
- [ ] UI migration from inline globs to `mediaLoader.js`

### Assets present
- [x] `iit-delhi-logo.png`, `exl-logo.png`
- [x] `india-states.geojson` (functional, ~2.5 MB)

---

## 7. Pending Features

### Pages (stubs only)
- [ ] **Contact** — form or contact details; reuse `contactChannels` / `contactCtaContent`
- [ ] **Resources** — training modules, policy briefs, toolkits (preview data exists in `homepage.js`)
- [ ] **StateDetails** — decide: implement full page OR remove route and keep slide-over only

### Content & data
- [ ] Replace all `TBD` metrics (districts, women reached, SHGs, sessions, research outputs)
- [ ] Populate `districtsCovered[]` per state in `stateImpact.js`
- [ ] Fill state media arrays: `galleryImages`, `newsClippings`, `researchDocuments`, `activities`, `videos`
- [ ] Remove or update stale unused `states` export in `homepage.js` (lists wrong states)

### Media (folders scaffolded — awaiting official files)
- [ ] `src/assets/hero/` — hero background
- [ ] `src/assets/about/` — about collage (3 images)
- [ ] `src/assets/activities/{inaugural,fgd,phase1,phase2}/` — phased activity images
- [ ] `src/assets/activities/` — legacy flat folder (current UI still reads this)
- [ ] `src/assets/news/`, `src/assets/research/` — project-wide media
- [ ] `src/assets/resources/{training-modules,policy-briefs,toolkits}/`
- [ ] `src/assets/states/{stateId}/{collection}/` — per-state field media

### UX & production
- [ ] Mobile navigation (hamburger or bottom nav)
- [ ] SEO: meta description, Open Graph, favicon
- [ ] GeoJSON optimization (TopoJSON or simplified geometry)
- [ ] Pin dependency versions in `package.json` (currently `"latest"`)
- [ ] Add `.gitignore` if missing
- [ ] ESLint + build CI
- [ ] Update `README.md` and `docs/architecture.md`

---

## 8. Media Architecture

### Local folder tree (`src/assets/`)

```
src/assets/
├── logos/                          # Brand (present: IIT Delhi, EXL)
├── maps/                           # india-states.geojson
├── hero/                           # Homepage hero background
├── about/                          # About collage (up to 3 images)
├── activities/
│   ├── (root)                      # Legacy flat — current UI reads here
│   ├── inaugural/                  # Phase 01
│   ├── fgd/                        # Phase 02
│   ├── phase1/                     # Phase 03 (district training)
│   └── phase2/                     # Phase 04 (documentation)
├── news/                           # Project-wide news clippings
├── research/                       # Project-wide research outputs
├── resources/
│   ├── training-modules/
│   ├── policy-briefs/
│   └── toolkits/
└── states/
    ├── delhi/
    ├── haryana/
    ├── himachal-pradesh/
    ├── uttarakhand/
    └── uttar-pradesh/
        └── (each state)
            ├── gallery/
            ├── news-clippings/
            ├── research-documents/
            ├── activities/
            └── videos/
```

### Centralized media files

| File | Role |
|------|------|
| `src/data/media.js` | Folder registry, Google Drive mapping, path helpers, state/activity keys |
| `src/utils/mediaLoader.js` | Vite `import.meta.glob` preloads + resolution helpers |

### Key `mediaLoader.js` exports

```javascript
import {
  resolveMediaForFolder,       // hero, about, logos, news, research
  resolveActivityPhaseAsset,   // inaugural | fgd | phase1 | phase2
  listActivityPhaseAssets,
  resolveResourceCategoryAsset,
  listStateCollectionAssets,   // stateId + collection key
  listStateAssets,             // all collections for one state
  buildStateImpactMediaItems,  // → stateImpact.js-ready objects
  getMediaInventory,           // debug: asset counts per registry key
} from '../utils/mediaLoader.js';
```

### Google Drive structure (canonical mapping)

> **Note:** No Google Drive URL is stored in the repo yet. Update `GOOGLE_DRIVE_ROOT` when the team shares the link.

```
GOOGLE_DRIVE_ROOT/
└── Project Bharti Website Media/
    ├── 00-brand/logos/              → src/assets/logos/
    ├── 01-hero/                     → src/assets/hero/
    ├── 02-about/                    → src/assets/about/
    ├── 03-activities/
    │   ├── inaugural/               → src/assets/activities/inaugural/
    │   ├── fgd/                     → src/assets/activities/fgd/
    │   ├── phase1/                  → src/assets/activities/phase1/
    │   ├── phase2/                  → src/assets/activities/phase2/
    │   └── (root flat files)        → src/assets/activities/  [legacy UI]
    ├── 04-states/
    │   └── {stateId}/{collection}/ → src/assets/states/{stateId}/{collection}/
    ├── 05-resources/
    │   ├── training-modules/        → src/assets/resources/training-modules/
    │   ├── policy-briefs/           → src/assets/resources/policy-briefs/
    │   └── toolkits/                → src/assets/resources/toolkits/
    ├── 07-news/                     → src/assets/news/
    ├── 08-research/                 → src/assets/research/
    └── 06-metrics/                  → update src/data/homepage.js + stateImpact.js
```

Full mapping array: `googleDriveMapping` in `src/data/media.js`.

### Media → code mapping rules

| Drive folder | Local path | Loader function |
|--------------|------------|-----------------|
| `01-hero/` | `src/assets/hero/` | `resolveMediaForFolder('hero')` |
| `02-about/` | `src/assets/about/` | `resolveMediaForFolder('about')` |
| `03-activities/inaugural/` | `src/assets/activities/inaugural/` | `resolveActivityPhaseAsset('inaugural')` |
| `03-activities/fgd/` | `src/assets/activities/fgd/` | `resolveActivityPhaseAsset('fgd')` |
| `03-activities/phase1/` | `src/assets/activities/phase1/` | `resolveActivityPhaseAsset('phase1')` |
| `03-activities/phase2/` | `src/assets/activities/phase2/` | `resolveActivityPhaseAsset('phase2')` |
| `04-states/*/` | `src/assets/states/*/` | `listStateCollectionAssets(stateId, key)` |
| `05-resources/*/` | `src/assets/resources/*/` | `resolveResourceCategoryAsset(key)` |
| `07-news/` | `src/assets/news/` | `resolveMediaForFolder('news')` |
| `08-research/` | `src/assets/research/` | `resolveMediaForFolder('research')` |
| `00-brand/logos/` | `src/assets/logos/` | `resolveMediaForFolder('logos')` |

### Legacy UI compatibility

Current components (`Hero.jsx`, `AboutPreview.jsx`, `Activities.jsx`) still use **inline** `import.meta.glob`. They read:

- `src/assets/hero/*`
- `src/assets/about/*`
- `src/assets/activities/*` (flat root only — not subfolders)

Until UI is migrated, place backward-compatible flat copies in `src/assets/activities/` root **or** update components to use `mediaLoader.js`.

### File naming conventions for Drive uploads

- Use **lowercase kebab-case**: `district-training.jpg`, not `District Training.JPG`
- Prefer **WebP or JPG** for photos; **PNG** for logos
- Keep originals in Drive; export web-optimized copies to `src/assets/`
- Max recommended width: **1920px** for hero, **800px** for cards

---

## 9. AI Workflow

Guidelines for any AI assistant continuing this project.

### Before starting work

1. **Read this file** (`PROJECT_CONTEXT.md`) and the latest entries in `CHANGELOG.md`.
2. **Inspect before editing** — understand routing, data files, and component reuse.
3. **Confirm scope** with the user if the task touches multiple pages or data schemas.
4. **Do not assume** README or `docs/architecture.md` are current — they lag behind implementation.

### During development

| Rule | Detail |
|------|--------|
| **Content goes in data files** | Edit `src/data/*.js`, not hardcoded JSX strings |
| **Minimal diffs** | Match existing patterns; don't refactor unrelated code |
| **Preserve placeholders** | Keep `TBD` until official data is confirmed — don't invent metrics |
| **Images** | Copy to `src/assets/` subfolders per `media.js`; use `mediaLoader.js` for resolution |
| **Animations** | Use Framer Motion consistently (`whileInView`, `viewport={{ once: true }}`) |
| **Accessibility** | Include `aria-label`, `aria-labelledby`, semantic HTML |
| **No backend** | Don't add API routes, env secrets, or server code unless explicitly requested |

### After completing work

1. **Update `CHANGELOG.md`** with: summary, files changed, routes affected, known issues.
2. **Run `npm run build`** to verify production build (unless user says read-only).
3. **Do not commit** unless the user explicitly asks.
4. **Do not push** unless explicitly asked.

### Recommended prompt pattern for users

```
We are continuing Project Bharti.
Project location: C:\Users\prabh\OneDrive\Desktop\IIT-Delhi-Women-Literacy-Website
Read PROJECT_CONTEXT.md first.

Task: [specific task]
Constraints: [e.g. don't modify routing, data-only change, etc.]
```

### What NOT to do

- Don't replace `TBD` with fabricated statistics
- Don't remove placeholder pages without user approval
- Don't add TypeScript, Redux, or a CMS without explicit request
- Don't modify `node_modules/` or `dist/`
- Don't force-push to main

---

## 10. Coding Conventions

### Language & files

- **JavaScript + JSX** only (`.jsx` for components, `.js` for data/utilities)
- **ES modules** (`import` / `export`)
- Explicit `.jsx` / `.js` extensions in import paths

### Components

- **Functional components** only; hooks where needed
- **One component per file**; default export
- Shared homepage components exported via `src/components/index.js`
- Page-specific components (e.g. `ActivityCard`) imported directly
- Use `SectionTitle` for all section headings (eyebrow + title + description)

### Styling

- **Tailwind utility classes** inline in JSX
- Global utilities in `global.css`: `.site-container`, `.section`, `.btn-primary`, `.btn-secondary`, `.nav-link`, `.section-heading`
- Color palette: red-900/800 (`#7f1d1d`) primary, slate neutrals, white cards
- Border radius: `rounded-2xl`, `rounded-[1.5rem]`, `rounded-[2rem]` for cards
- Responsive: mobile-first; `md:` and `lg:` breakpoints

### Data files

- Export named constants (not default exports)
- Lucide icons imported and stored as `Icon` property in objects
- Use `placeholder: 'TBD'` + `value: null` for unknown metrics
- State IDs: kebab-case (`delhi`, `himachal-pradesh`, `uttar-pradesh`)

### Assets

```javascript
// Preferred — centralized loader (src/utils/mediaLoader.js)
import { resolveMediaForFolder, resolveActivityPhaseAsset } from '../utils/mediaLoader.js';

const heroImage = resolveMediaForFolder('hero');
const inauguralImage = resolveActivityPhaseAsset('inaugural');

// Legacy — inline glob still used by Hero, AboutPreview, Activities (not yet migrated)
const assets = import.meta.glob('../assets/hero/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});
```

### Animations (Framer Motion)

- Entry: `initial={{ opacity: 0, y: 18 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Always set `viewport={{ once: true, margin: '-70px' }}` for scroll triggers
- Stagger with `delay: index * 0.05`

---

## 11. Data Architecture

### File responsibilities

| File | Purpose | Consumed by |
|------|---------|-------------|
| `navigation.js` | Primary nav links | `Navbar.jsx` |
| `homepage.js` | Hero, about, objectives, previews, partners, footer, CTA | Home page sections, About page, Footer |
| `activities.js` | Full activities page content + timeline | `Activities.jsx` |
| `stateImpact.js` | Per-state data for interactive map | `InteractiveIndiaMap.jsx` |
| `media.js` | Asset folder registry, Drive mapping, path helpers | `mediaLoader.js` (future UI migration) |

### `media.js` key exports

- `mediaFolders` — top-level folder registry (hero, about, activities, states, etc.)
- `PROJECT_STATE_IDS` — `['delhi', 'haryana', 'himachal-pradesh', 'uttarakhand', 'uttar-pradesh']`
- `ACTIVITY_PHASES` — inaugural, fgd, phase1, phase2 (+ legacy imageKey mapping)
- `STATE_MEDIA_COLLECTIONS` — gallery, news-clippings, research-documents, activities, videos
- `RESOURCE_CATEGORIES` — training-modules, policy-briefs, toolkits
- `googleDriveMapping` — Drive folder → local path reference
- `getStateCollectionPath(stateId, collectionKey)` — path builder
- `buildStateImpactMediaItems(stateId)` — in `mediaLoader.js`, generates `stateImpact.js`-ready objects

### `homepage.js` key exports

- `heroContent` — title, subtitle, CTAs, stats, pillars
- `aboutProjectContent` — institutions, overview, vision/mission
- `objectives` — 6 objective cards
- `objectiveImpactHighlights` — 6 metrics (mostly TBD)
- `activities` — 3 preview cards (homepage only; not the full activities page)
- `resources` — 3 preview cards
- `partners`, `contactChannels`, `contactCtaContent`, `footerLinks`
- `states` — **UNUSED / STALE** (lists wrong states — do not use)

### `stateImpact.js` schema (per state)

```javascript
{
  id: 'delhi',                    // kebab-case, matches route param if used
  stateName: 'Delhi',             // must match GeoJSON properties.name
  districtsCovered: [],           // string[]
  shortDescription: '...',
  objectives: ['...'],            // string[]
  statistics: [{ label, value }],  // value often 'TBD'
  galleryImages: [],              // { title, url }[] — empty until populated
  newsClippings: [],
  researchDocuments: [],
  activities: [],
  videos: [],
}
```

Helper exports: `projectBhartiStates`, `projectBhartiStateNames`, `projectBhartiStateByName`.

### `activities.js` structure

- `activitiesPageContent.overview` — intro + 3 cards
- `inauguralProgramme` — `imageKey: 'inaugural'`
- `focusGroupDiscussions` — `imageKey: 'fgd'`
- `districtTrainingProgrammes` — `imageKey: 'district-training'`, states list
- `methodology.steps` — 4-step pipeline
- `impactHighlights.cards` — 4 cards
- `callToAction` — links to `/contact` and `/resources`
- `timeline` — 4 phases

### GeoJSON state name alignment

These names in `stateImpact.js` **must exactly match** `india-states.geojson` `properties.name`:

- Delhi
- Haryana
- Himachal Pradesh
- Uttarakhand
- Uttar Pradesh

---

## 12. Future Roadmap

### Phase 1 — Launch polish (near term)
- [ ] Integrate all official media from Google Drive
- [ ] Complete Resources and Contact pages
- [ ] Mobile navigation
- [ ] Replace TBD metrics with verified data
- [ ] Populate state media in map slide-over
- [ ] SEO basics (meta, favicon, OG tags)
- [ ] GeoJSON optimization
- [ ] Pin dependencies, add `.gitignore`, CI build

### Phase 2 — Enhanced UX (medium term)
- [ ] Deep-linkable state pages (`/states/delhi`) synced with map panel
- [ ] Document download / PDF viewer for research outputs
- [ ] Video embed support in state panels
- [ ] Contact form with email backend (Formspree, Netlify Forms, or IIT server)
- [ ] Analytics (privacy-conscious)
- [ ] Accessibility audit + reduced-motion support

### Phase 3 — Scale (long term)
- [ ] Headless CMS (Sanity, Contentful) for non-developer updates
- [ ] Hindi / regional language support (i18n)
- [ ] Admin dashboard for field teams to upload state media
- [ ] Search across resources and documents
- [ ] Performance: lazy-load map, code splitting, image CDN

---

## 13. Known Issues & Gotchas

| Issue | Impact | Workaround |
|-------|--------|------------|
| Navbar hidden on mobile | No nav on small screens | Priority fix needed |
| `/states/:stateId` unused | Orphan route | Map uses inline panel instead |
| GeoJSON ~2.5 MB | Slow initial load | Optimize before deploy |
| `"latest"` in package.json | Non-reproducible installs | Pin versions |
| README/architecture outdated | AI confusion | Use this file instead |
| `homepage.js` `states` export | Dead code with wrong data | Ignore or remove in cleanup sprint |
| Empty asset folders | Placeholder UI shown | Folders scaffolded; copy media from Drive |

---

## 14. Related Documents

| Document | Status | Use |
|----------|--------|-----|
| `PROJECT_CONTEXT.md` | ✅ Current | **Start here** (AI onboarding) |
| `CHANGELOG.md` | ✅ Current | Change history and verification notes |
| `README.md` | ⚠️ Outdated | Says "placeholder foundation" — misleading |
| `docs/architecture.md` | ⚠️ Outdated | Pre-implementation notes |

---

## 15. Quick Reference for AI

```
Project:     Project Bharti (IIT Delhi Women Literacy Website)
Path:        C:\Users\prabh\OneDrive\Desktop\IIT-Delhi-Women-Literacy-Website
Stack:       React 18 + Vite 8 + Tailwind 4 + React Router + Framer Motion
Content:     src/data/*.js (never hardcode copy in components)
Media:       src/data/media.js + src/utils/mediaLoader.js
Done:        Home, About, Activities, Map, Layout
Pending:     Contact, Resources, media, metrics, mobile nav
Dev server:  npm run dev → http://localhost:5173
Build:       npm run build
Changelog:   Always update after substantive changes
Commits:     Only when user explicitly asks
```

---

*Maintained for AI continuity. Update this file when architecture, sprint priorities, or Google Drive structure changes.*
