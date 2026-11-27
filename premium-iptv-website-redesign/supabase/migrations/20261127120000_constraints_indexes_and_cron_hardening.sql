-- Ensure contact_messages always stores at least one contact method.
alter table public.contact_messages
  drop constraint if exists contact_messages_contact_method_check;

alter table public.contact_messages
  add constraint contact_messages_contact_method_check
  check (email is not null or whatsapp_number is not null);

-- Index pending reviews for moderation queues and scheduled retention cleanup.
create index if not exists reviews_pending_created_idx
  on public.reviews (created_at desc)
  where status = 'pending';

-- Index form_rate_limits window_start for scheduled retention cleanup.
create index if not exists form_rate_limits_window_start_idx
  on public.form_rate_limits (window_start);

-- Remove synchronous retention delete from request-path rate-limit checks;
-- expired rows are purged by public.purge_expired_form_data().
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

  return hits <= p_limit;
end;
$$;

revoke all on function public.consume_form_rate_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_form_rate_limit(text, text, integer, integer) to service_role;

-- Schedule daily retention cleanup when pg_cron is available; degrade gracefully otherwise.
do $$
begin
  begin
    create extension if not exists pg_cron;
  exception
    when others then
      raise notice 'pg_cron could not be enabled automatically (%). Enable pg_cron in Database -> Extensions or run public.purge_expired_form_data() from an external scheduler.', sqlerrm;
  end;

  if exists (select 1 from pg_extension where extname = 'pg_cron')
     and to_regprocedure('cron.schedule(text,text,text)') is not null then
    perform cron.schedule(
      'iptvus24-purge-expired-form-data',
      '17 3 * * *',
      'select public.purge_expired_form_data()'
    );
  else
    raise notice 'pg_cron is unavailable; skipped scheduling iptvus24-purge-expired-form-data. Enable pg_cron or schedule select public.purge_expired_form_data() externally.';
  end if;
exception
  when others then
    raise notice 'Could not schedule iptvus24-purge-expired-form-data via pg_cron (%).', sqlerrm;
end;
$$;
