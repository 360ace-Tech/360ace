# 360ace.net — One‑Page Landing PRD

## Objective

Revamp the current HTML site (`360ace-website/360ace`) into a single, modern Next.js landing page that clearly positions 360ace as the umbrella brand for two specialized practices:

- 360ace.Tech — cloud, platform engineering, DevOps/SRE, and AI‑ready architectures
- 360ace.Food — science‑led food systems quality, regulatory readiness, and training

The one‑pager should communicate the value of the parent brand, summarize both practices with credible proof, and route visitors to the dedicated sites: `https://360ace.tech` and `https://360ace.food` (or their actual production domains).

## Background & Inputs

- Current HTML site: `360ace-website/360ace/index.html` (marketing landing around DevOps/SRE themes).
- Tech Next.js site: `360ace-website/360ace-Tech` (Next.js 15 app with sections, blog, Contentlayer).
- Food Next.js site: `360ace-website/360ace-Food` (Next.js 14 app with sections driven by JSON/MDX content).
- This PRD consolidates messaging and UX from both to a single umbrella landing and sets best‑practice standards for UI, UX, performance, security, and privacy.

## Goals

- Provide a compelling umbrella narrative for 360ace with two clear practice pillars (Tech and Food) and strong calls to action.
- Drive qualified traffic to `360ace.tech` and `360ace.food` for deeper exploration and conversion.
- Deliver a state‑of‑the‑art single page experience with excellent Core Web Vitals, accessibility (WCAG 2.2 AA), and robust security controls.
- Keep implementation maintainable and fast: Next.js (latest), TypeScript, Tailwind, shadcn/ui, and minimal dependencies.

## Non‑Goals

- Building a full blog or multi‑page content system on 360ace.net (blogs live on the two practice sites).
- Implementing a CMS at this stage; content is curated, static, and versioned in Git.
- Complex 3D scenes or effects that reduce performance.

## Audience & Positioning

- Primary: Executives and leaders evaluating technology or food‑systems partners; product and platform leads; quality/regulatory leaders.
- Secondary: Talent, partners, and media seeking a high‑level overview and the right destination site.
- Positioning: 360ace is the mother brand. 360ace.Tech accelerates modern software/platform reliability. 360ace.Food elevates food safety, quality systems, and regulatory readiness.

## Messaging — Value Proposition (Message House)

- Umbrella Promise: Build resilient systems—digital and food—that earn trust and scale with confidence.
- Proof Themes:
  - Tech: Cloud strategy and landing zones, platform engineering and paved paths, SRE operations with measurable reliability, AI‑ready data/ML enablement.
  - Food: Quality systems architecture, GMP/BRC/HACCP readiness, training and capability building, research and product development.
- Voice: Clear, expert, measured, and outcome‑focused. Avoid jargon except where it signals credibility to expert buyers.

## Information Architecture (Single Page)

Sections and their purpose, in order:

1) Hero (Above the fold)

   - Brand: 360ace (mother brand). Strapline and subline that connect both practices.
   - Two primary CTAs: “Explore 360ace.Tech” (link to 360ace.tech) and “Explore 360ace.Food” (link to 360ace.food).
   - Optional tertiary CTA: “Contact” (scroll to contact) or “Compare practices” (scroll to pillar overview).
   - Visual: Elegant gradient field with subtle motion. Optional lightweight 3D background with dynamic import and reduced‑motion support.
2) Pillar Overview — Tech and Food

   - Side‑by‑side or stacked on mobile. Each tile contains: practice name, one‑sentence summary, 3 outcome bullets, “Dive deeper” CTA linking out.
   - Source copy from:
     - Tech: `360ace-website/360ace-Tech/lib/site-content.ts`
     - Food: `360ace-website/360ace-Food/content/services.json` (categories, re‑phrased to outcomes)
3) Services Highlights (dual rails)

   - Tech rail: 3–4 service cards (Cloud Strategy & Architecture; Platform Engineering & DevOps; Site Reliability & Managed Ops; AI & Data Platform Enablement).
   - Food rail: 3–4 service cards (Training & Capability Building; Quality Systems Architecture; Regulatory & Audit Readiness; Research & Product Development).
   - Each card: short summary + “Learn more” linking to the respective site section.
