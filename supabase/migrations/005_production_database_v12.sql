-- ELKASS Production Database v12
-- Run after migrations 001-004 in Supabase SQL editor.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  display_name text,
  role text not null default 'editor' check (role in ('owner','admin','editor','orders','viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  parent_id uuid references public.categories(id) on delete set null,
  name text not null, slug text not null, description text default '', image_url text,
  icon text, sort_order integer not null default 0, is_active boolean not null default true,
  seo jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(project_slug, slug)
);
create index if not exists categories_parent_idx on public.categories(project_slug,parent_id,sort_order);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  name text not null, slug text not null, logo_url text, website_url text, description text default '',
  sort_order integer not null default 0, is_featured boolean not null default false, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(project_slug,slug)
);

alter table public.products add column if not exists slug text;
alter table public.products add column if not exists category_id uuid references public.categories(id) on delete set null;
alter table public.products add column if not exists brand_id uuid references public.brands(id) on delete set null;
alter table public.products add column if not exists sku text;
alter table public.products add column if not exists ean text;
alter table public.products add column if not exists stock integer not null default 0;
alter table public.products add column if not exists short_description text default '';
alter table public.products add column if not exists description text default '';
alter table public.products add column if not exists gallery jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists specifications jsonb not null default '{}'::jsonb;
alter table public.products add column if not exists seo jsonb not null default '{}'::jsonb;
alter table public.products add column if not exists status text not null default 'draft';
alter table public.products add column if not exists sort_order integer not null default 0;
create unique index if not exists products_project_slug_unique on public.products(project_slug,slug) where slug is not null;
create index if not exists products_category_idx on public.products(project_slug,category_id,status,is_active);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(), order_id text not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null, product_name text not null,
  sku text, quantity integer not null check(quantity>0), unit_price numeric(12,2) not null check(unit_price>=0),
  total numeric(12,2) generated always as (quantity * unit_price) stored, snapshot jsonb not null default '{}'::jsonb
);
create index if not exists order_items_order_idx on public.order_items(order_id);

create table if not exists public.site_settings (
  project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  setting_key text not null, value jsonb not null default '{}'::jsonb,
  is_public boolean not null default true, updated_at timestamptz not null default now(),
  primary key(project_slug,setting_key)
);

create table if not exists public.theme_presets (
  id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass' references public.projects(slug) on delete cascade,
  key text not null, name text not null, config jsonb not null default '{}'::jsonb,
  is_active boolean not null default false, is_system boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(project_slug,key)
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key, project_slug text not null default 'elkass',
  user_id uuid references auth.users(id) on delete set null, action text not null, entity_type text not null,
  entity_id text, payload jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);

create or replace function public.is_elkass_staff(required_roles text[] default array['owner','admin','editor','orders','viewer'])
returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.admin_profiles p where p.user_id=auth.uid() and p.project_slug='elkass' and p.is_active and p.role=any(required_roles));
$$;

-- Public order endpoint; prices are recalculated from active products.
create or replace function public.create_store_order(customer jsonb, cart jsonb)
returns text language plpgsql security definer set search_path=public as $$
declare oid text := 'ELK-'||to_char(now(),'YYYYMMDD')||'-'||upper(substr(encode(gen_random_bytes(5),'hex'),1,8));
declare row jsonb; declare p public.products%rowtype; declare sum_total numeric(12,2):=0; declare cid text;
begin
 if jsonb_array_length(cart)=0 then raise exception 'Cart is empty'; end if;
 cid := coalesce(nullif(customer->>'id',''),'C-'||upper(substr(encode(gen_random_bytes(6),'hex'),1,10)));
 insert into public.customers(id,project_slug,name,email,phone,profile_json)
 values(cid,'elkass',coalesce(customer->>'name','Klient'),customer->>'email',customer->>'phone',customer)
 on conflict(id) do update set name=excluded.name,email=excluded.email,phone=excluded.phone,profile_json=excluded.profile_json,updated_at=now();
 insert into public.orders(id,project_slug,customer_id,customer_name,customer_email,status,total,currency,items)
 values(oid,'elkass',cid,coalesce(customer->>'name','Klient'),customer->>'email','pending',0,'PLN',cart);
 for row in select * from jsonb_array_elements(cart) loop
   select * into p from public.products where id=row->>'product_id' and is_active and status='published';
   if not found then raise exception 'Product unavailable: %',row->>'product_id'; end if;
   if greatest(1,coalesce((row->>'quantity')::int,1)) > p.stock and p.stock >= 0 then raise exception 'Insufficient stock: %',p.name; end if;
   insert into public.order_items(order_id,product_id,product_name,sku,quantity,unit_price,snapshot)
   values(oid,p.id,p.name,p.sku,greatest(1,coalesce((row->>'quantity')::int,1)),p.price,jsonb_build_object('image',p.image,'brand',p.brand));
   sum_total := sum_total + p.price*greatest(1,coalesce((row->>'quantity')::int,1));
 end loop;
 update public.orders set total=sum_total,updated_at=now() where id=oid;
 return oid;
