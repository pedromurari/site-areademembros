create table if not exists public.admin_navigation_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  href text not null,
  icon_key text not null default 'home',
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_navigation_items enable row level security;

drop policy if exists "authenticated read admin navigation" on public.admin_navigation_items;
create policy "authenticated read admin navigation"
  on public.admin_navigation_items
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "admin manage admin navigation" on public.admin_navigation_items;
create policy "admin manage admin navigation"
  on public.admin_navigation_items
  for all
  using (
    auth.role() = 'authenticated'
    and exists (
      select 1
      from public.profiles p
      where lower(coalesce(p.email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
        and lower(coalesce(p.role, '')) in ('admin', 'adm')
    )
  )
  with check (
    auth.role() = 'authenticated'
    and exists (
      select 1
      from public.profiles p
      where lower(coalesce(p.email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
        and lower(coalesce(p.role, '')) in ('admin', 'adm')
    )
  );

insert into public.admin_navigation_items (
  slug,
  label,
  href,
  icon_key,
  sort_order,
  is_visible
)
values
  ('home', 'Home', '/admin', 'home', 1, true),
  ('certificados', 'Certificados', '/admin/certificados', 'certificate', 2, true),
  ('meus-cursos', 'Meus Cursos', '/admin/secao/meus-cursos', 'courses', 3, true),
  ('aulas-ao-vivo', 'Aulas Ao Vivo', '/admin/secao/aulas-ao-vivo', 'live', 4, true),
  ('membros', 'Membros', '/admin/secao/membros', 'members', 5, true),
  ('gestao-de-midias', 'Gestao de Midias', '/admin/secao/gestao-de-midias', 'media', 6, true)
on conflict (slug) do update
set
  label = excluded.label,
  href = excluded.href,
  icon_key = excluded.icon_key,
  sort_order = excluded.sort_order,
  is_visible = excluded.is_visible;
