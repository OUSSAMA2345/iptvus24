revoke all on public.reviews from anon, authenticated;
grant select on public.reviews to anon, authenticated;

drop policy if exists reviews_read_approved on public.reviews;
create policy reviews_read_approved
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved');
