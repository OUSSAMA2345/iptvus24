# IPTVUS24 Repository

This repository hosts the **IPTVUS24** Next.js App Router website, Supabase SQL migrations, and operational documentation.

## Repository layout

- [`premium-iptv-website-redesign/`](premium-iptv-website-redesign/) — Next.js application root (`app/`, `src/`, `public/`, `tests/`, and configuration).
- [`premium-iptv-website-redesign/README.md`](premium-iptv-website-redesign/README.md) — Application deployment, environment variable, and analytics documentation.
- [`premium-iptv-website-redesign/supabase/SETUP.md`](premium-iptv-website-redesign/supabase/SETUP.md) — Complete Supabase provisioning, migration order, RLS, and `pg_cron` guide.
- [`premium-iptv-website-redesign/docs/github-actions-ci.yml`](premium-iptv-website-redesign/docs/github-actions-ci.yml) — GitHub Actions CI workflow template (`lint`, `typecheck`, `test`, `build`). Copy or move this file to `.github/workflows/ci.yml` using an account or token with GitHub `workflow` permission to enable automatic PR checks.

## Local development

Requires **Node.js 20.9+** (Node.js 22 LTS recommended). Run all npm commands from `premium-iptv-website-redesign/`:

```bash
cd premium-iptv-website-redesign
cp .env.example .env.local   # Optional locally; required to exercise Supabase API routes
npm ci
npm run dev
```

## Verification commands

Before opening or merging a pull request, run:

```bash
cd premium-iptv-website-redesign
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment note (Vercel)

Set the Vercel project **Framework Preset** to **Next.js** and **Root Directory** to `premium-iptv-website-redesign`. Apply all SQL migrations listed in [`premium-iptv-website-redesign/supabase/SETUP.md`](premium-iptv-website-redesign/supabase/SETUP.md) before enabling the contact, review, or status endpoints in production.
