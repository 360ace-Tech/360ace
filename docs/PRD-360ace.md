# Product Requirements Document (PRD) — 360ace.net Compound Consultancy

## Project Title
360ace — Unified Consultancy Website (Tech + Food) on Next.js

## Objective
Create a single, modern website for 360ace that unifies 360ace‑Tech and 360ace‑Food as consultancy offerings under the 360ace brand. The site should provide a premium, credible, and high‑performance experience, support rich content, and enable rapid iteration with a strong CI/CD pipeline.

## Brand & Theme
- Brand: Use the existing 360ace.net color theme and visual language as the foundation.
- Theme tokens (CSS variables): establish brand‑level tokens for colors, spacing, typography, radius, elevation. Extract from current `360ace/assets/css/styles.css` where feasible (e.g., `--hue: 152` palette) and normalize to a token set for Tailwind CSS + CSS variables.
- Sub‑brand accents: optional, light‑touch accents to differentiate Tech vs. Food sections while staying within 360ace brand (e.g., subtle border/gradient or icon tint). Avoid creating competing palettes.

## Audience
- B2B decision makers, founders, heads of engineering/IT (Tech) and quality/operations leads in food manufacturing, SMEs, NGOs (Food).
- Researchers, partners, and talent interested in 360ace’s thought leadership.

## Business Goals
- Position 360ace as a unified consultancy with distinct Tech and Food practices.
- Increase qualified leads via clear service pages and frictionless contact/scheduling.
- Consolidate and grow Insights (blog/case studies), improving SEO and organic discovery.
- Improve delivery velocity, reliability, and measurability (Core Web Vitals, accessibility, analytics).

## Success Metrics
- Lead performance: +30% contact conversions within 90 days post‑launch.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, TBT < 200ms (p75 mobile).
- Accessibility: Axe score ≥ 95 on key pages; WCAG 2.2 AA conformance.
- SEO: Lighthouse SEO ≥ 95; valid structured data; index coverage clean.
- Reliability: 0 critical errors in production (Sentry) in first 4 weeks.

## Information Architecture
- Primary
  - Home (`/`)
  - Consulting (`/consulting`)
    - Tech (`/consulting/tech`): services, differentiators, process, testimonials
    - Food (`/consulting/food`): services, differentiators, process, testimonials
  - Insights (`/insights`): unified blog/case studies with tags and filters (e.g., Tech, Food)
  - About (`/about`): company, team, mission, brand promise
  - Contact (`/contact`): inquiry form, optional scheduling widget
  - Legal (`/legal/privacy`, `/legal/terms`)
- Secondary
  - Case studies (optional phase): `/insights/case-studies/[slug]`
  - Services detail pages (optional): `/services/[slug]`
  - RSS feed: `/rss.xml`

## Content Strategy
- Merge existing Tech blog posts (Markdown/MDX in `360ace-Tech/content/blog`) and Food resources (`360ace-Food/content`) into a single content system (Contentlayer2 + MDX + JSON as needed).
- Apply consistent frontmatter: `title`, `date`, `author`, `tags`, `summary`, `hero`, `draft`, `canonical`.
- Tag taxonomy: `tech`, `food`, `devops`, `cloud`, `quality-assurance`, etc. Enable filtering, related posts, and per‑tag pages.
- Content templates:
  - Blog post (MD/MDX) with ToC, code highlighting, callouts.
  - Case study (metrics, problem → solution → impact, quotes, CTA).
  - Service page sections (hero, features, FAQs, CTAs).

## Functional Requirements
- Global navigation with clear Consulting split (Tech, Food) and strong CTAs.
- Home page: unified hero (brand‑level), value prop, combined offerings overview with links to Tech/Food.
- Consulting pages (Tech, Food): service clusters, differentiators, process timeline, testimonials, CTA band.
- Insights hub: search, tags, filters; per‑post pages with SEO metadata and social share cards; RSS feed.
- Contact form: client + server validation (Zod), spam protection (hCaptcha/reCAPTCHA or honeypot + rate limit), email notification.
- Theming: brand tokens; light/dark mode; respects `prefers-reduced-motion`.
- Motion/3D: tasteful hero and micro‑interactions; graceful fallbacks; lazy/dynamic loading.
- Accessibility: skip links, focus management, keyboard nav, contrast compliance.

## Non‑Functional Requirements
- Performance budgets (p75 mobile): LCP < 2.5s, CLS < 0.1, TBT < 200ms.
- Accessibility: WCAG 2.2 AA, Axe ≥ 95.
- SEO: canonical URLs, sitemaps, robots, JSON‑LD (`Organization`, `BreadcrumbList`, `BlogPosting`).
- Security: strict CSP, security headers, rate limiting on APIs; secrets via env.
- Privacy: cookie‑less analytics by default (e.g., Vercel Analytics/Plausible); GDPR friendly.

