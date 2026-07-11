-- F6: kategorie, podkategorie, motywy i pełniejszy Product Builder
create table if not exists public.categories (
  id text primary key,
  project_slug text not null default 'elkass',
  name text not null,
  description text,
  image text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.subcategories (
  id text primary key,
  project_slug text not null default 'elkass',
  category_id text references public.categories(id) on delete cascade,
  name text not null,
  image text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.design_themes (
  id text primary key,
  project_slug text not null default 'elkass',
  name text not null,
  theme_key text not null,
  message text,
  decorations boolean default true,
  theme_json jsonb default '{}'::jsonb,
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.products add column if not exists series text;
alter table if exists public.products add column if not exists status text default 'published';
alter table if exists public.products add column if not exists show_home boolean default true;
alter table if exists public.products add column if not exists is_promo boolean default false;
alter table if exists public.products add column if not exists is_hit boolean default false;
alter table if exists public.products add column if not exists is_outlet boolean default false;
alter table if exists public.products add column if not exists is_new boolean default false;
