-- ELKASS v1.0 COMPLETE MIGRATION
-- Idempotent production schema for Supabase/PostgreSQL.
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
insert into public.projects(slug,name) values ('elkass','ELKASS Olesno') on conflict(slug) do nothing;

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  project_slug text not null default 'elkass',
  email text,
  name text,
  role text not null default 'editor' check(role in ('super_admin','admin','editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists admin_profiles_project_idx on public.admin_profiles(project_slug);

create or replace function public.current_panel_role(project text default 'elkass')
returns text language sql stable security definer set search_path=public as $$
 select role from public.admin_profiles where user_id=auth.uid() and project_slug=project and is_active=true limit 1
$$;

create table if not exists public.categories (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', name text not null,
 slug text not null, parent_id uuid references public.categories(id) on delete set null,
 image_url text, description text, sort_order integer not null default 0, is_active boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(project_slug,slug)
);
create table if not exists public.brands (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', name text not null,
 slug text not null, logo_url text, description text, is_active boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(project_slug,slug)
);

create table if not exists public.products (
 id text primary key, project_slug text not null default 'elkass', sku text, name text not null,
 slug text, brand text, category text, category_id uuid references public.categories(id) on delete set null,
 brand_id uuid references public.brands(id) on delete set null, short text, description text,
 price numeric(12,2) not null default 0 check(price>=0), old_price numeric(12,2) not null default 0 check(old_price>=0),
 stock integer not null default 0 check(stock>=0), availability text default 'Dostępny', badge text,
 image text, gallery jsonb not null default '[]'::jsonb, features jsonb not null default '[]'::jsonb,
 specifications jsonb not null default '{}'::jsonb, seo_title text, seo_description text,
 status text not null default 'draft' check(status in ('draft','published','archived','deleted')),
 is_active boolean not null default true, created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.products add column if not exists old_price numeric(12,2) not null default 0;
alter table public.products add column if not exists stock integer not null default 0;
alter table public.products add column if not exists gallery jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists specifications jsonb not null default '{}'::jsonb;
alter table public.products add column if not exists seo_title text;
alter table public.products add column if not exists seo_description text;
create index if not exists products_project_status_idx on public.products(project_slug,status,is_active);

create table if not exists public.media_assets (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', name text not null,
 type text default 'image', src text not null, alt_text text, storage_path text, size_bytes bigint, mime_type text,
 created_by uuid references auth.users(id) on delete set null, created_at timestamptz not null default now()
);
create table if not exists public.project_settings (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', key text not null,
 value jsonb not null default '{}'::jsonb, is_public boolean not null default false,
 updated_by uuid references auth.users(id) on delete set null, updated_at timestamptz not null default now(), unique(project_slug,key)
);
create table if not exists public.home_sections (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', section_key text not null,
 title text, content jsonb not null default '{}'::jsonb, sort_order integer not null default 0,
 is_active boolean not null default true, updated_at timestamptz not null default now(), unique(project_slug,section_key)
);
create table if not exists public.cms_pages (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', slug text not null,
 title text not null, content jsonb not null default '{}'::jsonb, seo_title text, seo_description text,
 status text not null default 'draft' check(status in ('draft','published','archived')),
 updated_by uuid references auth.users(id) on delete set null, created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(), unique(project_slug,slug)
);

create table if not exists public.customers (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass', email text,
 full_name text not null, phone text, address jsonb not null default '{}'::jsonb, notes text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists customers_email_idx on public.customers(project_slug,email);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(), project_slug text not null default 'elkass',
 order_number text unique not null default ('ELK-'||to_char(now(),'YYYYMMDD')||'-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,6))),
 customer_id uuid references public.customers(id) on delete set null, customer_name text not null, email text,
 phone text not null, delivery_method text not null, service_method text, delivery_address text,
 payment_method text not null, status text not null default 'new' check(status in ('new','confirmed','processing','ready','shipped','completed','cancelled')),
 payment_status text not null default 'pending' check(payment_status in ('pending','paid','failed','refunded','cod')),
 subtotal numeric(12,2) not null default 0, delivery_cost numeric(12,2) not null default 0,
 total numeric(12,2) not null default 0, notes text, source text not null default 'website',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists orders_project_created_idx on public.orders(project_slug,created_at desc);
create table if not exists public.order_items (
 id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
 product_id text references public.products(id) on delete set null, product_name text not null, sku text,
 quantity integer not null check(quantity>0), unit_price numeric(12,2) not null check(unit_price>=0),
 line_total numeric(12,2) generated always as (quantity*unit_price) stored, image_url text
);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
do $$ declare t text; begin foreach t in array array['projects','admin_profiles','categories','brands','products','project_settings','home_sections','cms_pages','customers','orders'] loop
 execute format('drop trigger if exists trg_%I_updated_at on public.%I',t,t);
 execute format('create trigger trg_%I_updated_at before update on public.%I for each row execute function public.touch_updated_at()',t,t);
end loop; end $$;

create or replace function public.create_public_order(payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare o public.orders; item jsonb; calc_total numeric:=0; p public.products; qty integer; customer uuid;
begin
 if coalesce(trim(payload->>'customer_name'),'')='' or coalesce(trim(payload->>'phone'),'')='' then raise exception 'Brak wymaganych danych klienta'; end if;
 if jsonb_array_length(coalesce(payload->'items','[]'::jsonb))=0 then raise exception 'Koszyk jest pusty'; end if;
 for item in select * from jsonb_array_elements(payload->'items') loop
   select * into p from public.products where id=item->>'product_id' and project_slug='elkass' and is_active=true and status='published';
   if not found then raise exception 'Produkt niedostępny: %', item->>'product_id'; end if;
   qty:=greatest(1,least(99,coalesce((item->>'quantity')::int,1))); calc_total:=calc_total+(p.price*qty);
 end loop;
 insert into public.customers(project_slug,email,full_name,phone,address)
 values('elkass',nullif(payload->>'email',''),payload->>'customer_name',payload->>'phone',jsonb_build_object('text',coalesce(payload->>'delivery_address','')))
 returning id into customer;
 insert into public.orders(project_slug,customer_id,customer_name,email,phone,delivery_method,service_method,delivery_address,payment_method,subtotal,total,notes)
 values('elkass',customer,payload->>'customer_name',nullif(payload->>'email',''),payload->>'phone',coalesce(payload->>'delivery_method','Odbiór w salonie'),payload->>'service_method',payload->>'delivery_address',coalesce(payload->>'payment_method','Gotówka'),calc_total,calc_total,payload->>'notes') returning * into o;
 for item in select * from jsonb_array_elements(payload->'items') loop
   select * into p from public.products where id=item->>'product_id'; qty:=greatest(1,least(99,coalesce((item->>'quantity')::int,1)));
   insert into public.order_items(order_id,product_id,product_name,sku,quantity,unit_price,image_url) values(o.id,p.id,p.name,p.sku,qty,p.price,p.image);
 end loop;
 return jsonb_build_object('id',o.id,'order_number',o.order_number,'total',o.total,'status',o.status);
end $$;
grant execute on function public.create_public_order(jsonb) to anon, authenticated;

-- RLS
alter table public.admin_profiles enable row level security; alter table public.products enable row level security;
alter table public.categories enable row level security; alter table public.brands enable row level security;
alter table public.media_assets enable row level security; alter table public.project_settings enable row level security;
alter table public.home_sections enable row level security; alter table public.cms_pages enable row level security;
alter table public.customers enable row level security; alter table public.orders enable row level security; alter table public.order_items enable row level security;

do $$ declare r record; begin for r in select schemaname,tablename,policyname from pg_policies where schemaname='public' and tablename in ('admin_profiles','products','categories','brands','media_assets','project_settings','home_sections','cms_pages','customers','orders','order_items') loop execute format('drop policy if exists %I on %I.%I',r.policyname,r.schemaname,r.tablename); end loop; end $$;
create policy products_public_read on public.products for select using(is_active=true and status='published');
create policy categories_public_read on public.categories for select using(is_active=true);
create policy brands_public_read on public.brands for select using(is_active=true);
create policy home_public_read on public.home_sections for select using(is_active=true);
create policy pages_public_read on public.cms_pages for select using(status='published');
create policy settings_public_read on public.project_settings for select using(is_public=true);
create policy media_public_read on public.media_assets for select using(true);
create policy panel_products_all on public.products for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_categories_all on public.categories for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_brands_all on public.brands for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_media_all on public.media_assets for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_content_all on public.home_sections for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_pages_all on public.cms_pages for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_settings_all on public.project_settings for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin')) with check(current_panel_role(project_slug) in ('super_admin','admin'));
create policy profile_self_or_boss on public.admin_profiles for select to authenticated using(user_id=auth.uid() or current_panel_role(project_slug) in ('super_admin','admin'));
create policy profile_boss_manage on public.admin_profiles for all to authenticated using(current_panel_role(project_slug) in ('super_admin','admin')) with check(current_panel_role(project_slug) in ('super_admin','admin'));
create policy panel_customers_read on public.customers for select to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_orders_read on public.orders for select to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_orders_update on public.orders for update to authenticated using(current_panel_role(project_slug) in ('super_admin','admin','editor')) with check(current_panel_role(project_slug) in ('super_admin','admin','editor'));
create policy panel_order_items_read on public.order_items for select to authenticated using(exists(select 1 from public.orders o where o.id=order_id and current_panel_role(o.project_slug) in ('super_admin','admin','editor')));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('elkass-media','elkass-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif']) on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
do $$ declare r record; begin for r in select policyname from pg_policies where schemaname='storage' and tablename='objects' and policyname like 'elkass_%' loop execute format('drop policy if exists %I on storage.objects',r.policyname); end loop; end $$;
create policy elkass_media_public_read on storage.objects for select using(bucket_id='elkass-media');
create policy elkass_media_panel_insert on storage.objects for insert to authenticated with check(bucket_id='elkass-media' and current_panel_role('elkass') in ('super_admin','admin','editor'));
create policy elkass_media_panel_update on storage.objects for update to authenticated using(bucket_id='elkass-media' and current_panel_role('elkass') in ('super_admin','admin','editor'));
create policy elkass_media_boss_delete on storage.objects for delete to authenticated using(bucket_id='elkass-media' and current_panel_role('elkass') in ('super_admin','admin'));

insert into public.project_settings(project_slug,key,value,is_public) values
('elkass','store',jsonb_build_object('name','ELKASS Olesno','phone','34 358 24 42','email','','address','ul. Armii Krajowej 5, 46-300 Olesno'),true),
('elkass','commerce',jsonb_build_object('currency','PLN','payments_enabled',false,'orders_enabled',true),true)
on conflict(project_slug,key) do nothing;
