# IPTVUS24 website

The site uses Next.js App Router and requires Node.js 20.9 or newer. Start locally with `npm install` and `npm run dev`; run `npm run typecheck` and `npm run build` before deployment.

## Supabase setup

The review feature requires a provisioned Supabase project and its migration; this repository cannot create an external project or obtain credentials on your behalf. Follow these steps before testing review submissions.

1. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the Supabase project. Keep the service-role key server-side; never expose it with a `NEXT_PUBLIC_` prefix.
2. Apply `supabase/migrations/20261124000100_trust_features.sql` to the project. It creates private contact, moderation, rate-limit, and service-status tables. The migration uses Supabase's `pg_cron` extension to run the documented retention cleanup daily.
3. Contact requests are saved to `contact_messages`; the application does not send email notifications. Monitor this table or connect an operator-controlled notification workflow before advertising the form as a monitored inbox.
4. Reviews are inserted with `status = 'pending'`. Review the text and change the status to `approved` or `rejected` in the Supabase dashboard. Only approved reviews and their aggregate rating are public.
5. Add a row to `service_status` with `id = 1`, then maintain public incident records and daily availability data in `service_incidents` and `service_uptime_history`. The status page displays “not configured” until real status data is entered; it never invents an uptime percentage.

Without Supabase credentials the site remains buildable, but form submissions and live status/review endpoints return an explicit unavailable response. Configure the database before enabling those features in production.
