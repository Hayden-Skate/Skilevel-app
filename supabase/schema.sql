create extension if not exists "pgcrypto";

create type public.account_role as enum ('student_parent', 'instructor', 'admin');
create type public.sport_type as enum ('ski', 'snowboard');
create type public.run_feeling as enum ('comfortable', 'challenging', 'too_difficult');

create table public.users (
  id uuid primary key default gen_random_uuid(), clerk_user_id text not null unique,
  email text not null, role account_role not null default 'student_parent', created_at timestamptz not null default now()
);
create table public.students (
  id uuid primary key default gen_random_uuid(), owner_user_id uuid not null references public.users(id) on delete cascade,
  name text not null, age smallint check (age between 2 and 120), sport sport_type not null,
  years_experience numeric(4,1) not null default 0, home_mountain text, self_rated_level text,
  profile_photo_path text, share_slug text not null unique default encode(gen_random_bytes(8), 'hex'), is_share_enabled boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.instructors (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references public.users(id) on delete cascade,
  display_name text not null, home_mountain text, certification text, created_at timestamptz not null default now()
);
create table public.mountains (
  id uuid primary key default gen_random_uuid(), name text not null, region text, country_code text,
  source text not null default 'manual', external_id text, latitude numeric, longitude numeric, unique(source, external_id)
);
create table public.trails (
  id uuid primary key default gen_random_uuid(), mountain_id uuid not null references public.mountains(id) on delete cascade,
  name text not null, difficulty text, source text not null default 'manual', external_id text, unique(mountain_id, source, external_id)
);
create table public.mountain_visits (
  id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade,
  mountain_id uuid references public.mountains(id), mountain_name_manual text, visited_on date not null, notes text, created_at timestamptz not null default now(),
  check (mountain_id is not null or mountain_name_manual is not null)
);
create table public.completed_trails (
  id uuid primary key default gen_random_uuid(), visit_id uuid not null references public.mountain_visits(id) on delete cascade,
  trail_id uuid references public.trails(id), trail_name_manual text, difficulty text, feeling run_feeling not null, notes text,
  check (trail_id is not null or trail_name_manual is not null)
);
create table public.ability_ratings (
  id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade,
  terrain_key text not null check (terrain_key in ('greens','blues','blacks','double_blacks','moguls','trees','powder','steeps','terrain_park')),
  confidence smallint not null check (confidence between 1 and 5), rated_at timestamptz not null default now(), unique(student_id, terrain_key)
);
create table public.instructor_notes (
  id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade,
  instructor_id uuid not null references public.instructors(id), lesson_date date not null, mountain_id uuid references public.mountains(id),
  mountain_name_manual text, lesson_type text, skills_observed text, skills_practiced text, recommended_next_steps text,
  suggested_terrain_level text, created_at timestamptz not null default now()
);
create table public.ski_videos (
  id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade,
  uploader_user_id uuid not null references public.users(id), storage_path text not null unique, title text,
  mountain_visit_id uuid references public.mountain_visits(id) on delete set null, captured_on date, notes text,
  created_at timestamptz not null default now()
);

create index mountain_visits_student_date_idx on public.mountain_visits(student_id, visited_on desc);
create index instructor_notes_student_date_idx on public.instructor_notes(student_id, lesson_date desc);
create index ski_videos_student_date_idx on public.ski_videos(student_id, captured_on desc);

alter table public.users enable row level security;
alter table public.students enable row level security;
alter table public.instructors enable row level security;
alter table public.mountain_visits enable row level security;
alter table public.completed_trails enable row level security;
alter table public.ability_ratings enable row level security;
alter table public.instructor_notes enable row level security;
alter table public.ski_videos enable row level security;

-- Clerk JWT `sub` is matched server-side to users.clerk_user_id. Add project-specific RLS policies after configuring the Clerk/Supabase JWT template.
-- Create private Storage buckets named `profile-photos` and `ski-videos`; issue signed URLs from trusted server routes only.
