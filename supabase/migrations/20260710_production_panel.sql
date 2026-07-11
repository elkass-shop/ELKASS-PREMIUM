-- ELKASS production panel: auth roles, safe RLS, storage and audit
alter table public.admin_profiles add column if not exists user_id uuid unique references auth.users(id) on delete cascade;
alter table public.admin_profiles drop constraint if exists admin_profiles_role_check;
alter table public.admin_profiles add constraint admin_profiles_role_check check (role in ('super_admin','admin','editor'));

create or replace function public.current_panel_role(project text default 'elkass')
returns text language sql stable security definer set search_path=public as $$
  select role from public.admin_profiles
  where user_id=auth.uid() and project_slug=project and is_active=true limit 1
$$;

-- Products: public sees published, authenticated panel users can manage their project.
alter table public.products enable row level security;
drop policy if exists "public products read" on public.products;
create policy "public products read" on public.products for select using (is_active=true and coalesce(status,'published')='published');
drop policy if exists "panel products insert" on public.products;
create policy "panel products insert" on public.products for insert to authenticated with check (public.current_panel_role(project_slug) in ('super_admin','admin','editor'));
drop policy if exists "panel products update" on public.products;
create policy "panel products update" on public.products for update to authenticated using (public.current_panel_role(project_slug) in ('super_admin','admin','editor')) with check (public.current_panel_role(project_slug) in ('super_admin','admin','editor'));
drop policy if exists "boss products delete" on public.products;
create policy "boss products delete" on public.products for delete to authenticated using (public.current_panel_role(project_slug) in ('super_admin','admin'));

-- Profiles: user reads self; bosses manage panel profiles.
drop policy if exists "public read admins disabled" on public.admin_profiles;
create policy "profile read self" on public.admin_profiles for select to authenticated using (user_id=auth.uid() or public.current_panel_role(project_slug) in ('super_admin','admin'));
create policy "boss profiles manage" on public.admin_profiles for all to authenticated using (public.current_panel_role(project_slug) in ('super_admin','admin')) with check (public.current_panel_role(project_slug) in ('super_admin','admin'));

-- Storage bucket for product and CMS media.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('elkass-media','elkass-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict(id) do update set public=true,file_size_limit=10485760,allowed_mime_types=excluded.allowed_mime_types;
create policy "public media read" on storage.objects for select using (bucket_id='elkass-media');
create policy "panel media insert" on storage.objects for insert to authenticated with check (bucket_id='elkass-media' and public.current_panel_role('elkass') in ('super_admin','admin','editor'));
create policy "panel media update" on storage.objects for update to authenticated using (bucket_id='elkass-media' and public.current_panel_role('elkass') in ('super_admin','admin','editor'));
create policy "boss media delete" on storage.objects for delete to authenticated using (bucket_id='elkass-media' and public.current_panel_role('elkass') in ('super_admin','admin'));
