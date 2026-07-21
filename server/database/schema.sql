-- Project Bharti backend schema (SQLite dialect).
-- Kept intentionally close to ANSI SQL so a future move to PostgreSQL/MySQL
-- only needs small dialect tweaks (AUTOINCREMENT, datetime('now'), etc).

CREATE TABLE IF NOT EXISTS sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_key TEXT,
  accent TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  kind TEXT NOT NULL DEFAULT 'pdf',
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  category TEXT,
  duration TEXT DEFAULT '',
  pages TEXT DEFAULT '',
  source TEXT DEFAULT '',
  meta TEXT DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  is_custom INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_resources_section ON resources(section_id);
CREATE INDEX IF NOT EXISTS idx_resources_deleted ON resources(deleted_at);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS resource_tags (
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, tag_id)
);

-- Generic media table. Used both for resource thumbnails/PDFs/videos and for
-- non-resource editable slots (Hero capability PDFs, activity card images,
-- hero artwork) via owner_type/owner_id instead of a foreign key, so any
-- part of the editable frontend can persist a file without a schema change.
CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  owner_type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  url TEXT NOT NULL,
  public_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_media_owner_asset
  ON media_assets(owner_type, owner_id, asset_type);

-- Generic team directory. Categories are intentionally data-driven so the
-- admin can add future groups (mentors, volunteers, advisory board, etc.)
-- without a frontend or backend schema change.
CREATE TABLE IF NOT EXISTS team_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_team_categories_active_order
  ON team_categories(is_active, display_order);

CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES team_categories(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  designation TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_team_members_category_order
  ON team_members(category_id, is_active, display_order);

-- Administrators. Only bcrypt password hashes are stored, never plaintext.
-- Designed to support multiple future admins without any schema change.
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
