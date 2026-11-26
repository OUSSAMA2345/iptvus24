# IPTVUS24 website

The site uses Next.js App Router and requires Node.js 20.9 or newer. Start locally with `npm install` and `npm run dev`; run `npm run typecheck` and `npm run build` before deployment.

## Deployment

Deploy `premium-iptv-website-redesign` as a Next.js project on Vercel, not as a static Vite/export build. The review form depends on the `/api/reviews` server route. After deployment, `GET /api/reviews` should return JSON; a 404 means the deployed revision or project root does not include the Next.js app, while a JSON 503 points to Supabase configuration or database setup.

## Supabase setup

The repository includes database migrations, but a Supabase project must be provisioned and its server-only credentials configured before reviews can be stored. Follow the [IPTVUS24 Supabase setup guide](supabase/SETUP.md) to create the project, apply migrations, configure Row Level Security, add Vercel variables, and verify moderation.

Contact requests are saved to `contact_messages`; the application does not send email notifications. Monitor this table or connect an operator-controlled notification workflow before advertising the form as a monitored inbox. The status page displays “not configured” until real status data is entered.

Without Supabase credentials the site remains buildable, but form submissions and live status/review endpoints return an explicit unavailable response. Configure the database before enabling those features in production.
