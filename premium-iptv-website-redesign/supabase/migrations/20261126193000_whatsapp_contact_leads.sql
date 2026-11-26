alter table public.contact_messages
  alter column email drop not null;

alter table public.contact_messages
  add column if not exists whatsapp_number text
    check (whatsapp_number is null or char_length(whatsapp_number) between 7 and 32);
