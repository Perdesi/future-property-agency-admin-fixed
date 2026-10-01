-- Future Property Agency: Supabase setup. Paste ALL of this in Supabase > SQL Editor > New query > Run.
-- Safe to run more than once.

-- 1) Tables
create table if not exists public.properties (
  id text primary key, slug text, data jsonb not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.inquiries (
  id text primary key, data jsonb not null, created_at timestamptz not null default now());
create table if not exists public.settings (id text primary key, data jsonb not null);
create table if not exists public.analytics (key text primary key, value bigint not null default 0);

alter table public.properties enable row level security;
alter table public.inquiries  enable row level security;
alter table public.settings   enable row level security;
alter table public.analytics  enable row level security;

-- 2) Access rules
-- Properties and settings: everyone can read, only the logged-in admin can change.
drop policy if exists "public read properties" on public.properties;
drop policy if exists "admin write properties" on public.properties;
create policy "public read properties" on public.properties for select to anon, authenticated using (true);
create policy "admin write properties" on public.properties for all to authenticated using (true) with check (true);

drop policy if exists "public read settings" on public.settings;
drop policy if exists "admin write settings" on public.settings;
create policy "public read settings" on public.settings for select to anon, authenticated using (true);
create policy "admin write settings" on public.settings for all to authenticated using (true) with check (true);

-- Inquiries: visitors can only send one, only the admin can read or manage them.
drop policy if exists "visitors send inquiries" on public.inquiries;
drop policy if exists "admin manage inquiries" on public.inquiries;
create policy "visitors send inquiries" on public.inquiries for insert to anon, authenticated with check (true);
create policy "admin manage inquiries" on public.inquiries for all to authenticated using (true) with check (true);

-- Analytics: only the admin can read; counting happens through the function below.
drop policy if exists "admin read analytics" on public.analytics;
create policy "admin read analytics" on public.analytics for select to authenticated using (true);

-- 3) View and click counter (visitors cannot edit anything else)
create or replace function public.track_event(kind text, pid text default '')
returns void language plpgsql security definer set search_path = public as $$
begin
  if kind = 'view' and pid <> '' then
    update public.properties
      set data = jsonb_set(data, '{views}', to_jsonb(coalesce((data->>'views')::int, 0) + 1))
      where id = pid;
    insert into public.analytics(key, value) values ('view:' || pid, 1)
      on conflict (key) do update set value = public.analytics.value + 1;
  elsif kind in ('whatsappClicks', 'callClicks') then
    insert into public.analytics(key, value) values (kind, 1)
      on conflict (key) do update set value = public.analytics.value + 1;
  end if;
end $$;
grant execute on function public.track_event(text, text) to anon, authenticated;

-- 4) Photo storage (public bucket: everyone can view, only the admin can upload)
insert into storage.buckets (id, name, public) values ('property-images', 'property-images', true)
  on conflict (id) do nothing;
drop policy if exists "public read property images" on storage.objects;
drop policy if exists "admin upload property images" on storage.objects;
drop policy if exists "admin update property images" on storage.objects;
drop policy if exists "admin delete property images" on storage.objects;
create policy "public read property images" on storage.objects for select to anon, authenticated using (bucket_id = 'property-images');
create policy "admin upload property images" on storage.objects for insert to authenticated with check (bucket_id = 'property-images');
create policy "admin update property images" on storage.objects for update to authenticated using (bucket_id = 'property-images');
create policy "admin delete property images" on storage.objects for delete to authenticated using (bucket_id = 'property-images');
