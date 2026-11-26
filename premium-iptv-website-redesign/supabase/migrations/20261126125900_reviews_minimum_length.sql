alter table public.reviews
  drop constraint if exists reviews_review_text_check;

alter table public.reviews
  drop constraint if exists reviews_review_text_length_check;

alter table public.reviews
  add constraint reviews_review_text_length_check
  check (
    char_length(review_text) between 5 and 1500
    or lower(btrim(review_text)) in ('good', 'nice')
  );
