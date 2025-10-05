# Implementation Plan — 360ace Unified Consultancy (Tech + Food)

This plan translates the PRD (`docs/PRD-360ace.md`) into concrete steps to build a Next.js site at the repository root that unifies 360ace‑Tech and 360ace‑Food under 360ace.net.

## Targets
- Framework: Next.js (latest stable, App Router, RSC)
- TypeScript: strict mode
- Styling/UI: Tailwind CSS + shadcn/ui (Radix primitives) + Tailwind Variants (CVA)
- Animations: Framer Motion (primary); GSAP/ScrollTrigger (optional sequences)
- 3D: React Three Fiber + drei (subtle hero visual, opt‑in, with fallbacks)
- Content: Contentlayer2 + MDX + JSON (for structured blocks)
- Search: FlexSearch (client)
- SEO: Next metadata + JSON‑LD helpers; dynamic OG via `@vercel/og`
- Forms: Route Handlers + Zod + spam protections; email via Resend/SendGrid
- QA: ESLint, Prettier, typecheck, Vitest/Jest + Testing Library, Playwright, Lighthouse CI
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
    page.tsx           # Overview
    tech/page.tsx
    food/page.tsx
  insights/
    page.tsx
    [slug]/page.tsx
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
content/
  blog/
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
   - Content: `contentlayer2`, `next-contentlayer2`, `remark-gfm`, `rehype-pretty-code`
   - Forms: `zod`, `react-hook-form`, `@hookform/resolvers`
   - Search: `flexsearch`
   - SEO/OG: `next-seo` (optional), `@vercel/og`
   - QA: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `vitest` or `jest`, `@testing-library/react`, `playwright`
3) Initialize Tailwind config and global CSS.
4) Initialize shadcn/ui and generate core components: Button, Input, Dialog, Sheet, Tabs, Accordion, Tooltip, Toast.
5) Create `styles/tokens.css` for brand CSS variables (mapped from 360ace theme) and import into `app/globals.css`.

## Phase 2 — Layout, Navigation, Theming
1) Create `components/layout/site-shell.tsx`, `navigation/site-header.tsx`, and `navigation/site-footer.tsx`.
2) Implement light/dark mode and reduced‑motion preference (`prefers-reduced-motion`), with a user toggle.
3) Add page transition wrapper in `components/motion/page-transition.tsx`.

## Phase 3 — Content Pipeline
1) Configure Contentlayer2 schemas for `Post`, and optional `CaseStudy`, `Service`.
2) Build MDX pipeline with `remark-gfm` and `rehype-pretty-code` (Shiki).
3) Migrate:
   - `360ace-Tech/content/blog/*` → `content/blog` (normalize frontmatter, image paths)
   - `360ace-Food/content/*.json` → typed data in `content/` or `src/data/` with TS types
4) Add shortcodes (Callout, Steps, ImageGrid, Quote) for MDX content.

## Phase 4 — Routes & Pages
1) Home: brand hero (optional R3F), overview cards for Tech/Food with CTAs; testimonials/clients; CTA band.
2) Consulting overview: explain practice areas and deep links to Tech/Food.
3) Consulting/Tech and Consulting/Food: service clusters, differentiators, process timeline, testimonials, CTA band. Reuse content mapped from Food’s JSON and Tech’s sections.
4) Insights: index with search and tag filters; post pages with ToC, prev/next.
5) Legal: privacy and terms templates.
6) Contact: form with Zod validation, route handler, spam protection; send email via provider.

## Phase 5 — Motion & 3D
1) Framer Motion: page transitions, section reveals, micro‑interactions (buttons/cards).
2) Optional GSAP + ScrollTrigger for scroll sequences; avoid regressions on a11y/perf.
3) R3F hero: light‑weight scene; dynamic import; device capability check; fallback image for reduced motion.

## Phase 6 — SEO, Analytics, Security
1) Next metadata per route; JSON‑LD for Organization, BreadcrumbList, BlogPosting.
2) Dynamic OG images with `@vercel/og` for posts.
3) Add `robots.txt`, `sitemap.xml`, and RSS feed generation.
4) Add security headers (CSP, Referrer‑Policy, Permissions‑Policy, Frame‑Ancestors).
5) Analytics: Vercel Analytics or Plausible; Sentry for error monitoring.

## Phase 7 — Testing & CI/CD
1) Unit tests (Vitest/Jest + Testing Library) for critical components.
2) Playwright E2E smoke (home, consulting, insights, contact form).
3) Lighthouse CI with budgets for Home, Tech, Food, and a blog post.
4) Add GitHub Actions (or equivalent) for lint, typecheck, unit, E2E (smoke), Lighthouse CI.
5) Configure Vercel preview deployments on PRs. Require green checks.

## Phase 8 — Migration, Redirects, UAT
1) Complete content migration and image optimization; ensure canonical URLs and redirects.
2) Cross‑browser + responsive audit; Axe accessibility pass; screen reader checks.
3) UAT on preview URLs; sign‑off on copy and flows.
4) Promote `revamp` → `develop` → `main`.

## Agents & Research Tasks
- UI Agent: set up tokens, shadcn/ui, Storybook; propose component patterns; measure bundle size.
- UX Agent: finalize IA, wording, nav states, reduced‑motion patterns; validate forms and flows.
- Motion/3D Agent: prototypes for hero and transitions; FPS/bundle budget; fallbacks.
- Content Agent: normalize frontmatter; migrate JSON; ensure tags and related content work.
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
  contentlayer2 next-contentlayer2 remark-gfm rehype-pretty-code \
  react-hook-form zod @hookform/resolvers flexsearch @vercel/og

# Dev/QA
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  prettier vitest @testing-library/react @testing-library/jest-dom \
  playwright lighthouse-ci

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input dialog sheet tabs accordion tooltip toast

# Run
npm run dev
```

## Acceptance Gates (must pass before release)
- Perf: LCP < 2.5s, CLS < 0.1, TBT < 200ms (p75 mobile).
- A11y: Axe ≥ 95; keyboard nav; reduced motion honored.
- SEO: metadata/JSON‑LD valid; Lighthouse SEO ≥ 95; OG images render.
- Content: migration complete; redirects in place; RSS generated.
- CI/CD: all checks green; error‑free dev/build logs.

