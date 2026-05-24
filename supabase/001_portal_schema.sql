create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  progress integer not null default 0,
  meta_label text,
  summary text,
  badge text,
  hero_eyebrow text,
  hero_title text,
  hero_description text,
  certificate_slug text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  slug text not null unique,
  title text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null unique,
  title text not null,
  kind text not null default 'video',
  duration text,
  provider text,
  video_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  placement text,
  audience text,
  status text not null default 'Rascunho',
  desktop_image_url text,
  mobile_image_url text,
  action_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.live_classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  datetime_label text,
  status text not null default 'Agendada',
  audience text,
  streaming_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  course_title text not null,
  turma text not null,
  duration_label text,
  hours text,
  minimum_lessons integer not null default 0,
  completed_lessons integer not null default 0,
  bonus_included boolean not null default false,
  bonus_completed boolean not null default false,
  is_available boolean not null default false,
  issue_date text,
  code text not null unique,
  student_name text,
  student_email text,
  signatory_name text,
  signatory_role text,
  description text,
  delivery_message text,
  release_window text,
  lessons jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.certificate_rules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  course_title text not null,
  turma text not null,
  hours text,
  minimum_lessons integer not null default 0,
  bonus_included boolean not null default false,
  signatory_name text,
  signatory_role text,
  delivery_message text,
  release_window text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table if exists public.profiles add column if not exists full_name text;
alter table if exists public.profiles add column if not exists role text;
alter table if exists public.profiles add column if not exists access_level text;
alter table if exists public.profiles add column if not exists status text;
alter table if exists public.profiles add column if not exists turma text;

alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.banners enable row level security;
alter table public.live_classes enable row level security;
alter table public.certificates enable row level security;
alter table public.certificate_rules enable row level security;

drop policy if exists "public read courses" on public.courses;
create policy "public read courses" on public.courses for select using (true);

drop policy if exists "public read modules" on public.modules;
create policy "public read modules" on public.modules for select using (true);

drop policy if exists "public read lessons" on public.lessons;
create policy "public read lessons" on public.lessons for select using (true);

drop policy if exists "public read banners" on public.banners;
create policy "public read banners" on public.banners for select using (true);

drop policy if exists "public read live classes" on public.live_classes;
create policy "public read live classes" on public.live_classes for select using (true);

drop policy if exists "public read certificates" on public.certificates;
create policy "public read certificates" on public.certificates for select using (true);

drop policy if exists "public read certificate rules" on public.certificate_rules;
create policy "public read certificate rules" on public.certificate_rules for select using (true);
