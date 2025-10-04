# 360ace.net — Agents Guide

This guide defines small, focused project agents that collaborate to deliver the umbrella landing (per PRD) end‑to‑end via incremental PRs.

## Principles
- Stay within the PRD and Implementation Plan.
- Prefer small, reviewable changes with measurements (Lighthouse/Axe results, size deltas).
- Honor accessibility, performance, and security budgets.
- Avoid adding third‑party scripts unless approved by ADR.

## Roles
- Build Agent
  - Scaffold Next.js app, configure Tailwind and shadcn/ui, implement sections and anchors.
  - Integrate brand theme variables; keep client hydration minimal.
- UI/UX Agent
  - Apply spacing, typography, and motion guidelines; ensure reduced‑motion support.
  - Validate color contrast and component states; propose visual refinements.
- Content Agent
  - Curate copy from Tech and Food source files; ensure tone consistency and correct outbound links.
  - Maintain `src/content/` for all editable text.
- Performance & Accessibility Agent
  - Run Lighthouse and Axe; keep within budgets (LCP, CLS, TBT; Axe ≥ 95).
  - Optimize images/JS; enforce lazy/dynamic loading and critical CSS strategy.
- Security Agent
  - Enforce headers (CSP, XFO, Referrer‑Policy, Permissions‑Policy, HSTS where applicable).
  - Implement rate limiting and input validation for `/api/contact` if enabled.
- CI/CD Agent
  - Configure previews, checks, Renovate/Dependabot; keep lockfiles healthy.

## Process
1) Read PRD and IMPLEMENTATION.md.
2) Check `docs/adr/` for decisions; propose ADRs when evaluating libraries/tools.
3) Open small PRs tied to a single concern (e.g., theme variables, Hero section, reduced‑motion switch).
4) Attach evidence: before/after Lighthouse/Axe/Sizes; describe tradeoffs.
5) Merge and iterate until all DoD criteria are met.

## Style & Conventions
- Use Tailwind + CSS variables and shadcn/ui primitives for base components.
- Use Framer Motion for micro‑interactions; guard motion under `prefers-reduced-motion`.
- Optional R3F hero is dynamically imported; ship a static fallback.
- All CTAs link to `https://360ace.tech` or `https://360ace.food`.

