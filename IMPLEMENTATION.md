# 360ace.net — Implementation Plan

This plan operationalizes the PRD for a single‑page Next.js landing at 360ace.net, themed with 360ace’s existing palette and designed to route visitors to 360ace.Tech and 360ace.Food.

## Outcomes

- One accessible, performant, secure landing (`/`) with anchors for sections.
- Shared brand theme using existing tokens (Food) mapped to CSS variables (Tech) for consistency.
- All CTAs link externally to the two practice sites.
- Optional contact handler with validation, rate‑limit, and spam protection.

## 0) Research Tracks (parallel; produce brief ADRs)

For each category, perform a quick landscape review and record a short ADR with: Problem, Options, Decision, Rationale, Impact.

🎨 UI / Design Systems

- Evaluate: shadcn/ui (Radix primitives), HeroUI, Once UI, Chakra UI, Radix UI (raw), MUI (Material UI), Tailwind CSS + Storybook for docs.
- Decision guide: Accessibility defaults (a11y), theming flexibility, bundle weight, long‑term maintainability, learning curve, and SSR/RSC compatibility.
- Likely default: Tailwind + shadcn/ui (Radix) for accessible primitives; Storybook for documentation. Consider HeroUI/Once UI selectively for ready‑made patterns.

🌀 Animation / Motion

- Evaluate: Framer Motion, GSAP (with ScrollTrigger), React Spring, Anime.js, React Awesome Reveal, Locomotive Scroll.
- Decision guide: Reduced‑motion support, SSR compatibility, performance on mobile, scroll‑based storytelling needs.
- Likely default: Framer Motion for micro‑interactions and reveals; GSAP + ScrollTrigger optional for advanced scroll choreography; Lenis (see below) for smooth scrolling if needed. Avoid heavy parallax patterns that impact CLS.

🧱 3D / Visual Effects

- Evaluate: Three.js (core), React Three Fiber (R3F), Drei.
- Decision guide: Impact on LCP, device capability detection, graceful fallback, and design value.
- Likely default: React Three Fiber + Drei with a dynamic import and a static gradient fallback. Keep it optional and disabled for `prefers-reduced-motion`.

🎨 Styling & Theming

- Evaluate: Tailwind Variants / CVA (Class Variance Authority), Vanilla Extract, Stitches, Emotion, CSS Modules / CSS Variables (Design Tokens).
- Decision guide: Type‑safe variants, DX, bundle cost, interoperability with Tailwind.
- Likely default: Tailwind + CSS Variables for tokens; CVA or `tailwind-variants` for component variants.

🧭 UX Enhancements / Interaction

- Evaluate: Lenis (smooth scrolling), Barba.js (page transitions), Lottie React (vector animations).
- Decision guide: App Router compatibility, a11y, performance, and progressive enhancement.
- Likely default: Lenis optional and gated (no essential content pinned to scroll); Lottie React for lightweight vector animations with reduced‑motion guard; avoid Barba (Next App Router + Framer Motion is sufficient).

Deliverable: `docs/adr/` entries for each track and chosen default.

## 1) Scaffold & Foundations

- Create a new Next.js 15 app at the top‑level app directory.
- Configure TypeScript, Tailwind, and shadcn/ui. Add `tailwindcss-animate` plugin.
- Establish brand CSS variables and Tailwind mapping (from PRD’s Brand Theme & Tokens).
- Self‑host a variable font and set `font-display: swap`.
- Add base layout with `<html className="bg-background text-foreground">` and theme toggle (dark/class).

Example: `globals.css` variables (HSL values from PRD)

```
@layer base {
  :root { /* …brand variables as in PRD… */ }
  .dark { /* …dark variables as in PRD… */ }
}
```

Tailwind mapping (Tech pattern)

```
extend: {
  colors: {
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
    secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
    muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
    accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
    card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
  },
  borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
}
```

Security headers (`next.config.mjs`)

```
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
  // Strict CSP with nonces/hashes set at runtime for any inline segments
  { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; upgrade-insecure-requests" },
];
```

## 2) Sections & Content

Build server components with minimal client hydration. All “Learn more” CTAs point to 360ace.Tech and 360ace.Food.

