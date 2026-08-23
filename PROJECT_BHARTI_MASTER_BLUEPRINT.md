# Project Bharti — Master Technical / Content Blueprint

**Project:** Project Bharti  
**Blueprint generated:** 23 August 2026  
**Purpose:** Master technical/content map for future maintenance  
**Status:** Documentation only — no project files modified except this blueprint itself  

This document describes the **current repository state** as inspected in source. Verify the live files before changing anything; this blueprint will go stale after later implementation work.

---

## 1. Project structure

### 1.1 Stack

| Layer | Current implementation |
|---|---|
| UI | React (ESM, JSX) |
| Bundler | Vite 8 (`vite` / `vite build` / `vite preview`) |
| Routing | `react-router-dom` ^7.18.2, `BrowserRouter` |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` + `src/styles/global.css` |
| Motion | `framer-motion` (`MotionConfig reducedMotion="user"`) |
| Icons | `lucide-react` |
| Map | `react-simple-maps` + `src/assets/maps/india-states.geojson` |
| Hosting | Static Vercel (`vercel.json` rewrites + headers) |

There is **no application server, database, CMS, or env-backed content API**. Content is authored in `src/data/*.js` and imported at build time. `server/` is gitignored as a legacy leftover and must not be restored.

### 1.2 `package.json`

- **Name:** `iit-delhi-women-literacy-website` `0.1.0` `private` `type: module`
- **Scripts:** `dev` → `vite`; `build` → `vite build`; `preview` → `vite preview`
- **Runtime deps:** `react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`, `react-simple-maps`
- **Dev deps:** `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`
- **Overrides:** `d3-color`, `nanoid`, `postcss` (security/compat pins)
- Several packages are pinned as `"latest"` except Router / simple-maps / overrides.

### 1.3 Vite configuration (`vite.config.js`)

- Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`
- `build.sourcemap: false` (do not ship original source in `dist/`)
- No image pipeline, no `vite-imagetools`, no `sharp`
- Imported files under `src/assets/` become hashed `/assets/<name>-<hash>.<ext>` files
- Files under `public/` are copied to stable root-relative URLs

### 1.4 Entry points

1. `index.html` — HTML shell, SEO meta, favicon, intro `<video>` preload node, `/intro-preload.js`, `/src/main.jsx`
2. `src/main.jsx` — `bootstrapIntroVideoPreload()`, `MotionConfig`, `ErrorBoundary`, `BrowserRouter`, `Seo`, `App`
3. `src/App.jsx` — lazy page routes inside `MainLayout`

### 1.5 Important configuration files

| File | Role |
|---|---|
| `vite.config.js` | Build |
| `vercel.json` | SPA rewrite + immutable `/assets` cache + security headers |
| `index.html` | Document shell + intro preload |
| `public/manifest.webmanifest` | PWA/name/icons |
| `public/robots.txt` | Crawlers |
| `public/sitemap.xml` | Public URL list |
| `.gitignore` | Ignores `node_modules/`, `dist/`, `.env*`, `.vercel`, `server/`, `media-source/` |
| `.cursor/settings.json` | Editor/agent settings only |

**Environment:** no `.env` / `.env.example` in the repo. `siteSettings.baseUrl` is `''`; live canonical/OG URLs use `window.location.origin` in `Seo.jsx`.

### 1.6 Caching / security (`vercel.json`)

- `/assets/(.*)` → `Cache-Control: public, max-age=31536000, immutable` — **do not change casually**
- All other paths: CSP (self + Google Maps iframe + `mailto:`), HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, `X-Frame-Options: DENY`, COOP/CORP
- SPA rewrite: `/(.*)` → `/index.html`

### 1.7 Directory tree (authoritative application paths)

```text
Project-Bharti-Final/
  index.html
  package.json
  vite.config.js
  vercel.json
  src/
    main.jsx
    App.jsx
    styles/global.css
    layouts/MainLayout.jsx
    pages/          Home, About, Activities, Resources, ResourceGuide,
                    Stories, StoryDetail, Contact, NotFound
    components/     UI sections (see §14)
    data/           Authoritative content (see §10)
    assets/
      images/       about, activities, case-studies, hero, logos,
                    partners/gallery, partners/newspapers, states/*, team
      maps/india-states.geojson
    utils/          motion.js, safeUrl.js, introSplash.js
  public/
    favicon.svg
    manifest.webmanifest
    robots.txt
    sitemap.xml
    intro-preload.js
    case-studies/*.pdf
    videos/project-bharti-opening.mp4
    videos/project-bharti-opening-poster.jpg
    videos/testimonials/{31687,31688,31690,31691,31692}.{mp4,jpg}
```

Local-only / ignored: `node_modules/`, `dist/`, `media-source/`, `server/`, `.tmp-*` work folders.

---

## 2. Routing / all pages

Router: `BrowserRouter` + nested `Routes` in `src/App.jsx`. Every page is `React.lazy` + `Suspense` → `RouteLoadingState`. Layout: `MainLayout` for all routes.

| Route | Page | Purpose | Important children | Data | Nav entry | Hash / special |
|---|---|---|---|---|---|---|
| `/` | `pages/Home.jsx` | Public homepage | Hero, AboutPreview, ActivitiesPreview, StoriesFromTheField, VoicesFromTheField, Partners, ContactCTA | homepage.js, caseStudies, partnersMedia, stateImpact (via Hero/map) | Logo; footer Collaborate `#get-involved` | `#hero`, `#impact-snapshot`, `#about`, `#activities`, `#stories-from-the-field`, `#voices-from-the-field`, `#partners`, `#get-involved` |
| `/about` | `pages/About.jsx` | Institutional About | intro, ProjectLeadership, research/vision, Objectives, full InteractiveIndiaMap | homepage.js `aboutProjectContent` + `objectives`, team.js, stateImpact, stateMedia | Header/Footer About | `#about-project-bharti-intro-title`, `#project-leadership-title`, `#research-to-field-impact-title`, `#literacy-to-livelihood-title`, `#objectives-title`, `#india-map-title` |
| `/activities` | `pages/Activities.jsx` | Field programme narrative | SectionTitle, PersistentImageSlot, ActivitiesCTA | activities.js, siteImages.js | Header/Footer Activities | Multiple section ids (`#activities-overview`, `#inaugural-programme`, etc.) |
| `/resources` | `pages/Resources.jsx` → `ResourcesPage` | Resource library | ResourceCard, filters | resources.js, caseStudies, practicalGuides | Header/Footer Resources | `#case-studies`, `#other-documents` (homepage preview links) |
| `/resources/:slug` | `pages/ResourceGuide.jsx` | One practical guide | — | practicalGuides.js | From Resources list | 10 slugs (see §10) |
| `/stories` | `pages/Stories.jsx` | All field stories | Story cards | caseStudies + fieldStories | Footer Stories; Home Voices/Stories CTAs | Header has **no** Stories item |
| `/stories/:slug` | `pages/StoryDetail.jsx` | One case study | StoryImage | caseStudies | Story cards | Cover image `loading="eager"` |
| `/contact` | `pages/Contact.jsx` → `ContactPage` | Contact + collaboration | form, FAQ, map iframe | contact.js | Header Contact **and** Collaborate; Footer Contact | No hash required |
| `*` | `pages/NotFound.jsx` | 404 | — | — | — | Any unknown path |

**Redirects:** none in the router. Vercel rewrite only serves `index.html` so client routing works.

**Hash scrolling:** `MainLayout` `useEffect` on `pathname` + `hash` + `key`. Sanitizes via `sanitizeHashTargetId` (`SAFE_HASH_ID`). Retries `getElementById` up to 60 animation frames, then subtracts sticky header height. Empty hash → scroll to top.

**Absent routes (intentional):** `/collaborate`, `/map`, `/team`, `/partners`, `/admin`. Collaborate is not a separate page; it is `/contact` (header) or `/#get-involved` (footer).

**Layout exception:** `SessionIntroVideo` mounts only when `location.pathname === '/'`.

---

## 3. Global layout

Flow:

```text
main.jsx
  ErrorBoundary
    BrowserRouter
      Seo (head title/description)
      App
        MainLayout
          SessionIntroVideo (Home only)
          Navbar (sticky)
          <main>
            PageTransition → Outlet (page)
          </main>
          Footer
```

| Concern | Implementation |
|---|---|
| Shell | `.app-shell` flex column, `min-height: 100vh`; `main` flexes |
| Container | `.site-container` = `min(1120px, calc(100% - 2rem))`; mobile `@media (max-width: 760px)` tightens gutter |
| Section padding | `.section` = `clamp(4.5rem, 8vw, 7rem)`; mobile `3.75rem` |
| Header | `sticky top-0 z-50`, white/88 + blur, `min-h-20` |
| Scroll | `html { scroll-behavior: smooth; scroll-padding-top: 5.5rem }` |
| Reduced motion | global.css + Framer `MotionConfig` |
| Page transition | fade/slide on `location.pathname` only (not hash) |
| Primitives | `SectionTitle`, `FadeIn`, `EditableImageSlot`, `PersistentImageSlot`, `AccessibleModal`, `MediaLightbox` |

**Navbar (`Navbar.jsx` + `navigation.js`):** desktop pill nav hidden below `md`; hamburger + overlay for mobile. Hash items historically skipped `aria-current`; Contact and Collaborate now share `/contact`.

**Footer (`Footer.jsx` + `footer.js`):** dark `bg-slate-950`, 2-col grid, 6 links.

---

## 4. Navigation map

| Label | Source | Target | Destination | Desktop | Mobile | Footer |
|---|---|---|---|---|---|---|
| Project Bharti (logo) | Navbar hardcoded | `/` | Home top | yes | yes | no (wordmark only) |
| About | navigation.js / footer.js | `/about` | About page | yes | yes | yes |
| Activities | both | `/activities` | Activities page | yes | yes | yes |
| Resources | both | `/resources` | Resources page | yes | yes | yes |
| Contact | both | `/contact` | Contact page | yes | yes | yes |
| Collaborate | **header** `navigation.js` | **`/contact`** | Contact / collaboration page | yes | yes | **no — different** |
| Collaborate | **footer** `footer.js` | **`/#get-involved`** | Home ContactCTA | no | no | yes |
| Stories | footer.js only | `/stories` | Stories index | no | no | yes |

**Intentionally different Collaborate targets:** header/mobile → `/contact`; footer → Home `#get-involved`. Do not “fix” the footer unless explicitly asked.

**Not nav items:**

- **Community Outreach** — Home Partners chapter id `community-outreach` (data only; no DOM id, no header/footer link)
- **Explore Map** — compact-map CTA in `InteractiveIndiaMap.jsx` → `/about#india-map-title`
- Other internal anchors: `#about`, `#activities`, `#partners`, `#get-involved`, `#india-map-title`, `#project-leadership-title`, resource collection hashes

**Known implementation note:** `Navbar` keys links with `key={item.to}`. Contact and Collaborate both resolve to `/contact`, so they share a React key. Both still render as separate labels; both highlight as active on `/contact`.

---

## 5. Home page — complete blueprint

`src/pages/Home.jsx` order (current):

1. `Hero`
2. `AboutPreview`
3. `ActivitiesPreview`
4. `StoriesFromTheField`
5. `VoicesFromTheField`
6. `Partners` (gallery chapters including Media Coverage + Impact Highlights)
7. `ContactCTA`

**Not on Home:** `ResourcesPreview.jsx`, `ProjectReach.jsx`, `Objectives`, `ProjectLeadership`. Those files exist but are unused here (ResourcesPreview unused entirely; ProjectReach unused; Objectives/Leadership live on About).

### 5.1 Hero

| | |
|---|---|
| Component | `src/components/Hero.jsx` |
| Data | `heroContent` in `homepage.js`; metrics from `stateImpact.js` |
| Visual | Lazy `InteractiveIndiaMap variant="compact"`; faded `hero-artwork.webp` background (`fetchPriority="low"`, 1024×1536, opacity 0.34) |
| CTAs | About the Project → `/about`; View Resources → `/resources` |
| Metrics row | `#impact-snapshot` — project states, districts, women trained (`1000+` manual display) |
| Responsive | Stacked copy + map; `lg:` two columns; map `max-w-md` / `lg:max-w-[34rem]` |
| Intro | While `SessionIntroVideo` is active, heavy visuals defer (`ProjectReachFallback`) |

### 5.2 Compact India map (inside Hero)

See §7. CTA: **Explore Map** → `/about#india-map-title`.

### 5.3 About preview (“Research to Field Impact” teaser)

| | |
|---|---|
| Component | `AboutPreview.jsx` |
| Data | `aboutProjectContent.aboutIntro.focusAreas` (3 cards) + section description |
| CTA | Explore Project Bharti → `/about` |
| Layout | 1 / 2 / 3 columns (`sm` / `lg`) |

### 5.4 Activities preview

| | |
|---|---|
| Component | `ActivitiesPreview.jsx` |
| Data | `homepage.js` `activities` (3 cards: Field Workshops, Financial Clinics, Research Visits) |
| Surface | Dark `bg-slate-950` |
| CTA | Explore Activities → `/activities` |
| Layout | `md:grid-cols-3` |

### 5.5 Stories from the Field

| | |
|---|---|
| Component | `StoriesFromTheField.jsx` |
| Data | `getFeaturedCaseStudy()` + `getHomepageSupportingCaseStudies()` — **3 cards max** |
| Current selection | Featured: Manisha (`featured: true`). Supporting flags: Lalita Devi + one additional story with `homepageSupporting: true` |
| Images | Case-study covers, lazy + width/height from `caseStudyImageSizes.js` |
| CTA | Explore all stories → `/stories` |
| Layout | 1 / 2 / 3 cols; card `aspect-[4/5]` max-height 17.5rem |

### 5.6 Voices from the Field (videos)

| | |
|---|---|
| Component | `VoicesFromTheField.jsx` |
| Videos | 5 hardcoded testimonials (see §9) |
| Layout | Top row 3; bottom row 2 (`lg:col-span-2` centered) |
| CTA | Explore Stories from the Field → `/stories` |
| Play | Modal `<video controls>` — no autoplay |

### 5.7 Partners / gallery (includes Community Outreach, Media, Impact)

| | |
|---|---|
| Component | `Partners.jsx` + `partnersMedia.js` |
| Section id | `#partners` |
| Eyebrow | Project Documentation |
| Heading | From research to field practice. |

Chapters in order:

| Chapter id | Title | Items | Layout |
|---|---|---|---|
| `institutional-leadership` | Institutional Leadership | 1 photo (`campus-programme-gathering.jpg`) | Single, `max-w-3xl`, 16/10 |
| `field-workshops` | Field Workshops | 4 photos | 2×2 collage |
| `community-outreach` | Community Outreach | 4 photos | 2×2 collage |
| `media-coverage` | Media Coverage | 7 press PNGs | Press mosaic |
| `impact-highlights` | Impact Highlights | 2 photos | Equal pair 4/3 |

Lightbox: `MediaLightbox` over **all** chapter items. Tiles: `loading="lazy"` `decoding="async"`. Only `community-product-showcase` has `srcSet` (800w + 1600w).

**Field Workshops assets:** handbook-release.webp, product-showcase.webp(+800), haryana `community-mobilization.png`, field-welcome-handover.webp.

**Community Outreach assets:** field-visit-team.webp, community-market-showcase.jpg, community-digital-literacy-session.webp, community-standee-discussion.webp.

### 5.8 Contact / Collaborate CTA

| | |
|---|---|
| Component | `ContactCTA.jsx` |
| DOM id | `#get-involved` |
| Data | `contactCtaContent`, `contactChannels` |
| Channels | Academic collaboration, Field partnerships, Resource development, Student engagement — each links to `/contact` |
| Footer Collaborate | lands here |

---

## 6. About page — complete blueprint

`src/pages/About.jsx` order:

1. **Intro** — “About Project Bharti”, What is…, 3 focus cards, 4-step approach, highlight pills  
2. **Project Leadership** — `ProjectLeadership`  
3. **Research to Field Impact** — two institution cards (Research & Evidence / Implementation & Impact)  
4. **From literacy to livelihood practice** — dark band, vision/mission, highlight chips  
5. **Objectives** — `Objectives.jsx` (6 objective cards + impact counters)  
6. **Geographic Coverage** — full `InteractiveIndiaMap` (default `variant="full"`)

### 6.1 Team — hierarchy and data

```text
ProjectLeadership
  LeadershipCategory          // faculty, white page
  DarkCategory                // slate-950 panel for development-team
    heading: Research & Implementation Team
    DevelopmentTeamGroups
      Doctoral Scholars (3)
      Research Associates (4)
    PersistentImageSlot ownerId="dev-team-group"
```

**Data:** `src/data/team.js` → `getTeamDirectory()`.

| Group | Members | Designation | Photo file |
|---|---|---|---|
| Faculty | Prof. Seema Sharma | Project Lead | `team/prof-seema-sharma.png` |
| Faculty | Prof. Gourav Dwivedi | Co-Project Lead | `team/prof-gourav-dwivedi.png` |
| Doctoral Scholars | Purari Kumar, Apoorva, Udit Maheshwari | Doctoral Scholar | `purari-kumar.png`, `apporva.png`, `udit-maheshwari.png` |
| Research Associates | Shashank Kumar, Pranjali Soni, Harshi Gupta, Shalini Shukla | Research Associate | `shashank-kumar.png`, `pranjali-soni.webp`, `harshi-gupta.png`, **`akriti-chandra.png` (assigned to Shalini)** |

**Akriti Chandra** is not in `memberIds` and has no member card. Do not “fix” Shalini’s photo without an explicit request.

**Order inside dark panel (current):**

1. Research & Implementation Team heading  
2. Doctoral Scholars  
3. Research Associates  
4. MOU / group photograph (`dev-team-group` → `about/iit-delhi-project-bharti-group.jpg`)

**Grids:** faculty `max-w-4xl md:grid-cols-2`; scholars `sm:2 lg:3`; associates `sm:2 lg:4`. Faculty cards large white; scholar/associate cards white on dark panel, `text-red-800` designations, square compact photos `max-w-[11rem]`. Group titles `text-red-200` uppercase.

---

## 7. Interactive India Map — deep audit

**UI:** `src/components/InteractiveIndiaMap.jsx`  
**Geometry:** `src/assets/maps/india-states.geojson` (fetched at runtime via `?url`, cached in module scope)  
**Coverage data:** `src/data/stateImpact.js`  
**State media:** `src/data/stateMedia.js` + `stateMedia/{delhi,haryana,himachalPradesh,uttarakhand,uttarPradesh}.js`  
**Styling:** Tailwind in the component + `.interactive-india-map` focus rules in `global.css`

### 7.1 Layer split (DATA vs UI vs GEOMETRY vs STYLING)

| Layer | Files | Responsibility |
|---|---|---|
| DATA | `stateImpact.js` | States, colours, `mapName`, overview, districts, places, womenTrained, derived totals |
| DATA | `stateMedia/*.js` | Gallery/activity images per state (not pulled by Home stats) |
| GEOMETRY | `india-states.geojson` | State polygon shapes; matched by `mapName` |
| UI | `InteractiveIndiaMap.jsx` | Canvas, click, panel, compact vs full |
| STYLING | classNames + global.css | Fills, borders, compact red frame, About card chrome |

### 7.2 Home compact (`variant="compact"`)

Used only from `Hero.jsx`.

- India outline; Project Bharti states coloured; others muted “future expansion”
- Frame: `rounded-[1.35rem] border border-red-900/50 ring-1 ring-red-900/20` (strengthened accent border)
- Colour chips + “Select a highlighted state to explore field activity”
- Click state → portal `StatePanel` (same panel as About)
- CTA **Explore Map** → `/about#india-map-title`
- Does **not** show Geographic Coverage heading, state overview cards, or “Interactive Engine”

### 7.3 About full (default `variant="full"`)

- Section `#india-map-title`, eyebrow **Geographic Coverage**, heading **Interactive map of project implementation.**
- Left: clickable state overview cards
- Right: large map in `rounded-[2rem] border-slate-200` card + legend (Project Bharti states / Future expansion)
- **No** “Interactive Engine” badge (removed; leftover `relative` on the card also removed)
- Same `StatePanel` portal as compact

### 7.4 State → district → place → media

1. Click geography or About state card → `handleStateSelect(mapName)`  
2. Lookup `projectBhartiStateByMapName[mapName]`  
3. Open `StatePanel` with metrics (districts, women trained), district list, nested places, timeline, implementation snapshot  
4. Media tabs from `getStateMediaGroups(state.id)`: Gallery, Activities, Videos, Research, News  
5. Gallery/activity images open `MediaLightbox`

**State colours (authoritative):**

| State | `mapName` | Colour | Status |
|---|---|---|---|
| Delhi | Delhi | `#dc2626` | Active |
| Haryana | Haryana | `#16a34a` | Pilot |
| Himachal Pradesh | Himachal Pradesh | `#9333ea` | Planned |
| Uttarakhand | Uttarakhand | `#ea580c` | Active |
| Uttar Pradesh | Uttar Pradesh | `#2563eb` | Coming Soon |

**Totals:** 5 states, 12 districts, 13 places. Computed women trained ≈ 851; **headline UI is manual `1000+`** via `womenTrainedDisplay.mode = 'manual'`.

**Do not** invent extra states, rename `mapName` without GeoJSON alignment, or author district/state totals separately (they are derived from places).

---

## 8. Media / image system

### 8.1 Two serving models

| Kind | How | Cache | Examples |
|---|---|---|---|
| Imported | `import x from '...png'` → hashed `/assets/*` | immutable 1y | Almost all photos |
| Public | `/path` from `public/` | normal page cache | PDFs, videos, posters, favicon |

### 8.2 Actively used groups

**Home gallery (Partners)** — see §5.7. Four former PNGs are now WebP at original pixels: `field-welcome-handover.webp`, `programme-handbook-release.webp`, `community-digital-literacy-session.webp`, `community-standee-discussion.webp`.

**Press (7 PNGs)** — `partners/newspapers/*` (Times of India, ET Government, Tribune, Nation Press, Women Entrepreneurs Review, Amar Ujala, Narsan). Keep lossless if recompressing; text must stay sharp.

**Team** — 9 imported portraits (see §6). Unused on disk: `shalini-shukla.png`, `purari-sharma.png` (not imported).

**About group** — `about/iit-delhi-project-bharti-group.jpg` via `siteImages['dev-team-group']`.

**Activities** — `siteImages.js` keys `activity-card-*` → `src/assets/images/activities/*`.

**Case studies** — covers/details under `src/assets/images/case-studies/`; CLS sizes in `caseStudyImageSizes.js`.

**State media** — `src/assets/images/states/{delhi,haryana,himachal-pradesh,uttarakhand,uttar-pradesh}/` mixed webp/png. Loaded only when map chunk + panel request them.

**Hero** — `hero-artwork.webp` used. `import.meta.glob` eager-imports all `hero/*` so `inaugural-event.png` and duplicate faculty PNGs ship in `dist` but are not shown.

**Logos** — `src/assets/images/logos/` not imported by current UI.

**Unused gallery files** (on disk, not imported, do not ship): e.g. `collaboration-signing.jpg`, `official-interaction.jpg`, `mountain-handbook-group-a.png`, `field-training-workshop.png`, and several other leftover Partners photos.

### 8.3 Loading conventions

| Surface | loading | width/height | srcSet |
|---|---|---|---|
| Hero background | eager (default) + `fetchPriority="low"` | 1024×1536 | no |
| Partners tiles | lazy + async | no (aspect-ratio frames) | one image only |
| Team / PersistentImageSlot | lazy + async | no (aspect boxes) | no |
| Stories / Resources thumbs | lazy + async | yes (`caseStudyImageSizes`) | no |
| Story detail cover | **eager** | yes | no |
| Voice posters | lazy + 1280×720 | yes | no |
| Lightbox | none set | uses item src/srcSet | inherits |

**CLS:** preserve `caseStudyImageSizes.js` and existing aspect-ratio wrappers. Do not strip width/height from story/resource images.

**Lightbox:** `MediaLightbox.jsx` — `max-w-6xl`, object-contain, keyboard arrows.

---

## 9. Video system

### 9.1 Intro (Home only)

| | |
|---|---|
| Files | `/videos/project-bharti-opening.mp4`, `/videos/project-bharti-opening-poster.jpg` |
| Preload | Hidden `<video id="project-bharti-intro-preload">` in `index.html` + `public/intro-preload.js` + `bootstrapIntroVideoPreload()` |
| Component | `SessionIntroVideo.jsx` + `utils/introSplash.js` |
| Session | `sessionStorage` key `project-bharti-opening-intro-played` |
| Skip | `prefers-reduced-motion` or Save-Data |
| Autoplay | Intro overlay (muted / playsinline pattern in intro utilities) |

### 9.2 Testimonials (Home Voices)

Hardcoded in `VoicesFromTheField.jsx` (not a data file):

| id | src | poster |
|---|---|---|
| 31687 | `/videos/testimonials/31687.mp4` | `31687.jpg` |
| 31688 | same pattern | |
| 31690 | | |
| 31691 | | |
| 31692 | | |

- Grid posters: lazy, 1280×720  
- Modal: `controls`, `playsInline`, `preload="auto"`, **no autoplay**  
- CTA after videos → `/stories`

### 9.3 Adding a testimonial correctly

1. Add `/public/videos/testimonials/<id>.mp4` and matching `.jpg` poster  
2. Append an object to `testimonialVideos` in `VoicesFromTheField.jsx`  
3. Do not put videos in `src/assets` (they would be hashed and break stable URLs)  
4. Keep id/poster pairing 1:1  

State-panel `videos` groups exist in the media schema but are typically empty URL lists unless authored in `stateMedia/*.js`.

---

## 10. Data architecture

| Data file | Exports | Consumers | Purpose |
|---|---|---|---|
| `navigation.js` | `navItems` | Navbar | Header/mobile |
| `footer.js` | `footerLinks` | Footer | Footer only |
| `settings.js` | `siteSettings`, `getCopyrightLine` | Footer, Seo | Site name/tagline |
| `homepage.js` | hero, about, objectives, activities preview, resources teaser, contact CTA | Hero, About, AboutPreview, ActivitiesPreview, Objectives, ContactCTA, ResourcesPreview | Most marketing copy |
| `stateImpact.js` | states, totals, formatters | homepage.js, InteractiveIndiaMap, Hero metrics | **SSOT geography** |
| `stateMedia.js` + `stateMedia/*` | media groups | InteractiveIndiaMap only | Map panel media |
| `partnersMedia.js` | chapters + flat items | Partners | Home gallery |
| `team.js` | `getTeamDirectory` | ProjectLeadership | Team |
| `siteImages.js` | `getSiteImage` | PersistentImageSlot, Activities | Static slot map |
| `caseStudies.js` | `caseStudies`, getters | Stories, StoryDetail, resources, StoriesFromTheField | Official PDF-backed stories |
| `fieldStories.js` | `additionalCaseStudies` | spread into `caseStudies` | Extra stories |
| `caseStudyImageSizes.js` | size + object-position | Stories, Resources, StoryDetail | CLS + crop focal points |
| `resources.js` | collections, library | ResourcesPage | Library assembly |
| `practicalGuides.js` | 10 guides | ResourceGuide, resources.js | Practical guides |
| `activities.js` | `activitiesPageContent` | Activities, ActivitiesCTA | Activities page |
| `contact.js` | cards, FAQ, highlights | ContactPage | Contact |
| `heroDocuments.js` | null PDF slots | **unused by current Hero UI** | Reserved pillar PDFs |

**Important couplings**

- `homepage.js` **imports** `stateImpact.js` for live counts — do not duplicate totals in homepage.  
- `resources.js` **imports** `caseStudies` + `practicalGuides`.  
- `stateImpact` must stay independent of `stateMedia` so Home stats stay light.  
- Case-study text must stay PDF-faithful (`caseStudies.js` / `fieldStories.js` comments).

**Hardcoded (not data files):** Voices video list; Navbar logo `to="/"`; Explore Map path; some About headings.

### 10.1 Practical guide slugs

`financial-basics`, `product-costing`, `cash-flow`, `record-keeping`, `responsible-borrowing`, `digital-payments-safety`, `udyam-registration`, `pm-vishwakarma`, `pmjdy`, `micro-enterprise-support`.

### 10.2 Case-study slugs (public PDFs)

From data: `lalita-devi`, `manisha`, `pooja`, `suman`, plus additional: `beena`, `poonam`, `bimla`, `deepika`, `shilpa`, `happy`, `suman-hamirpur`.  
`public/case-studies/shabnam.pdf` exists but is **not** wired in `caseStudies.js`.

---

## 11. Design system (from code, not invented)

| Token | Actual values |
|---|---|
| Brand red | `#7f1d1d` (theme-color, btn-primary, nav active), `#991b1b` (eyebrows), Tailwind `red-800` / `red-900` |
| Text | body `#1f2937`; headings `#020617` / `slate-950`; muted `slate-600` |
| Surfaces | white, `#fbfaf8` hero, `#f7f4ef` / `#f8f4ee` stories/voices, `slate-950` dark bands |
| Borders | `slate-200`, `red-100`, `red-900/50` on compact map |
| Radii | pills `999px`; cards `1.5rem`–`2rem`; map compact `1.35rem` |
| Type | Inter / system-ui; headings `clamp(2rem, 4vw, 3.35rem)` weight 650 |
| Eyebrow | `.section-eyebrow` uppercase, tracking, red |
| Buttons | `.btn-primary` maroon pill + shadow; `.btn-secondary` / `.link-pill` white + slate border |
| Hover | cards `-translate-y` + `border-red-100`; buttons lift 2px |
| Motion | ~280–350ms ease; `viewportOnce` / `whileInView` |
| Container | 1120px max |
| Breakpoints used | `sm` 640, `md` 768, custom 760px in CSS, `lg` 1024, `xl` 1280 |

Dark sections invert heading/description/eyebrow colours via `.bg-slate-950` / `.bg-red-900` rules.

---

## 12. Responsive behaviour

| Surface | Mobile | Tablet | Desktop |
|---|---|---|---|
| Nav | hamburger | hamburger until `md` | pill bar |
| Hero | stacked; map full width max-w-md | same | 2-col copy + map |
| Compact map | helper/CTA centered | — | right-aligned chips/CTA |
| About focus cards | 1 col | 2 | 3 |
| Faculty | 1 col | 2 | 2 |
| Scholars / Associates | 1 → 2 → 3/4 | | |
| Partners collage | 1 col | 2 | 12-col collage |
| Voices | 1 col | 2 | 3 + 2 centered |
| Stories Home | 1 | 2 | 3 |
| Full map | stacked title/cards + map | — | 2-col `0.92fr / 1.08fr` |
| State panel | full-screen portal | | |

**Especially important:** compact vs full map; Partners collage (`QUAD_COLLAGE_*`); Voices 3+2; team group grids keyed to member count ≥ 4.

---

## 13. Performance

### Current implementation

- Route-level `React.lazy` for every page  
- `InteractiveIndiaMap` lazy on Home **and** About  
- GeoJSON fetched on demand, module-cached  
- `stateMedia` is **not** imported by `stateImpact` / Home stats  
- Intro video preloaded; other videos click-to-play  
- Most images `loading="lazy"`  
- Four Home workshop/outreach photos converted to WebP (~3.05 MB saved vs old PNGs)  
- 34 existing WebP field photos already small  
- Vite hashed assets + immutable cache  
- No source maps in production  

### Known possible future optimizations (not done)

- Remaining photographic PNGs (state panels, some team portraits, press lossless crush)  
- More `srcSet` beyond product-showcase  
- `Navbar` duplicate `key={item.to}`  
- Unused hero glob extras still emit to `dist`  
- Heavy press PNGs on Home scroll  
- Hash-scroll can land mid-Partners if images have not finished laying out (footer Collaborate still works because it sits next to `#get-involved`)

Do **not** add `sharp` / `vite-imagetools` unless a later brief explicitly requires a pipeline.

---

## 14. Component dependency map

| Component | Imports / data | Children | Pages | Variants / props |
|---|---|---|---|---|
| `MainLayout` | Footer, Navbar, PageTransition, SessionIntroVideo, safeUrl | Outlet | all | Home-only intro |
| `Navbar` | `navItems` | NavLink list | all | desktop + mobile |
| `Hero` | homepage, introSplash, lazy map | compact map, stats | Home | defers during intro |
| `InteractiveIndiaMap` | stateImpact, stateMedia, geojson | StatePanel, MediaLightbox, EditableImageSlot | Home (compact), About (full) | `variant="compact"\|"full"` |
| `ProjectLeadership` | team.js, PersistentImageSlot | LeadershipCategory, DarkCategory | About | — |
| `Partners` | partnersMedia | MediaTile, MediaLightbox | Home | chapter layouts |
| `StoriesFromTheField` | caseStudies getters | StoryCard | Home | 3 cards |
| `VoicesFromTheField` | hardcoded videos | VoiceCard, AccessibleModal | Home | — |
| `ContactCTA` | homepage contact CTA | SectionTitle | Home | `#get-involved` |
| `EditableImageSlot` | — | img or empty | team, map, activities | lazy |
| `PersistentImageSlot` | siteImages | EditableImageSlot | About team, Activities | `ownerId` |
| `Objectives` | homepage objectives + highlights | — | About | — |
| `ResourcesPage` | resources.js | ResourceCard | /resources | filters |
| `ContactPage` | contact.js | form, iframe | /contact | mailto submit |

`ProjectReach.jsx` and `ResourcesPreview.jsx` are **orphans** (not imported by pages).

---

## 15. Critical business / content logic

**CRITICAL — DO NOT CHANGE CASUALLY**

1. `stateImpact.js` hierarchy: State → District → Place → womenTrained; derived totals only  
2. `mapName` must match GeoJSON names  
3. Manual `1000+` women-trained display policy  
4. Home gallery chapter order and counts (1 / 4 / 4 / 7 / 2)  
5. Team order, groups, designations, Shalini photo assignment, no Akriti card  
6. Dark-panel order: heading → scholars → associates → group photo  
7. Header Collaborate = `/contact`; footer Collaborate = `/#get-involved`  
8. Compact vs full map behaviour and Explore Map → `/about#india-map-title`  
9. Case-study text/PDF pairing; do not invent story facts  
10. Testimonial IDs 31687–31692 and poster pairing  
11. Immutable `/assets` cache  
12. `siteImages` `ownerId` keys (especially `dev-team-group`)  
13. CSP / Maps iframe allowlist  

---

## 16. Current known constraints

- Static site only — no backend restore  
- Do not add image-processing build dependencies without a new brief  
- Do not rename hashed-import files casually (imports + sometimes captions/alts)  
- Public PDF/video URLs are stable; keep `/case-studies/` and `/videos/` paths  
- Do not crop team portraits or change intrinsic sizes used for CLS  
- Do not merge Doctoral Scholar and Research Associate grids  
- Do not put “Interactive Engine” back  
- GeoJSON is large (~3.2 MB in dist) but required for the map  
- `media-source/` is local masters, not deploy  
- No `.env` secrets in this frontend  

---

## 17. Professor-requested changes — verified current status

Checked against **current source**, not conversation memory.

| Request | Status | Evidence |
|---|---|---|
| About team group photo **below** scholar/associate cards | **Done** | `ProjectLeadership.jsx` DarkCategory: groups first, then `PersistentImageSlot` |
| Keep faculty cards, heading, separate groups, no merge | **Done** | `LeadershipCategory` + `memberGroups` |
| Remove Akriti Chandra from Doctoral Scholars | **Done** | not in `memberIds` |
| Research Associate designations (not Project Employee) | **Done** | all four RAs in `team.js` |
| Shalini photo left as existing assignment | **Done** | `akriti-chandra.png` |
| Remove “Interactive Engine” | **Done** | string absent from `src/` |
| Home compact map red border | **Done** | `border-red-900/50` + `ring-red-900/20` on compact frame only |
| Header Collaborate → Contact page | **Done** | `navigation.js` `to: '/contact'` |
| Footer Collaborate unchanged | **Done** | `footer.js` still `/#get-involved` |
| Community Outreach chapter unchanged | **Done** | still a Partners chapter, not a nav item |
| Convert 4 Home gallery PNGs to WebP | **Done** | `partnersMedia.js` imports `.webp`; PNGs gone |
| Do not add image pipeline | **Done** | no sharp / imagetools in `package.json` |

---

## 18. Final master map

### User journeys

| User action | Route | Page | Section | Component | Data | Assets |
|---|---|---|---|---|---|---|
| Open site | `/` | Home | Hero | Hero + compact map | homepage, stateImpact | hero-artwork, GeoJSON |
| Read about | `/about` | About | intro → team → objectives → map | About + ProjectLeadership + Objectives + full map | homepage, team, stateImpact | team photos, group jpg |
| Click Collaborate (header) | `/contact` | Contact | page | ContactPage | contact.js | none |
| Click Collaborate (footer) | `/#get-involved` | Home | CTA | ContactCTA | homepage | none |
| Explore Map | `/about#india-map-title` | About | Geographic Coverage | full InteractiveIndiaMap | stateImpact, stateMedia | state photos |
| Open a state | portal | overlay | StatePanel | InteractiveIndiaMap | stateImpact + stateMedia | state gallery |
| Browse stories | `/stories` | Stories | grid | Stories.jsx | caseStudies | covers |
| Open a story | `/stories/:slug` | StoryDetail | article | StoryDetail | caseStudies | cover + optional detail |
| Open resources | `/resources` | Resources | library | ResourcesPage | resources, guides | thumbs / icons |
| Open a guide | `/resources/:slug` | ResourceGuide | article | ResourceGuide | practicalGuides | none |
| Play a voice | `/` modal | Home | Voices | VoicesFromTheField | hardcoded | public mp4/jpg |
| View Home gallery | `/` | Home | Partners | Partners | partnersMedia | gallery + press |

### A. Pages

Home, About, Activities, Resources, ResourceGuide, Stories, StoryDetail, Contact, NotFound.

### B. Routes

`/`, `/about`, `/activities`, `/resources`, `/resources/:slug`, `/stories`, `/stories/:slug`, `/contact`, `*`.

### C. Major components

MainLayout, Navbar, Footer, Hero, InteractiveIndiaMap, AboutPreview, ActivitiesPreview, StoriesFromTheField, VoicesFromTheField, Partners, ContactCTA, ProjectLeadership, Objectives, ResourcesPage, ContactPage, EditableImageSlot, PersistentImageSlot, MediaLightbox, SessionIntroVideo, Seo.

### D. Data files

Listed in §10.

### E. Important assets

GeoJSON; hero-artwork; four Home WebP field photos; campus gathering; press cuttings; team portraits; About group photo; case-study covers; public PDFs; intro + five testimonials.

### F. Critical logic

§15.

### G. Performance-sensitive areas

Home Partners gallery, press PNGs, full map + state media, GeoJSON, intro video, About team PNGs, case-study JPEGs.

### H. Safe-to-edit areas (still verify)

Copy in `homepage.js` / `contact.js` / `activities.js` that is not tied to counts; practical guide body text; SEO strings; unused orphan components if cleaning is requested.

### I. High-risk areas

`stateImpact.js`, GeoJSON matching, `navigation.js` vs `footer.js`, `team.js` photo map, Partners chapter structure, `vercel.json` headers, CSP, `caseStudies.js` facts, video public paths.

### J. Known TODOs / unresolved issues

- Header Contact and Collaborate share `/contact` and `NavLink` keys  
- Footer Collaborate still hash-scrolls Home (intentional)  
- Hash scroll from top of Home can visually stop in Partners/Community Outreach if images expand after scroll  
- `ResourcesPreview` and `ProjectReach` unused  
- `heroDocuments.js` unused (all null)  
- `siteImages` collage keys still `null`  
- `shabnam.pdf` unwired  
- Unused on-disk gallery/team files  
- Phone placeholder `+91 XXXXX XXXXX` in contact.js  
- Research collaboration email “to be confirmed”  
- Women-trained headline still manual `1000+` vs computed ~851  
- Some state statuses (Planned / Coming Soon) vs live field photos  

---

Before making future changes, consult this blueprint and verify the current source code because the blueprint can become stale after implementation changes.