## Technical Architecture (Recommended)
- Framework: Next.js (latest stable, App Router, RSC) + TypeScript strict mode.
- Styling & Design System: Tailwind CSS + shadcn/ui (Radix primitives); Tailwind Variants (CVA) for component variants; CSS variables for theme tokens.
- Motion: Framer Motion for page transitions and micro‑interactions; GSAP/ScrollTrigger optional for complex scroll‑driven sequences.
- 3D: React Three Fiber + drei for subtle hero visuals; feature‑flag with reduced‑motion handling.
- Content: MDX + Contentlayer2; images under `public/` and rendered via `next/image`.
- Search: FlexSearch client‑side initially; adapter path for Algolia/Typesense if needed.
- Forms: Route Handlers, Zod validation, anti‑spam, email via Resend/SendGrid (env‑based).
- SEO: Next metadata API + JSON‑LD helpers; dynamic OG images via `@vercel/og`.
- Testing/QA: Vitest/Jest + Testing Library; Playwright E2E; Lighthouse CI budgets; ESLint + Prettier; typecheck in CI.
- Delivery: Vercel (previews, ISR/Edge); Renovate/Dependabot; Changesets for versioned components if extracted.

## Library Options (evaluate; pick best‑fit)
- UI/Design Systems: shadcn/ui, Radix UI, Tailwind CSS, MUI, Chakra UI, HeroUI, Once UI, Storybook (docs).
- Animation/Motion: Framer Motion, GSAP + ScrollTrigger, React Spring, Anime.js, React Awesome Reveal, Locomotive Scroll.
- 3D/VFX: Three.js, React Three Fiber, drei.
- Styling/Theming: Tailwind Variants (CVA), CSS Variables, Emotion, Stitches, Vanilla Extract, CSS Modules.
- UX Enhancements: Lenis (smooth scroll), Barba.js (page transitions), Lottie React.

Decision bias: prefer Tailwind + shadcn/ui + Radix as the accessible, performance‑friendly base; Framer Motion as the default motion layer; R3F/drei for selective 3D; Lenis for smooth scrolling when it does not harm accessibility.

## Research Gates & ADRs
Create ADRs in `docs/adr/` for each major decision. At minimum:
1) UI Platform & Theming (0001)
2) Content pipeline (contentlayer vs. alternatives)
3) Motion/3D approach and fallbacks
4) Search mechanism (client vs. hosted)
5) Analytics/Observability

Each ADR includes: problem, options, decision, rationale, performance/a11y impacts, date. Re‑validate before build freeze.

## Migration Plan
- 360ace‑Tech: migrate `content/blog` and any reusable components (layout, navigation, templates) after code review and adaptation to shared design system.
- 360ace‑Food: migrate `content/*.json` schema and MDX, mapping to unified `content/` models. Convert JSON to TypeScript types; keep authoring flow simple.
- 360ace static site: extract brand tokens, images, and any copy worth keeping; add redirects if legacy URLs exist.
- Images: relocate to `public/` with consistent paths; optimize (WebP/AVIF), add LQIP if valuable.
- Redirects: preserve backlinks; canonicalize new slugs.

## Accessibility & UX Principles
- Motion respect: honor `prefers-reduced-motion`; add a visible motion toggle.
- Forms: clear labels, error messages, success states; keyboard and screen reader friendly.
- Navigation: consistent sticky header; logical tab order; focus traps only when needed; skip‑to‑content.

## SEO & Social
- Per‑page meta and Open Graph; dynamic OG image generation.
- JSON‑LD for organization, breadcrumbs, blog posts, and (optionally) services.
- RSS/Atom feed for Insights.

## Security & Privacy
- Security headers: CSP (with nonces), Frame‑Ancestors, Referrer‑Policy, Permissions‑Policy, HSTS (at edge/platform).
- API protection: Zod validation, rate limiting, basic spam defenses.
- Privacy‑first analytics with opt‑in for any tracking cookies.

## Environments & CI/CD
- Branching: `revamp` feature branch; PRs only. Promote to `develop` after QA, then `main` after UAT.
- CI checks: lint, typecheck, unit, E2E smoke, Lighthouse CI with budgets.
- Deploy: Vercel for previews and production. Secrets via platform envs.

## Agents & Responsibilities (can be parallelized)
- UI Agent: design tokens, components, shadcn/ui integration, Storybook docs.
- UX Agent: IA, nav flows, forms, copy hierarchy, reduced‑motion experience.
- Motion/3D Agent: page transitions, micro‑interactions, R3F scene optimization, fallbacks.
- Content Agent: migration, templates, taxonomy, metadata quality.
- SEO Agent: metadata, JSON‑LD, robots/sitemaps, internal linking; validates in CI.
- QA Agent: Playwright/Lighthouse pipelines, a11y audits, cross‑browser checks.
- Each agent must research best practices at their stage, document ADRs, and validate changes via dev runs/builds. No mistakes; fix all errors before merge.

## Acceptance Criteria (Launch‑ready)
- All success metrics targets met or exceeded.
- Navigation and flows validated on mobile/desktop and screen readers.
- Insights content migrated; tag pages working; RSS generated.
- Contact form works with server validation and email delivery in staging.
- CI/CD green on all required checks; preview/UAT sign‑off complete.

