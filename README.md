# Project Bharti v1.0

Production website and admin-managed content platform for Project Bharti, an IIT Delhi initiative focused on digital and financial literacy in the context of women’s entrepreneurship.

The application combines a polished public website with a secure admin dashboard for managing team members, resources, media assets, state-wise impact content, and editable project photographs/documents.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Deployment Guide](#deployment-guide)
- [API Overview](#api-overview)
- [Database Schema Summary](#database-schema-summary)
- [Cloudinary Integration](#cloudinary-integration)
- [Security Features](#security-features)
- [Performance Optimizations](#performance-optimizations)
- [Future Roadmap](#future-roadmap)

## Architecture Overview

Project Bharti is split into a Vite-powered React frontend and an Express API backend.

```text
Vercel
└── React + Vite public website
    ├── Public pages
    ├── Admin login UI
    ├── Editable media/resource/team controls
    └── API client with cookie-based auth

Render
└── Express API
    ├── JWT authentication via HTTP-only cookies
    ├── SQLite database
    ├── Cloudinary media storage
    ├── Resource/team/media CRUD routes
    └── Validation, CORS, rate limiting, and security middleware

Cloudinary
└── Persistent image/document/video storage
```

The frontend reads public data from the backend and renders active content dynamically. Admin-only controls become available after login. Media uploads go through the backend, are stored in Cloudinary when configured, and are referenced from SQLite.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- React Simple Maps
- Local GeoJSON map asset

### Backend

- Node.js
- Express.js
- SQLite via `node:sqlite`
- JWT authentication
- HTTP-only cookies
- Multer uploads
- Cloudinary SDK
- Helmet
- CORS
- Express Rate Limit
- bcryptjs

### Hosting

- Frontend: Vercel
- Backend: Render
- Media: Cloudinary
- Database: SQLite database file on Render persistent storage

## Features

### Public Website

- Responsive landing page
- One-session fullscreen intro video experience
- Hero section with IIT Delhi and EXL branding
- About/impact sections
- Project objectives and metrics
- Interactive India map using local GeoJSON
- State-wise district impact details
- Activities page
- Resources page
- Contact page
- SEO metadata handling
- Error boundary and route loading states

### Admin Dashboard / CMS

- Admin login via secure cookie session
- Editable persistent site images
- Editable project documents
- Resource management
  - Create
  - Edit
  - Delete
  - Duplicate
  - Reorder
  - Attach thumbnails
  - Attach PDFs
  - Attach videos
- Generic team management
  - Categories
  - Members
  - Designations
  - Display order
  - Active/inactive status
  - Profile photos
- Cloudinary-backed upload, replace, and delete lifecycle

### Team Management

Team data is database-driven and category-based. This supports categories such as:

- Project Leadership
- Development Team
- Research Associates
- Project Associates
- Designers
- Volunteers
- Mentors
- Advisory Board

New categories can be created through the admin system without frontend or backend schema changes.

## Folder Structure

```text
.
├── dist/                         # Production frontend build output
├── public/                       # Static public files
├── scripts/                      # Development helper scripts
├── server/                       # Express backend
│   ├── config/                   # Environment, SQLite, Cloudinary config
│   ├── controllers/              # Request handlers
│   ├── database/                 # Schema, migration, seed logic
│   ├── middleware/               # Auth, security, upload, error handling
│   ├── models/                   # SQLite model/query layer
│   ├── routes/                   # API route registration
│   ├── services/                 # Business logic and integrations
│   └── utils/                    # Shared backend utilities
├── src/                          # React frontend
│   ├── assets/                   # Local images, logos, video, map data
│   ├── components/               # Reusable UI components
│   ├── context/                  # Auth context
│   ├── data/                     # Static frontend content/config
│   ├── hooks/                    # Resource/team/document hooks
│   ├── layouts/                  # Main layout shell
│   ├── pages/                    # Route-level page components
│   ├── styles/                   # Global styles
│   └── utils/                    # API/media helper utilities
├── package.json                  # Frontend scripts/dependencies
├── vite.config.js                # Vite config and local API proxy
└── vercel.json                   # Vercel SPA rewrite config
```

## Installation Guide

### Prerequisites

- Node.js with `node:sqlite` support
- npm
- Cloudinary account for production media storage

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Project-Bharti-Final
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
npm --prefix server install
```

### 4. Configure Backend Environment

Create a backend environment file:

```bash
cp server/.env.example server/.env
```

Update the values for local or production use.

### 5. Run Migrations

```bash
npm --prefix server run migrate
```

### 6. Seed Initial Data

```bash
npm --prefix server run seed
```

### 7. Start Development

Run frontend and backend together:

```bash
npm run dev
```

Or run separately:

```bash
npm run dev:frontend
npm run server
```

## Environment Variables

Backend variables are configured in `server/.env`.

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Backend port. Defaults to `4000`. |
| `NODE_ENV` | Production | Set to `production` on Render. |
| `CORS_ORIGIN` | Production | Exact allowed frontend origin. |
| `PRODUCTION_FRONTEND_URL` | Production | Production Vercel frontend URL. |
| `ADMIN_USERNAME` | Production | Initial admin username. Required in production. |
| `ADMIN_PASSWORD` | Production | Initial admin password. Required in production. |
| `JWT_SECRET` | Yes | Long random secret used to sign JWT sessions. |
| `JWT_EXPIRES_IN` | No | JWT expiry duration. Defaults to `7d`. |
| `DB_FILE` | Production recommended | SQLite file path. Should point to Render persistent storage. |
| `UPLOADS_ROOT` | Optional | Local upload fallback directory. |
| `JSON_BODY_LIMIT` | Optional | Express JSON body size limit. |
| `CLOUDINARY_CLOUD_NAME` | Production | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Production | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Production | Cloudinary API secret. |

Frontend variables are configured in Vercel or local `.env` files.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Production recommended | Backend API base URL, e.g. `https://project-bharti-api.onrender.com/api`. |
| `VITE_API_PROXY_TARGET` | Local only | Local backend proxy target for Vite dev server. Defaults to `http://localhost:4000`. |

## Development Workflow

### Frontend Build

```bash
npm run build
```

### Frontend Preview

```bash
npm run preview
```

### Backend Development

```bash
npm --prefix server run dev
```

### Backend Production Start

```bash
npm --prefix server start
```

### Database Migration

```bash
npm --prefix server run migrate
```

### Database Seed

```bash
npm --prefix server run seed
```

## Deployment Guide

### Render Backend

Recommended Render settings:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
Environment: Node
```

Configure required environment variables:

```text
NODE_ENV=production
PORT=<provided-by-render>
PRODUCTION_FRONTEND_URL=https://<your-vercel-domain>
CORS_ORIGIN=https://<your-vercel-domain>
ADMIN_USERNAME=<secure-admin-username>
ADMIN_PASSWORD=<secure-admin-password>
JWT_SECRET=<long-random-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
DB_FILE=<persistent-disk-path>/bharti.sqlite
```

Important:

- Use Render persistent storage for SQLite.
- Ensure `DB_FILE` points to the persistent disk path.
- The backend will fail startup in production if required auth/CORS values are missing.
- Migrations run during server startup through the seed/migration flow.

### Vercel Frontend

Recommended Vercel settings:

```text
Build Command: npm run build
Output Directory: dist
Framework Preset: Vite
```

Configure frontend environment:

```text
VITE_API_BASE_URL=https://<your-render-backend>/api
```

The project includes `vercel.json` with SPA rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## API Overview

All API routes are mounted under `/api`.

### Health

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Backend health check |

### Authentication

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Public | Login and set HTTP-only session cookie |
| `POST` | `/api/auth/logout` | Public | Clear session cookie |
| `GET` | `/api/auth/me` | Optional | Return current admin session, if present |

Authentication is cookie-based. The login response does not expose the JWT in JSON.

### Sections

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/sections` | Public | List resource sections |

### Resources

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/resources` | Public | List resources |
| `GET` | `/api/resources/:id` | Public | Get one resource |
| `POST` | `/api/resources` | Admin | Create resource |
| `PUT/PATCH` | `/api/resources/:id` | Admin | Update resource |
| `DELETE` | `/api/resources/:id` | Admin | Delete resource |
| `POST` | `/api/resources/reorder` | Admin | Reorder resources |
| `POST` | `/api/resources/:id/duplicate` | Admin | Duplicate resource |
| `POST` | `/api/resources/:id/thumbnail` | Admin | Upload/replace thumbnail |
| `DELETE` | `/api/resources/:id/thumbnail` | Admin | Remove thumbnail |
| `POST` | `/api/resources/:id/document` | Admin | Upload/replace PDF/document |
| `DELETE` | `/api/resources/:id/document` | Admin | Remove document |
| `POST` | `/api/resources/:id/video` | Admin | Upload/replace video |
| `DELETE` | `/api/resources/:id/video` | Admin | Remove video |

### Media

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/media` | Public | List media by owner type, optionally batched by owner IDs |
| `GET` | `/api/media/:ownerType/:ownerId/:assetType` | Public | Get one media asset |
| `POST` | `/api/media/:ownerType/:ownerId/:assetType` | Admin | Upload/replace media asset |
| `DELETE` | `/api/media/:ownerType/:ownerId/:assetType` | Admin | Delete media asset |

### Team

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/team` | Public / Admin-aware | List active team directory; admins can include inactive items |
| `POST` | `/api/team/categories` | Admin | Create team category |
| `PUT/PATCH` | `/api/team/categories/:id` | Admin | Update team category |
| `DELETE` | `/api/team/categories/:id` | Admin | Delete team category |
| `POST` | `/api/team/members` | Admin | Create team member |
| `PUT/PATCH` | `/api/team/members/:id` | Admin | Update team member |
| `DELETE` | `/api/team/members/:id` | Admin | Delete team member |
| `POST` | `/api/team/members/:id/photo` | Admin | Upload/replace member photo |
| `DELETE` | `/api/team/members/:id/photo` | Admin | Remove member photo |

## Database Schema Summary

SQLite is used as the production database. The schema is defined in `server/database/schema.sql`.

### `sections`

Stores resource section metadata.

- `id`
- `title`
- `description`
- `icon_key`
- `accent`
- `order_index`
- timestamps

### `resources`

Stores resource records.

- `id`
- `section_id`
- `kind`
- `title`
- `subtitle`
- `description`
- `category`
- `duration`
- `pages`
- `source`
- `meta`
- `featured`
- `is_custom`
- `order_index`
- `deleted_at`
- timestamps

### `tags`

Stores unique resource tag names.

- `id`
- `name`

### `resource_tags`

Join table between resources and tags.

- `resource_id`
- `tag_id`

### `media_assets`

Generic media table for resources, site images, team photos, documents, and future owner types.

- `id`
- `owner_type`
- `owner_id`
- `asset_type`
- `file_name`
- `original_name`
- `mime_type`
- `size_bytes`
- `url`
- `public_id`
- timestamps

The logical active media slot is:

```text
(owner_type, owner_id, asset_type)
```

### `team_categories`

Stores generic team sections.

- `id`
- `title`
- `slug`
- `description`
- `display_order`
- `is_active`
- timestamps

### `team_members`

Stores team members.

- `id`
- `category_id`
- `full_name`
- `designation`
- `display_order`
- `is_active`
- timestamps

### `admins`

Stores admin users.

- `id`
- `username`
- `password_hash`
- timestamps

## Cloudinary Integration

Cloudinary is used for persistent media storage in production.

### Upload Flow

1. Admin selects a file in the UI.
2. Frontend sends multipart upload to the backend.
3. Multer validates MIME type, extension, and size.
4. Backend uploads the file to Cloudinary when configured.
5. Backend stores the Cloudinary URL and `public_id` in SQLite.
6. Frontend receives the public URL and renders it.

### Replacement Flow

The application intentionally stores one active media record per logical slot:

```text
owner_type + owner_id + asset_type
```

When replacing a file:

1. Previous media record is loaded.
2. Previous Cloudinary asset is deleted using `public_id`, or derived from the Cloudinary URL for legacy records.
3. New file is uploaded.
4. Existing database record is updated.
5. Website renders the new asset.

### Delete Flow

When media is deleted through the admin UI:

1. Database row is removed.
2. Cloudinary asset is deleted when identifiable.
3. Frontend falls back to its empty/default state.

### Delivery Optimization

Cloudinary image URLs are transformed at render time using:

- `f_auto`
- `q_auto`
- responsive widths
- `c_limit`

Upload behavior is unchanged; optimization happens only during public image delivery.

## Security Features

- JWT authentication
- HTTP-only cookie sessions
- Secure cookies in production
- SameSite cookie configuration
- No JWT returned in login JSON
- Production startup validation for required secrets
- Admin credentials required in production
- Default admin seeding only when no admin exists
- bcrypt password hashing
- Protected write routes
- Public read routes where appropriate
- Strict production CORS origin allowlist
- Origin validation for unsafe requests
- Helmet security headers
- Rate limiting for auth/admin routes
- JSON body size limits
- Input validation and safe ID patterns
- SQL prepared statements
- File MIME type validation
- File extension validation
- File size limits
- Dangerous upload extension blocking
- Path traversal protection for local upload fallback
- Production-safe error messages

## Performance Optimizations

- Route-level code splitting with `React.lazy`
- Suspense loading states for routes
- Error boundary around the app
- Lazy-loaded interactive map route component
- Local GeoJSON map loaded asynchronously
- Batched media asset lookup using the bulk media endpoint
- Cloudinary responsive image transformation URLs
- `loading="lazy"` and `decoding="async"` for below-the-fold images
- `fetchPriority="high"` for the true Hero LCP image
- Intrinsic image dimensions where useful
- SQLite WAL mode
- SQLite foreign keys enabled
- Composite indexes for resource and team ordering/filtering
- Batched backend resource hydration for tags/media
- Batched backend team hydration for member photos
- Vercel static asset delivery with hashed production assets

## Future Roadmap

Project Bharti v1.0 is structured for safe future expansion without requiring core rewrites.

Potential roadmap items:

- Add more admin-managed team categories
- Add additional project states and district impact data
- Expand resource library content
- Add downloadable training material
- Add public reports and research outputs
- Add analytics/observability
- Add automated end-to-end release checks
- Add version-controlled Render deployment configuration
- Add automated database backup workflow
- Add richer media reconciliation tooling for operational maintenance

## Production Readiness

Project Bharti v1.0 is production-ready when the following are configured:

- Frontend deployed to Vercel
- Backend deployed to Render
- Render persistent disk attached for SQLite
- Cloudinary credentials configured
- Production CORS points to the exact Vercel frontend origin
- `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` are set
- `VITE_API_BASE_URL` points to the Render backend `/api`
- Upload, replace, delete, login, resources, team, and public page rendering are verified after deployment
