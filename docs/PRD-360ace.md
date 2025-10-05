# Product Requirements Document (PRD) — 360ace.net Compound Consultancy

## Project Title
360ace — Unified Consultancy Hub (Tech + Food) on Next.js

## Objective
Build a single 360ace.net hub that spotlights both consultancy practices (360ace‑Tech and 360ace‑Food) and routes visitors to the dedicated practice sites for deep content and engagement. No blog/insights merge on the hub. The hub focuses on brand story, value, and a clear comparison of the two practices with strong CTAs linking to each practice.

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
  - Home (`/`): umbrella landing combining highlights of Tech and Food practices.
  - Consulting (`/consulting`): optional overview page summarizing both practices with outbound links.
  - About (`/about`): company overview and brand promise (optional phase).
  - Contact (`/contact`): central inquiry with routing options.
  - Legal (`/legal/privacy`, `/legal/terms`).
- Link‑out strategy
  - Tech deep dives → https://360ace.tech
  - Food deep dives → https://360ace.food
  - No Insights/Blog pages on the hub.

## Content Strategy
- Do not merge blogs/insights. Editorial content remains on practice sites.
- Hub copy is concise and sourced from practice landing pages:
  - 360ace‑Tech: Services, Process, Differentiators, Testimonials, CTA themes.
  - 360ace‑Food: Hero tone, Trusted logos/stats, Services Grid, Process Timeline, Expertise, Testimonials.
- Use short blurbs and bullet highlights with clear “Explore Tech” / “Explore Food” CTAs.

## Functional Requirements
- Navigation with two primary CTAs: Explore Tech and Explore Food.
- Home page modules:
  - Brand hero (umbrella) with two clear paths (Tech, Food).
  - “What we do” snapshot for each practice.
    - Tech: Cloud Architecture & Migration, DevOps/SRE, IaC, Platform Engineering/Kubernetes, Observability, Security.
    - Food: Training & Capability, Quality Systems, Regulatory & Audit Readiness, QA Partnerships, Research & Product Development, Conference/Insight Support.
  - Unified process (Assess → Design → Implement → Monitor → Elevate).
  - Credibility band: Differentiators + Trusted‑By/Stats.
  - Short testimonials and final CTA band.
- All deep links route to practice sites (360ace.tech / 360ace.food).
- Central contact form with server validation and optional practice routing.
- Theming/motion/a11y as per brand standards.

## Non‑Functional Requirements
- Performance budgets (p75 mobile): LCP < 2.5s, CLS < 0.1, TBT < 200ms.
- Accessibility: WCAG 2.2 AA, Axe ≥ 95.
- SEO: canonical URLs, sitemaps, robots, JSON‑LD (`Organization`, `BreadcrumbList`, `BlogPosting`).
- Security: strict CSP, security headers, rate limiting on APIs; secrets via env.
- Privacy: cookie‑less analytics by default (e.g., Vercel Analytics/Plausible); GDPR friendly.

## Technical Architecture (Recommended)
- Framework: Next.js (App Router, RSC) + TypeScript strict.
- Styling & Design System: Tailwind CSS + shadcn/ui (Radix) + CVA; CSS variables for theme tokens.
- Motion/3D: Framer Motion; optional R3F hero with graceful fallbacks.
- Content: No blog/insights in hub. Use local JSON/TS content for homepage modules; images via `next/image`.
- Forms: Route Handlers + Zod; anti‑spam; email via provider.
- SEO: Metadata API + JSON‑LD (`Organization`, `WebSite`); outbound link strategy; avoid duplicate canonicals.
- QA/CI: ESLint/Prettier, typecheck, Playwright smoke, Lighthouse CI; Vercel previews.

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
- No merge of blogs or insights.
- Extract brand tokens and any reusable visuals only.
- Define outbound links from hub modules to specific destinations on 360ace.tech and 360ace.food.
- Add redirects only for legacy hub URLs if needed.

## Accessibility & UX Principles
- Motion respect: honor `prefers-reduced-motion`; add a visible motion toggle.
- Forms: clear labels, error messages, success states; keyboard and screen reader friendly.
- Navigation: consistent sticky header; logical tab order; focus traps only when needed; skip‑to‑content.

## SEO & Social
- Per‑page meta and Open Graph for hub pages.
- JSON‑LD for organization and website; no blog schema on hub.
- No RSS/Atom on hub; sitemaps for hub pages only.

## Security & Privacy
- Security headers: CSP (with nonces), Frame‑Ancestors, Referrer‑Policy, Permissions‑Policy, HSTS (at edge/platform).
- API protection: Zod validation, rate limiting, basic spam defenses.
- Privacy‑first analytics with opt‑in for any tracking cookies.

## Environments & CI/CD
- Branching: `revamp` feature branch; PRs only. Promote to `develop` after QA, then `main` after UAT.
- CI checks: lint, typecheck, unit, E2E smoke, Lighthouse CI with budgets.
- Deploy: Vercel for previews and production. Secrets via platform envs.

- UI Agent: tokens, components, shadcn/ui integration, Storybook docs.
- UX Agent: IA, nav flows, copy hierarchy, reduced‑motion experience.
- Motion/3D Agent: transitions, micro‑interactions, hero effects + fallbacks.
- Content Agent: curate succinct hub copy from practice landings; ensure accuracy of outbound links.
- SEO Agent: metadata, JSON‑LD, robots/sitemaps; cross‑site linking strategy; validates in CI.
- QA Agent: Playwright/Lighthouse pipelines, a11y audits, cross‑browser checks.
- Each agent researches best practices, documents ADRs, and validates via dev runs/builds.

## Acceptance Criteria (Launch‑ready)
- All success metrics targets met or exceeded.
- Navigation and flows validated on mobile/desktop and screen readers.
- Hub homepage accurately reflects both practices; all deep links route to practice sites.
- Contact form works with server validation and email delivery in staging.
- CI/CD green on all required checks; preview/UAT sign‑off complete.
