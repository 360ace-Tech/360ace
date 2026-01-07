# 360ace.NET — Consultancy Hub (Next.js 15)

Production‑ready Next.js (App Router) site for 360ace.NET with:
- Home hero with responsive CTAs
- Practice pages (Tech, Food)
- Engagement model and Trusted Impact
- Page transitions and preloader with TTL
- Contact form (SMTP + Cloudflare Turnstile)

## Requirements
- Node.js 18+
- npm 10+

## Quick Start
```bash
npm install
npm run dev
# http://localhost:3000
```

Build and run production
```bash
npm run build
npm start
```

## Environment
Copy `.env.local.example` to `.env.local` and set:

- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO
- TURNSTILE_SECRET_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY
- NEXT_PUBLIC_PRELOAD_TTL_MS (default 300000 = 5 minutes)
- NEXT_PUBLIC_LINKEDIN_URL (optional for footer)

Notes
- Contact form posts to `/api/contact` and sends email via SMTP (Gmail App Password supported).
- Cloudflare Turnstile is optional; if keys are provided, tokens are verified server‑side.
- Preloader runs only when TTL has expired; visit state is stored in `localStorage` key `mk_preloaded_ts`.

## Content Model
Editable JSON under `content/`:
- `hero.json` – headline lines, bottom copy, and CTAs (Visit TECH/FOOD URLs)
- `engagement.json` – engagement stages (cards) and intro copy
- `impact.json` – trusted impact title, taglines, stats, logos
- `tech.json`, `food.json` – lists for practice pages

## Structure
```
app/
  layout.tsx, globals.css
  page.tsx                 # Home
  contact/page.tsx         # Contact (Connect with Us + form)
  services/page.tsx        # Engagement model + Trusted Impact
  tech/page.tsx            # Tech practice listings
  food/page.tsx            # Food practice listings
  api/contact/route.ts     # Contact form email + rate limit + Turnstile
components/
  page-transition.tsx, cookie-consent.tsx, site-logo.tsx
content/
  hero.json, engagement.json, impact.json, tech.json, food.json
public/
  logo-dark.png, favicon*, webmanifest
```

## Deployment
Vercel (recommended)
- Create a new project from this repo
- Set `.env` from `.env.local.example`
- Build Command: `npm run build` (Next.js 15)
- Output: `/.vercel/output` (handled by Next)

Self‑host
- `npm run build && npm start`
- Ensure env vars are present at runtime

## Scripts
- `npm run dev` – Start dev server (Turbopack)
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – ESLint with zero warnings
- `npm run typecheck` – TypeScript no‑emit

## Notes
- Cursor effects are disabled on touch devices
- Engagement text animations are disabled to avoid hidden states on client navigation; stats still count up when visible