4) Process (harmonized)

   - Unified 5‑step visual that maps both practices:
     - Plan/Assess → Design → Build/Implement → Run/Monitor → Elevate
   - Map to sources:
     - Tech: Plan, Design, Build, Run (site‑content)
     - Food: Assess, Design, Implement, Monitor, Elevate (JSON content)
5) Proof — Differentiators & Testimonials

   - Differentiators: combine Tech’s reliability/velocity/security and Food’s PhD‑led expertise/regulatory stewardship.
   - Testimonials: pull representative quotes (or placeholders) with roles; link to case studies on respective sites when available.
6) Insights Teaser

   - 3 cards per pillar (or 3 total rotating), linking to 360ace.tech/blog and 360ace.food/insights.
   - Include titles only; keep this page fast and static.
7) Contact

   - Single form with a practice selector: “I’m interested in: Tech | Food | Both”.
   - Serverless handler validates with Zod, applies rate‑limiting and spam prevention, and forwards to the right destination email(s).
   - Minimal privacy notice inline; link to privacy/terms on 360ace.tech.
8) Footer

   - Links: 360ace.tech, 360ace.food, Privacy, Terms, Socials.
   - Organization structured data via JSON‑LD on the page.

## Brand Theme & Tokens

Use the existing 360ace color theme to keep brand continuity across the new umbrella landing. Base tokens are derived from 360ace‑Food with variable mapping compatible with 360ace‑Tech.

Canonical brand tokens (from 360ace‑Food tailwind config):

- `midnight` `#142A1C` — deep forest (primary foreground)
- `ember` `#7BBF3F` — brand accent/primary CTA
- `sage` `#3F8F65` — supportive accent/secondary
- `mist` `#F2F7EF` — light background
- `slate` `#1E3A2A` — dark neutral

CSS variable mapping (aligns with Tech’s HSL design system):

```
:root {
  /* Base */
  --background: 96 35% 96%;   /* mist */
  --foreground: 146 29% 12%;  /* midnight */
  --card: 0 0% 100%;
  --card-foreground: 146 29% 12%;
  --muted: 146 15% 92%;
  --muted-foreground: 150 15% 35%;

  /* Brand */
  --primary: 98 47% 50%;      /* ember */
  --primary-foreground: 0 0% 100%;
  --secondary: 155 39% 40%;   /* sage */
  --secondary-foreground: 0 0% 100%;
  --accent: 150 22% 18%;      /* slate */
  --accent-foreground: 0 0% 100%;

  --border: 150 15% 85%;
  --input: 150 15% 85%;
  --ring: 98 47% 50%;
  --radius: 14px; /* echoes Food’s rounded-xl */
}

.dark {
  --background: 150 22% 10%;  /* slate/midnight blend */
  --foreground: 96 35% 96%;   /* mist */
  --card: 150 22% 12%;
  --card-foreground: 96 35% 96%;
  --muted: 150 22% 16%;
  --muted-foreground: 96 14% 80%;
  --primary: 98 47% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 155 39% 40%;
  --secondary-foreground: 0 0% 100%;
  --accent: 150 22% 22%;
  --accent-foreground: 96 35% 96%;
}
```

Notes

- The new landing consumes Tailwind via Tech’s variable strategy while reusing Food’s named hues. We keep an optional “variant accent” utility (like Tech’s `variant-theme-v2`) for subtle hero gradients but default to brand greens to maintain umbrella consistency.
- Fonts and shadows mirror Food’s tone (soft shadow `shadow-brand`, rounded corners) unless contradicted by accessibility testing.

## UX & UI Requirements (State‑of‑the‑Art)

