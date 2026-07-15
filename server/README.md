# Project Bharti — Backend API

Express + SQLite backend that persists the editable Resources library, Hero
capability PDFs, and site photographs that were previously stored in
`localStorage`.

## Stack

- Node.js (`node:sqlite`, no native build step)
- Express.js
- Multer (disk storage under `uploads/`)

## Setup

```bash
npm install          # from this folder, or `npm run server:install` from the repo root
npm run migrate       # creates server/data/bharti.sqlite and the schema
npm run seed          # seeds the 6 default resource sections + starter items
npm run dev           # starts the API on http://localhost:4000 (auto-restarts on file changes)
```

From the repository root you can also run:

```bash
npm run server:install
npm run server:migrate
npm run server:seed
npm run server        # starts the API
npm run dev            # starts the Vite frontend, proxying /api and /uploads to the backend
```

## Environment variables

Copy `.env.example` to `.env` to override any of these (all have safe
development defaults, so `.env` is optional):

| Variable          | Default                            |
| ----------------- | ----------------------------------- |
| `PORT`            | `4000`                              |
| `CORS_ORIGIN`     | reflects request origin             |
| `DB_FILE`         | `server/data/bharti.sqlite`         |
| `UPLOADS_ROOT`    | `server/uploads`                    |
| `ADMIN_USERNAME`  | `Shashank@11`                       |
| `ADMIN_PASSWORD`  | `Shashank@2026`                     |
| `JWT_SECRET`      | dev placeholder — change in any real deployment |
| `JWT_EXPIRES_IN`  | `7d`                                |

`ADMIN_USERNAME`/`ADMIN_PASSWORD` are only used once, to seed the first row
of the `admins` table on boot (the password is bcrypt-hashed before it is
stored — never kept as plaintext). Once an admin exists, changing these
variables has no effect; add or rotate admins directly against the
`admins` table instead.

## Authentication

- `POST /api/auth/login` — `{ username, password }` → sets an HTTP-only
  session cookie and returns `{ admin, token }`.
- `POST /api/auth/logout` — clears the session cookie.
- `GET /api/auth/me` — returns the current admin (`null` if not signed in).

Every resource/media mutation route (create, update, delete, upload,
reorder, duplicate) is wrapped with the `requireAuth` middleware and
returns `401` when no valid session is present. `GET` routes stay public
so visitors can keep browsing content.

## Layout

```
server/
  config/       env + sqlite connection
  database/     schema.sql, migrate.js, seed.js
  models/       raw SQL queries (Section, Resource, Tag, MediaAsset, Admin)
  services/     business logic (resourceService, mediaService, authService)
  controllers/  request/response glue
  routes/       Express routers, mounted under /api
  middleware/   multer upload config, error handler, auth (requireAuth/attachAdmin)
  utils/        asyncHandler, fileNaming, ApiError, response helpers
  uploads/      images/ thumbnails/ pdfs/ videos/ documents/ (served at /uploads)
  data/         bharti.sqlite (gitignored)
```

Swapping SQLite for PostgreSQL/MySQL later only requires changing
`config/db.js` and the SQL dialect in `database/schema.sql` — models,
services, controllers, and routes are unaffected.
