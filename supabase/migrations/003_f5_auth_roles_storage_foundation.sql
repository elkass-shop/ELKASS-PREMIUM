-- F5 Auth + CMS foundation
-- ELKASS pozostaje pierwszym wdrożeniem; struktura jest przygotowana pod WOODYBOY Core.

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'elkass',
  email text not null,
  display_name text,
  role text not null default 'moderator' check (role in ('super_admin','admin','moderator','editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_slug, email)
);

create table if not exists public.cms_revisions (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'elkass',
  entity_type text not null,
  entity_id text not null,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now()
);

create table if not exists public.brand_items (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'elkass',
  name text not null,
  logo_url text,
  website_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;
alter table public.cms_revisions enable row level security;
alter table public.brand_items enable row level security;

create policy if not exists "public read active brands" on public.brand_items for select using (is_active = true);
create policy if not exists "public read revisions disabled" on public.cms_revisions for select using (false);
create policy if not exists "public read admins disabled" on public.admin_profiles for select using (false);

-- Docelowo po podpięciu Supabase Auth:
-- 1. admin_profiles.email = auth.jwt()->>'email'
-- 2. polityki insert/update/delete tylko dla role in ('super_admin','admin')
-- 3. media_assets.url wskazuje na Supabase Storage bucket np. elkass-media
