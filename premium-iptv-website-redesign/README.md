# IPTVUS24 website

The site uses Next.js App Router and requires Node.js 20.9 or newer. Start locally with `npm install` and `npm run dev`; run `npm run typecheck` and `npm run build` before deployment.

## Deployment

Deploy `premium-iptv-website-redesign` as a Next.js project on Vercel, not as a static Vite/export build. The review form depends on the `/api/reviews` server route. After deployment, `GET /api/reviews` should return JSON; a 404 means the deployed revision or project root does not include the Next.js app, while a JSON 503 points to Supabase configuration or database setup.

## Supabase setup

The repository includes database migrations, but a Supabase project must be provisioned and its server-only credentials configured before reviews can be stored. Follow the [IPTVUS24 Supabase setup guide](supabase/SETUP.md) to create the project, apply migrations, configure Row Level Security, add Vercel variables, and verify moderation.

Contact requests are saved to `contact_messages` in Supabase. The form collects a WhatsApp number for follow-up, and WhatsApp is the primary contact method. Apply all SQL migrations before deploying schema-dependent changes. The status page displays “not configured” until real status data is entered.

Without Supabase credentials the site remains buildable, but form submissions and live status/review endpoints return an explicit unavailable response. Configure the database before enabling those features in production.

## Google Search Console and analytics

These settings are optional and are read during the Next.js build. Add them in Vercel under **Project → Settings → Environment Variables**, select the environments where they should apply, and redeploy after changing them:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: the verification token shown by Search Console when choosing the HTML tag method. The token is added to the page metadata; complete verification in Search Console after deployment.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: a GA4 measurement ID such as `G-XXXXXXXXXX`.
- `NEXT_PUBLIC_GTM_ID`: a Google Tag Manager container ID such as `GTM-XXXXXXXX`. Both variables are empty by default so development, preview, and fork builds do not emit production analytics events.

Google Tag Manager or direct GA4 scripts are mounted globally through the root layout only in production (`NODE_ENV=production` on the production hostname) and only after a visitor grants analytics consent through the cookie banner. Google Consent Mode initializes before any tag script loads, and advertising consent remains denied. Configure GTM tags for analytics only unless the consent controls and privacy disclosures are extended for additional purposes. Direct GA4 is used when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set without `NEXT_PUBLIC_GTM_ID`; when both are set, GTM takes precedence.

After analytics consent, the site sends `whatsapp_click` events with the page path and CTA location, and `generate_lead` after a contact request is saved. Contact details and message contents are never sent as analytics event parameters. Mark `generate_lead` as a key event in GA4 if it should be reported as a conversion; paid-order attribution still requires recording or importing completed sales.
