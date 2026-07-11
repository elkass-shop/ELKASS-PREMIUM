-- ELKASS Cloud Core v54
-- Projekt ELKASS jest pierwszym wdrożeniem. Struktura jest przygotowana pod późniejsze WOODYBOY Core.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.projects (slug, name)
values ('elkass', 'ELKASS Olesno')
on conflict (slug) do nothing;

create table if not exists public.products (
  id text primary key,
  project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  name text not null,
  brand text,
  category text,
  subcategory text,
  price numeric not null default 0,
  old_price numeric,
  badge text,
  availability text,
  image text,
  product_json jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_project_idx on public.products(project_slug);
create index if not exists products_active_idx on public.products(is_active);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  title text,
  url text not null,
  alt text,
  type text default 'image',
  folder text default 'products',
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.home_sections (
  id text primary key,
  project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  section_key text not null,
  title text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_settings (
  project_slug text primary key references public.projects(slug) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.products enable row level security;
alter table public.media_assets enable row level security;
alter table public.home_sections enable row level security;
alter table public.project_settings enable row level security;

-- Publiczny odczyt aktywnych danych sklepu.
create policy if not exists "public read projects" on public.projects for select using (true);
create policy if not exists "public read active products" on public.products for select using (is_active = true);
create policy if not exists "public read media" on public.media_assets for select using (true);
create policy if not exists "public read home sections" on public.home_sections for select using (is_active = true);
create policy if not exists "public read settings" on public.project_settings for select using (true);

-- Zapis przez panel powinien docelowo wymagać Supabase Auth i roli admin.
-- Na etapie testowym używamy localStorage, a po wdrożeniu auth dodamy polityki insert/update/delete dla roli admin.
