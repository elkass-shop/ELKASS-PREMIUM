-- V58/V59/V60 LIVE builders — optional Supabase foundation
create table if not exists project_settings (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'elkass',
  setting_key text not null,
  setting_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(project_slug, setting_key)
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'elkass',
  name text not null,
  role text,
  url text not null,
  alt text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
