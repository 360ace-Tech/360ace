# Implementation Plan — 360ace Unified Consultancy (Tech + Food)

This plan translates the PRD (`docs/PRD-360ace.md`) into concrete steps to build a Next.js site at the repository root that unifies 360ace‑Tech and 360ace‑Food under 360ace.net.

## Targets
- Framework: Next.js (App Router, RSC)
- TypeScript: strict mode
- Styling/UI: Tailwind CSS + shadcn/ui (Radix) + CVA
- Animations: Framer Motion (primary); GSAP/ScrollTrigger (optional)
- 3D: React Three Fiber + drei (optional subtle hero) with fallbacks
- Content: Local JSON/TS for homepage sections only (no blog/insights on hub)
- SEO: Next metadata + JSON‑LD helpers; dynamic OG (optional)
- Forms: Route Handlers + Zod + spam protections; email via Resend/SendGrid
- QA: ESLint, Prettier, typecheck, Playwright, Lighthouse CI
- Delivery: Vercel (previews + prod), Renovate/Dependabot

## Branch Strategy
- Create `revamp` as the long‑lived feature branch; protect `main`.
- Flow: feature/* → PR → `revamp` → QA → `develop` → UAT → `main`.

## Directory Layout (target)
```
app/
  (core)/
    layout.tsx
    providers.tsx
  page.tsx             # Home
  consulting/
    page.tsx           # Overview (optional)
    tech/redirect.tsx  # or next.config redirect to 360ace.tech
    food/redirect.tsx  # or next.config redirect to 360ace.food
  contact/page.tsx
  legal/privacy/page.tsx
  legal/terms/page.tsx
  api/contact/route.ts
components/
  layout/              # SiteShell, header, footer
  sections/            # Services, Process, Testimonials, etc.
  templates/           # NotFound, LegalPage, UnderConstruction
  ui/                  # shadcn/ui components
  motion/              # Page transitions, motion primitives
  three/               # R3F hero (optional)
lib/
public/
styles/
docs/
  adr/
```

## Phase 0 — Repo Hygiene & Baseline
1) Create branch `revamp` and enable required PR checks.
2) Add/confirm ESLint, Prettier, `tsconfig.json`, Husky + lint‑staged.
3) Add `docs/adr/` folder; seed ADR 0001 (UI Platform & Theming).

## Phase 1 — Scaffold Next.js at Root
1) Initialize Next.js app at repo root (`package.json`, `app/`, `tsconfig.json`).
2) Install base deps:
   - `next`, `react`, `react-dom`, `typescript`, `@types/react`
   - Tailwind: `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/typography`
   - shadcn/ui: `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`
   - Motion: `framer-motion`
   - 3D (optional): `three`, `@react-three/fiber`, `@react-three/drei`
   - Forms: `zod`, `react-hook-form`, `@hookform/resolvers`
   - SEO/OG: `next-seo` (optional), `@vercel/og`
   - QA: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `playwright`
3) Initialize Tailwind config and global CSS.
4) Initialize shadcn/ui and generate core components: Button, Input, Dialog, Sheet, Tabs, Accordion, Tooltip, Toast.
5) Create `styles/tokens.css` for brand CSS variables (mapped from 360ace theme) and import into `app/globals.css`.

## Phase 2 — Layout, Navigation, Theming
1) Create `components/layout/site-shell.tsx`, `navigation/site-header.tsx`, and `navigation/site-footer.tsx`.
2) Implement light/dark mode and reduced‑motion preference (`prefers-reduced-motion`), with a user toggle.
3) Add page transition wrapper in `components/motion/page-transition.tsx`.

## Phase 3 — Content
1) Create lightweight JSON/TS content definitions for homepage modules (Tech highlights, Food highlights, Process, Differentiators/TrustedBy, Testimonials, CTAs).
2) No blog/insights, no Contentlayer on hub.
3) Ensure all “Learn more” links route to 360ace.tech or 360ace.food.

## Phase 4 — Routes & Pages
1) Home: brand hero (optional R3F), overview cards for Tech/Food with CTAs; testimonials/clients; CTA band.
2) Consulting overview (optional): explain practice areas with outbound CTAs only (no deep content on hub).
3) Add Next.js redirects:
   - `/consulting/tech` → https://360ace.tech
   - `/consulting/food` → https://360ace.food
4) Legal: privacy and terms templates.
5) Contact: form with Zod validation, route handler, spam protection; send email via provider.

## Phase 5 — Motion & 3D
1) Framer Motion: page transitions, section reveals, micro‑interactions (buttons/cards).
2) Optional GSAP + ScrollTrigger for scroll sequences; avoid regressions on a11y/perf.
3) R3F hero: light‑weight scene; dynamic import; device capability check; fallback image for reduced motion.

## Phase 6 — SEO, Analytics, Security
1) Next metadata per route; JSON‑LD for Organization and WebSite.
2) Optional OG images for hub pages.
3) Add `robots.txt` and `sitemap.xml` for hub routes only.
4) Add security headers (CSP, Referrer‑Policy, Permissions‑Policy, Frame‑Ancestors).
5) Analytics: Vercel Analytics or Plausible; Sentry for error monitoring.

## Phase 7 — Testing & CI/CD
1) Playwright E2E smoke (home, consulting redirect links, contact form).
2) Lighthouse CI with budgets for Home and Consulting.
3) Add GitHub Actions (or equivalent) for lint, typecheck, E2E (smoke), Lighthouse CI.
4) Configure Vercel preview deployments on PRs. Require green checks.

## Phase 8 — Redirects & UAT
1) Verify outbound link targets and Next redirects; ensure canonical URLs.
2) Cross‑browser + responsive audit; Axe accessibility pass; screen reader checks.
3) UAT on preview URLs; sign‑off on copy and flows.
4) Promote `revamp` → `develop` → `main`.

## Agents & Research Tasks
- UI Agent: set up tokens, shadcn/ui, Storybook; propose component patterns; measure bundle size.
- UX Agent: finalize IA, wording, nav states, reduced‑motion patterns; validate forms and flows.
- Motion/3D Agent: prototypes for hero and transitions; FPS/bundle budget; fallbacks.
- Content Agent: curate succinct hub copy from practice landings; validate outbound links.
- SEO Agent: metadata, JSON‑LD validation, sitemap/robots; internal linking; Lighthouse proof.
- QA Agent: build E2E suite; track perf/a11y regressions; maintain acceptance gates.

All agents must research best practices at their stage, document ADRs, and validate changes via dev runs/builds. No mistakes; fix all errors prior to merge.

## Command Cheatsheet
```
# Install core deps
npm i next react react-dom typescript @types/react \
  tailwindcss postcss autoprefixer @tailwindcss/typography \
  class-variance-authority clsx tailwind-merge lucide-react \
  framer-motion three @react-three/fiber @react-three/drei \
  react-hook-form zod @hookform/resolvers @vercel/og

# Dev/QA
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  prettier playwright lighthouse-ci

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input dialog sheet tabs accordion tooltip toast

# Run
npm run dev
```

## Acceptance Gates (must pass before release)
- Perf: LCP < 2.5s, CLS < 0.1, TBT < 200ms (p75 mobile).
- A11y: Axe ≥ 95; keyboard nav; reduced motion honored.
- SEO: metadata/JSON‑LD valid; Lighthouse SEO ≥ 95; OG images render (if used).
- Redirects and outbound links validated to 360ace.tech and 360ace.food.
- CI/CD: all checks green; error‑free dev/build logs.
