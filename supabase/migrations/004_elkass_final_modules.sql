-- ELKASS FINAL 1.0: production module foundation
create extension if not exists pgcrypto;

create table if not exists public.orders (
 id text primary key, project_slug text not null default 'elkass', customer_id text,
 customer_name text not null, customer_email text, status text not null default 'pending',
 total numeric(12,2) not null default 0, currency text not null default 'PLN',
 items jsonb not null default '[]'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.customers (
 id text primary key, project_slug text not null default 'elkass', name text not null,
 email text, phone text, status text not null default 'active', profile_json jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.cms_pages (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', slug text not null,
 title text not null, content text not null default '', status text not null default 'draft',
 seo_json jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now(), unique(project_slug,slug)
);
create table if not exists public.reviews (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', author text not null,
 rating int not null check (rating between 1 and 5), content text not null, status text not null default 'draft', created_at timestamptz not null default now()
);
create table if not exists public.newsletter_subscribers (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', email text not null,
 status text not null default 'active', created_at timestamptz not null default now(), unique(project_slug,email)
);
create table if not exists public.showroom_items (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', title text not null,
 image text not null, status text not null default 'draft', sort_order int not null default 0, updated_at timestamptz not null default now()
);
create table if not exists public.custom_themes (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', name text not null,
 theme_json jsonb not null default '{}'::jsonb, status text not null default 'draft', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.product_extensions (
 product_id text primary key references public.products(id) on delete cascade, sku text, ean text, stock int not null default 0,
 warranty text, tags text[] not null default '{}', gallery jsonb not null default '[]'::jsonb, params jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.customers enable row level security;
alter table public.cms_pages enable row level security;
alter table public.reviews enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.showroom_items enable row level security;
alter table public.custom_themes enable row level security;
alter table public.product_extensions enable row level security;

-- Public storefront reads only published content.
do $$ begin
 create policy "public published cms" on public.cms_pages for select using (status='published');
exception when duplicate_object then null; end $$;
do $$ begin
 create policy "public published reviews" on public.reviews for select using (status='published');
exception when duplicate_object then null; end $$;
do $$ begin
 create policy "public published showroom" on public.showroom_items for select using (status='published');
exception when duplicate_object then null; end $$;

-- Authenticated panel access. Tighten to admin_profiles roles in production if required.
do $$ declare t text; begin
 foreach t in array array['orders','customers','cms_pages','reviews','newsletter_subscribers','showroom_items','custom_themes','product_extensions'] loop
  execute format('create policy "authenticated manage %s" on public.%I for all to authenticated using (true) with check (true)',t,t);
 end loop;
exception when duplicate_object then null; end $$;
