# IPTVUS24 website

The site uses Next.js App Router and requires Node.js 20.9 or newer. Start locally with `npm install` and `npm run dev`; run `npm run typecheck` and `npm run build` before deployment.

## Deployment

Deploy `premium-iptv-website-redesign` as a Next.js project on Vercel, not as a static Vite/export build. The review form depends on the `/api/reviews` server route. After deployment, `GET /api/reviews` should return JSON; a 404 means the deployed revision or project root does not include the Next.js app, while a JSON 503 points to Supabase configuration or database setup.

## Supabase setup

The repository includes database migrations, but a Supabase project must be provisioned and its server-only credentials configured before reviews can be stored. Follow the [IPTVUS24 Supabase setup guide](supabase/SETUP.md) to create the project, apply migrations, configure Row Level Security, add Vercel variables, and verify moderation.

Contact requests are saved to `contact_messages`; the application does not send email notifications. Monitor this table or connect an operator-controlled notification workflow before advertising the form as a monitored inbox. The status page displays “not configured” until real status data is entered.

Without Supabase credentials the site remains buildable, but form submissions and live status/review endpoints return an explicit unavailable response. Configure the database before enabling those features in production.

## Google Search Console and analytics

These settings are optional and are read during the Next.js build. Add them in Vercel under **Project → Settings → Environment Variables**, select the environments where they should apply, and redeploy after changing them:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: the verification token shown by Search Console when choosing the HTML tag method. The token is added to the page metadata; complete verification in Search Console after deployment.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: a GA4 measurement ID such as `G-XXXXXXXXXX`.
- `NEXT_PUBLIC_GTM_ID`: a Google Tag Manager container ID. The site defaults to `GTM-MHW925PF`; set this variable to override it, or set it to an empty value to disable GTM.

The official `GoogleTagManager` component from `@next/third-parties/google` is mounted globally through the root layout. Analytics scripts are loaded only after a visitor grants analytics consent through the cookie banner. Advertising consent remains denied. Configure GTM tags for analytics only unless the consent controls and privacy disclosures are extended for additional purposes. Direct GA4 is used only when GTM is disabled and a GA measurement ID is configured.