exception when others then delete from public.orders where id=oid; raise;
end $$;

grant execute on function public.create_store_order(jsonb,jsonb) to anon, authenticated;

-- RLS
alter table public.admin_profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.order_items enable row level security;
alter table public.site_settings enable row level security;
alter table public.theme_presets enable row level security;
alter table public.audit_log enable row level security;

-- remove unsafe broad policies from legacy migration where possible
do $$ declare t text; begin
 foreach t in array array['orders','customers','cms_pages','reviews','newsletter_subscribers','showroom_items','custom_themes','product_extensions'] loop
  execute format('drop policy if exists "authenticated manage %s" on public.%I',t,t);
 end loop;
end $$;

do $$ begin create policy "public categories" on public.categories for select using(is_active); exception when duplicate_object then null; end $$;
do $$ begin create policy "public brands" on public.brands for select using(is_active); exception when duplicate_object then null; end $$;
do $$ begin create policy "public published products v12" on public.products for select using(is_active and status='published'); exception when duplicate_object then null; end $$;
do $$ begin create policy "public settings v12" on public.site_settings for select using(is_public); exception when duplicate_object then null; end $$;
do $$ begin create policy "public active theme" on public.theme_presets for select using(is_active); exception when duplicate_object then null; end $$;

do $$ declare t text; begin
 foreach t in array array['products','media_assets','home_sections','project_settings','categories','brands','orders','customers','order_items','cms_pages','reviews','newsletter_subscribers','showroom_items','custom_themes','product_extensions','site_settings','theme_presets'] loop
  execute format('create policy "staff manage %s v12" on public.%I for all to authenticated using (public.is_elkass_staff(array[''owner'',''admin'',''editor'',''orders''])) with check (public.is_elkass_staff(array[''owner'',''admin'',''editor'',''orders'']))',t,t);
 end loop;
exception when duplicate_object then null; end $$;

do $$ begin create policy "own profile" on public.admin_profiles for select to authenticated using(user_id=auth.uid()); exception when duplicate_object then null; end $$;
do $$ begin create policy "owners manage profiles" on public.admin_profiles for all to authenticated using(public.is_elkass_staff(array['owner','admin'])) with check(public.is_elkass_staff(array['owner','admin'])); exception when duplicate_object then null; end $$;
do $$ begin create policy "staff audit read" on public.audit_log for select to authenticated using(public.is_elkass_staff(array['owner','admin'])); exception when duplicate_object then null; end $$;

-- Storage buckets and policies
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('elkass-media','elkass-media',true,15728640,array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

do $$ begin create policy "public read elkass media" on storage.objects for select using(bucket_id='elkass-media'); exception when duplicate_object then null; end $$;
do $$ begin create policy "staff upload elkass media" on storage.objects for insert to authenticated with check(bucket_id='elkass-media' and public.is_elkass_staff(array['owner','admin','editor'])); exception when duplicate_object then null; end $$;
do $$ begin create policy "staff update elkass media" on storage.objects for update to authenticated using(bucket_id='elkass-media' and public.is_elkass_staff(array['owner','admin','editor'])) with check(bucket_id='elkass-media' and public.is_elkass_staff(array['owner','admin','editor'])); exception when duplicate_object then null; end $$;
do $$ begin create policy "staff delete elkass media" on storage.objects for delete to authenticated using(bucket_id='elkass-media' and public.is_elkass_staff(array['owner','admin'])); exception when duplicate_object then null; end $$;

-- updated_at triggers
do $$ declare t text; begin
 foreach t in array array['admin_profiles','categories','brands','products','site_settings','theme_presets'] loop
  execute format('drop trigger if exists set_%s_updated_at on public.%I',t,t);
  execute format('create trigger set_%s_updated_at before update on public.%I for each row execute function public.set_updated_at()',t,t);
 end loop;
end $$;

-- Initial theme presets
insert into public.theme_presets(project_slug,key,name,config,is_system)
values
('elkass','light','Light','{"accent":"#e30613","surface":"#ffffff"}',true),
('elkass','dark','Dark','{"accent":"#e30613","surface":"#101114"}',true),
('elkass','christmas','Christmas','{"accent":"#b5121b","secondary":"#1f6a43","decor":"christmas"}',true),
('elkass','blackweek','Black Week','{"accent":"#d6ae57","surface":"#090909","decor":"blackweek"}',true),
('elkass','spring','Spring','{"accent":"#4f9d69","decor":"spring"}',true),
('elkass','summer','Summer','{"accent":"#168aad","decor":"summer"}',true),
('elkass','autumn','Autumn','{"accent":"#b6652a","decor":"autumn"}',true),
('elkass','valentine','Valentine','{"accent":"#b21e4b","decor":"valentine"}',true),
('elkass','sale','Sale','{"accent":"#e30613","decor":"sale"}',true)
on conflict(project_slug,key) do nothing;