- `Hero`: umbrella headline, two primary CTAs (Tech, Food), subtle gradient/particles, reduced‑motion guard.
- `Pillars`: Tech and Food cards (name, one‑liner, 3 outcomes, CTA). Copy curated from:
  - Tech: `360ace-website/360ace-Tech/lib/site-content.ts`
  - Food: `360ace-website/360ace-Food/content/services.json`
- `Services Highlights`: 3–4 cards per pillar with short summaries.
- `Process`: Harmonized steps (Plan/Assess → Design → Build/Implement → Run/Monitor → Elevate).
- `Proof`: Combined differentiators + 1–2 testimonials.
- `Insights Teaser`: 3 titles linking to Tech blog / Food insights (static, no runtime fetches).
- `Contact`: Simple form with practice selector (Tech | Food | Both). Server handler optional.
- `Footer`: Links to both sites, legal (hosted on Tech), socials.

## 3) Motion, 3D, and Interaction

- Micro‑interactions: Framer Motion for section reveals and button/CTA interactions. Add `prefers-reduced-motion` checks.
- Optional 3D: R3F + Drei for a light hero background; dynamic import and static fallback. Disable for reduced motion.
- Smooth scroll: Consider Lenis; keep anchor links functional without it; do not gate content on scroll position.
- Scroll choreography: If needed, use GSAP + ScrollTrigger, gated behind reduced‑motion and with careful performance testing.

## 4) Contact API (optional)

- Route: `app/api/contact/route.ts` with Zod validation and IP‑based token bucket rate limit.
- Spam: Honeypot field + hCaptcha if abuse detected. No secrets in client.
- Delivery: Resend or MailerSend; env vars only in server runtime (`.env.local`).

## 5) Accessibility & Performance QA

- A11y: Axe pass ≥ 95; keyboard nav; visible focus; color contrast checks; forms with proper labels and errors.
- Perf: Lighthouse budgets (LCP < 2.5s, CLS < 0.1, TBT < 200ms). Ensure hero effects are non‑blocking, images optimized, dynamic imports for heavy code.
- SEO: Metadata, canonical, Open Graph, Organization JSON‑LD.

## 6) Delivery & CI/CD

- Vercel deploy with preview links.
- Checks: typecheck, eslint, unit (if any), Playwright smoke on `/`.
- Renovate/Dependabot for dependency hygiene.

## 7) Agents & Automation

Introduce a light agent workflow to accelerate and guard quality.

Files to add

- `agents/AGENTS.md` — roles, scope, style, acceptance checks for each agent.
- `agents/PROJECT_PROMPT.md` — a single orchestrating prompt that sequences end‑to‑end tasks (scaffold → theme → sections → QA → deploy). The prompt directs agents to continue until tasks meet the PRD DoD, opening PRs with diffs and measurements (Lighthouse/Axe) at each stage.

Agent roles

- Build Agent: scaffolding, config, sections, integration.
- UI/UX Agent: tokens, components, spacing, motion, reduced‑motion, responsiveness.
- Security Agent: headers, rate limiting, CSP, dependency policy.
- Performance/A11y Agent: Lighthouse/Axe budgets, image/JS auditing.
- Content Agent: copy curation from source files, link checks.
- CI/CD Agent: previews, checks, envs.

Collaboration

- Each agent produces small PRs referencing ADRs. A Maintainer triages and merges. The Project Prompt coordinates progression and success criteria.

## 8) Task Checklist (condensed)

- [ ] Pick defaults via ADRs in each research track
- [ ] Scaffold Next.js app + Tailwind + shadcn/ui
- [ ] Implement brand variables + Tailwind mapping
- [ ] Build sections (Hero → Footer)
- [ ] Add reduced‑motion guards; optional R3F hero
- [ ] Optional: contact API with Zod + rate limit
- [ ] Add security headers; verify with Observatory
- [ ] A11y/perf passes (Axe/Lighthouse)
- [ ] SEO + JSON‑LD
- [ ] CI/CD + renovate
- [ ] Agents docs + project prompt

## Notes

- Avoid introducing heavy third‑party scripts on 360ace.net; keep analytics off or minimal.
- Keep content constants under `src/content/` for quick edits and future localization.
- If domains differ from `360ace.tech` and `360ace.food`, update CTAs prior to launch.