- Visual language: Calm, confident, accessible. Apply the brand tokens above (greens forward) with optional Tech gradient accents for depth. Support light/dark themes.
- Layout: 12‑column grid, generous spacing, visible hierarchy. Keep copy blocks short. Clear CTA contrast and consistent placement.
- Motion: Micro‑interactions with spring easing (200–350ms). Respect `prefers-reduced-motion`; disable heavy effects and 3D. Avoid parallax that harms CLS.
- Navigation: Sticky header with skip link, clear anchors (/#tech, /#food, /#services, /#process, /#insights, /#contact). Keyboard and screen‑reader friendly.
- Typography: Self‑hosted variable font with `font-display: swap`. Preload critical weights; use system fallbacks.
- Images & media: Use `next/image` with priority on hero, responsive sizes, AVIF/WEBP, and lazy load elsewhere.
- Content clarity: Above the fold conveys umbrella message + two pillar choices without scrolling.

## Accessibility

- Target WCAG 2.2 AA. Axe score ≥ 95 on the page.
- Requirements: skip link, visible focus states, color contrast ≥ 4.5:1, labelled form inputs, ARIA only when necessary.
- Motion & seizures: avoid strobing; disable complex motion when reduced motion is set.

## Performance

- Budgets (Mobile, 75th percentile): LCP < 2.5s, CLS < 0.1, TBT < 200ms.
- Practices: static generation for `/`, image optimization, dynamic import for heavy UI/3D, minimal JS, inline critical CSS via Tailwind, avoid render‑blocking fonts.
- Monitor with Lighthouse CI on PRs; size snapshot for JS bundles.

## SEO & Page Communication

- Metadata: unique title/description aligned to umbrella value.
- Structured data: `Organization`, `WebSite`, and `BreadcrumbList` (for anchors as appropriate).
- Sitemap and robots hosted by destination sites; 360ace.net is a single page with canonical URL.
- Open Graph/Twitter cards with branded preview; OG image generated at build time.
- All links to details and blogs point to `https://360ace.tech` and `https://360ace.food` (or actual production domains).

## Security & Privacy

- Security headers via Next config:
  - Strict Content-Security-Policy with nonces/hashes: default-src 'self'; script-src 'self' 'nonce-…' https://vercel.live; style-src 'self' 'nonce-…'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests.
  - `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (disable unnecessary features), `X-Content-Type-Options: nosniff`.
- Contact API hardening: Zod validation, rate limiting (IP + token bucket), spam prevention (honeypot + hCaptcha optional), server‑side email dispatch only, no secrets in client.
- Dependency hygiene: Dependabot/Renovate, lockfile updates, audit in CI. Avoid third‑party scripts; prefer privacy‑friendly analytics (Vercel Analytics or Plausible on destination sites only).
- Privacy: No cookies on 360ace.net. Form privacy notice with link to the primary privacy policy (hosted on 360ace.tech).

## Technical Architecture

- Framework: Next.js (latest stable, App Router, RSC) + TypeScript.
- Rendering: SSG for `/` + static assets; Route Handler for `/api/contact` if included.
- Styling: Tailwind CSS + shadcn/ui primitives for accessible components and tokens shared across sections.
- State: Minimal client state. Use server components where possible; hydrate only where needed.
- Animations: Framer Motion for micro‑interactions; guard with `prefers-reduced-motion`.
- 3D (optional): React Three Fiber for subtle background hero; dynamic import and hard fallback to static gradient.
- Images/Fonts: `next/image`; self‑hosted variable font; preloaded hero image.
- Content sourcing: Hard‑coded content constants derived from the two sites (no runtime fetch). Keep content in `src/content/` for easy updates.

### Proposed Directory Structure

```
app/
  layout.tsx
  page.tsx                      # one-page landing
  api/contact/route.ts          # optional
components/
  sections/                     # hero, pillars, services, process, proof, insights, contact
  ui/                            # buttons, cards, icons
lib/
  security-headers.ts
  rate-limit.ts                 # optional
public/
  og.png                        # generated OG image
src/content/
  pillars.ts                    # text for Tech & Food cards
  services.ts                   # summarized services from both practices
  process.ts                    # unified steps
  testimonials.ts               # sample quotes
styles/
  globals.css
```

## Functional Requirements

1) Single route `/` with anchors: `#tech`, `#food`, `#services`, `#process`, `#insights`, `#contact`.
2) CTAs: All “learn more” links route to external sites (Tech/Food). Use `rel="noopener"`.
3) Contact form: practice selector; server validation; success/error states; optional email delivery via provider (Resend/MailerSend) configured via env.
4) Theme: Light/dark with system default; toggle saved to `localStorage`.
5) Analytics: None on 360ace.net, or minimal Vercel Analytics without cookies; deep analytics on destination sites only.
6) SEO: Page metadata, OG image, Organization JSON‑LD inline.
7) Accessibility: Skip link, keyboard navigation, labelled controls, reduced motion.

