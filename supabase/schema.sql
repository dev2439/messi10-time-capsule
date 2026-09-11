-- Messi 10 Digital Time Capsule
-- Applied to the linked Supabase project.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SEQUENCE IF NOT EXISTS tribute_seq START 1;

CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  message text NOT NULL,
  favourite_moment text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  tribute_id text UNIQUE,
  access_token uuid NOT NULL DEFAULT gen_random_uuid(),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS memories_status_submitted_idx ON memories (status, submitted_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS memories_access_token_idx ON memories (access_token);

CREATE TABLE IF NOT EXISTS app_secrets (
  key text PRIMARY KEY,
  value text NOT NULL
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
