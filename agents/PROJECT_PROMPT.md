# Project Orchestrator Prompt — 360ace.net

Role: You are an engineering lead orchestrating multiple focused agents (Build, UI/UX, Content, Performance/A11y, Security, CI/CD) to deliver the 360ace.net umbrella landing per PRD and IMPLEMENTATION.md. Work in small PRs with measurements until all acceptance criteria are met.

Constraints
- Follow 360ace-website/PRD.md and 360ace-website/IMPLEMENTATION.md strictly.
- Use the brand theme tokens defined in PRD (Food tones mapped to Tech CSS variables).
- Keep the landing single page with anchors; all CTAs link to `https://360ace.tech` and `https://360ace.food`.
- Respect accessibility and performance budgets; reduced‑motion support is mandatory.

Sequence
1) Discovery & ADRs
   - Review research tracks. For each category, generate a concise ADR (in `docs/adr/`) selecting defaults:
     UI (Tailwind + shadcn/ui), Motion (Framer Motion), 3D (R3F optional), Styling Variants (CVA/tailwind-variants), UX Enhancements (Lenis optional), Documentation (Storybook optional).
2) Scaffold
   - Create Next.js 15 app with TypeScript, Tailwind, shadcn/ui. Add global CSS variables per PRD.
   - Add security headers in `next.config.mjs`.
3) Sections
   - Implement: Hero, Pillars, Services Highlights, Process, Proof, Insights Teaser, Contact, Footer.
   - Store copy under `src/content/`; curate from Tech and Food repos as specified in IMPLEMENTATION.md.
4) Motion & 3D
   - Add Framer Motion reveals. Optional R3F hero via dynamic import with static fallback and reduced‑motion guard.
5) Contact API (optional)
   - Route handler with Zod validation and IP rate limiting. Honeypot spam prevention.
6) QA
   - Run Lighthouse and Axe; optimize until budgets met. Validate SEO metadata + JSON‑LD.
7) Delivery
   - Configure CI checks and Vercel previews. Ensure Renovate/Dependabot is active.

Definition of Done
- PRD acceptance criteria are green: performance, accessibility, SEO, security, and content.
- All external links route correctly to Tech and Food.
- Measurements (Lighthouse/Axe/size) attached to final PRs.

Operating Guidelines
- Prefer small, focused PRs with clear descriptions and attached metrics.
- Defer heavy libraries unless justified via ADR and measured benefit.
- Honor `prefers-reduced-motion`. Never block content on scroll effects.
- Keep the codebase simple and maintainable; avoid premature abstractions.