## Acceptance Criteria (DoD)

- Content finalized and reviewed for both practices; consistent tone and formatting.
- Lighthouse: ≥ 90 across Performance, Accessibility, Best Practices, SEO; Core Web Vitals budgets met.
- Axe: ≥ 95 on Accessibility; keyboard navigation verified.
- Security: Required headers present; contact API (if enabled) is validated and rate‑limited; zero high‑severity dependency advisories.
- All external links route correctly to `360ace.tech` and `360ace.food` equivalents.
- Documentation added to repo README for local dev, build, deployment, and environment vars.

## Implementation Plan & Timeline

Phase 0 — Discovery (0.5–1 day)

- Confirm destination domains and exact URLs for CTAs.
- Approve copy derived from both sites; identify any missing assets.

Phase 1 — Scaffold & Foundations (1 day)

- Create Next.js 15 app (App Router, TS), Tailwind, shadcn/ui, base tokens, global styles.
- Add security headers; set up OG image generation; add linting and simple Playwright smoke.

Phase 2 — Sections & Content (1–2 days)

- Build sections: Hero, Pillars, Services Highlights, Process, Proof, Insights Teaser, Contact, Footer.
- Migrate curated text into `src/content/` from Tech and Food sources.
- Implement reduced motion guards and lazy/dynamic imports where needed.

Phase 3 — Hardening & QA (1 day)

- Accessibility pass (Axe), performance pass (Lighthouse), link checks, responsive QA across breakpoints.
- Configure contact delivery (if enabled) with envs and rate limiting.

Phase 4 — Launch (0.5 day)

- Deploy to Vercel; connect `360ace.net`.
- Add preview/production checks; document ops and rollback.

## Risks & Mitigations

- 3D/motion performance on low‑end devices → keep effects optional, dynamic, and disabled for reduced motion; provide static fallback.
- Fragmented copy sources → centralize final copy in `src/content/` with an editorial pass and one approver.
- Domain variance (`360ace.food` availability) → confirm production domains early and ensure CTAs point to valid destinations.
- Third‑party drift → minimize external scripts; self‑host fonts; renovate dependencies.

## Metrics & KPIs

- CTR from the hero/pillar CTAs to destination sites.
- Core Web Vitals: LCP, CLS, TBT meeting budgets on mobile.
- Accessibility score (Axe ≥ 95) and zero critical issues.
- Form conversion rate (if contact form is enabled).

## Source Content Mapping (for copy curation)

- Tech content: `360ace-Tech/lib/site-content.ts`
  - Services, process, differentiators, hero copy, testimonials, legal text.
- Food content: `360ace-Food/content/services.json`, `content/process.json`, `content/insights.json`
  - Services categories, 5‑step process, insights titles; hero tone in `src/components/sections/hero.tsx`.
- Legacy HTML references (for narrative cues): `360ace/index.html`

## Open Questions

1) Confirm the final domains to link: are `https://360ace.tech` and `https://360ace.food` the production endpoints, or should we use existing domains (e.g., `360acefood.com`)?
2) Should the umbrella site host a contact form, or should “Contact” CTAs deep‑link to each practice’s contact page?
3) Any brand assets or design kit (logos, color tokens, imagery) to standardize across both practices?
4) Preferred analytics posture on 360ace.net (none vs. Vercel Analytics)?
5) Any compliance requirements (e.g., cookie banner) we must account for based on the destination regions?

---

If you’d like, I can follow up with an IMPLEMENTATION.md (technical tasks, file stubs, and code scaffolding steps) aligned with this PRD.
