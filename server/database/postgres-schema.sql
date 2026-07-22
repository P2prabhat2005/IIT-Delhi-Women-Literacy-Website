-- PostgreSQL schema for media_assets table
-- This is used only for the media_assets migration in Phase 2

CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  url TEXT NOT NULL,
  public_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_media_owner_asset
  ON media_assets(owner_type, owner_id, asset_type);

-- Index for efficient queries by owner_type
CREATE INDEX IF NOT EXISTS idx_media_assets_owner_type
  ON media_assets(owner_type);

-- Index for efficient queries by owner_type and owner_id
CREATE INDEX IF NOT EXISTS idx_media_assets_owner_type_id
  ON media_assets(owner_type, owner_id);