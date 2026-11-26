create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(display_name) between 2 and 60),
  rating smallint not null check (rating between 1 and 5),
  review_text text not null check (char_length(review_text) between 20 and 1500),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  moderated_at timestamptz
);

create index if not exists reviews_published_created_idx
  on public.reviews (created_at desc) where status = 'approved';

create or replace function public.set_review_moderated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status is distinct from old.status then
    new.moderated_at := case when new.status = 'pending' then null else now() end;
  end if;
  return new;
end;
$$;

drop trigger if exists reviews_set_moderated_at on public.reviews;
create trigger reviews_set_moderated_at
before update of status on public.reviews
for each row execute function public.set_review_moderated_at();

alter table public.reviews enable row level security;
revoke all on public.reviews from anon, authenticated;
grant all on public.reviews to service_role;

create or replace function public.get_public_review_stats()
returns table (average_rating numeric, review_count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select round(avg(rating)::numeric, 1), count(*)::bigint
  from public.reviews
  where status = 'approved';
$$;

revoke all on function public.get_public_review_stats() from public, anon, authenticated;
grant execute on function public.get_public_review_stats() to service_role;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  subject text not null check (char_length(subject) between 1 and 120),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
grant all on public.contact_messages to service_role;

create table if not exists public.form_rate_limits (
  fingerprint text not null,
  action text not null,
  window_start timestamptz not null,
  hit_count integer not null default 0,
  primary key (fingerprint, action, window_start)
);

alter table public.form_rate_limits enable row level security;
revoke all on public.form_rate_limits from anon, authenticated;
grant all on public.form_rate_limits to service_role;

create or replace function public.consume_form_rate_limit(
  p_fingerprint text,
  p_action text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  bucket timestamptz;
  hits integer;
begin
  if p_limit < 1 or p_window_seconds < 1 or p_action not in ('contact', 'review') then
    raise exception 'Invalid rate limit parameters';
  end if;

  bucket := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  insert into public.form_rate_limits as current_limit (fingerprint, action, window_start, hit_count)
  values (p_fingerprint, p_action, bucket, 1)
  on conflict (fingerprint, action, window_start)
  do update set hit_count = current_limit.hit_count + 1
  returning hit_count into hits;

  delete from public.form_rate_limits where window_start < now() - interval '30 days';
  return hits <= p_limit;
end;
$$;

revoke all on function public.consume_form_rate_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_form_rate_limit(text, text, integer, integer) to service_role;

create table if not exists public.service_status (
  id smallint primary key default 1 check (id = 1),
  status text not null check (status in ('operational', 'degraded', 'outage', 'maintenance')),
  message text not null,
  updated_at timestamptz not null default now(),
  maintenance_start timestamptz,
  maintenance_end timestamptz
);

create table if not exists public.service_incidents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  impact text not null check (impact in ('minor', 'major', 'critical')),
  status text not null check (status in ('investigating', 'identified', 'monitoring', 'resolved')),
  summary text not null,
  started_at timestamptz not null default now(),
  resolved_at timestamptz,
  is_public boolean not null default true
);

create index if not exists service_incidents_public_started_idx
  on public.service_incidents (started_at desc) where is_public;

create table if not exists public.service_uptime_history (
  day date primary key,
  availability_percent numeric(5, 2) check (availability_percent between 0 and 100)
);

alter table public.service_status enable row level security;
alter table public.service_incidents enable row level security;
alter table public.service_uptime_history enable row level security;
revoke all on public.service_status, public.service_incidents, public.service_uptime_history from anon, authenticated;
grant all on public.service_status, public.service_incidents, public.service_uptime_history to service_role;

create or replace function public.purge_expired_form_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.contact_messages where created_at < now() - interval '365 days';
  delete from public.reviews where status = 'pending' and created_at < now() - interval '365 days';
  delete from public.form_rate_limits where window_start < now() - interval '30 days';
end;
$$;

revoke all on function public.purge_expired_form_data() from public, anon, authenticated;
grant execute on function public.purge_expired_form_data() to service_role;

create extension if not exists pg_cron;

select cron.schedule(
  'iptvus24-purge-expired-form-data',
  '17 3 * * *',
  'select public.purge_expired_form_data()'
);
