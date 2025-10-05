# ADR 0001 — UI Platform, Theming, and Interactions

Date: 2025-10-05
Status: Proposed (to ratify at build start)

## Context
360ace is consolidating 360ace‑Tech and 360ace‑Food into a single site at the repo root, adopting the 360ace.net brand theme. The platform must be accessible, performant, scalable, and allow tasteful motion/3D with graceful fallbacks. Existing sub‑projects (Food/Tech) already use Next.js + Tailwind; the main site (legacy) is static.

## Options Considered
1) Tailwind CSS + shadcn/ui (Radix UI primitives) + Tailwind Variants (CVA)
   - Pros: a11y‑first primitives, fast design velocity, theming via CSS vars, low overhead; proven patterns; headless composability.
   - Cons: requires curation to avoid component sprawl; Storybook recommended for docs.

2) Chakra UI or MUI (Material UI)
   - Pros: batteries‑included component sets and themes; fast to assemble screens.
   - Cons: heavier bundles, opinionated styling, theming trade‑offs; harder to match bespoke brand/polish; risk of “library look.”

3) Emotion/Stitches/Vanilla Extract + Radix primitives (no Tailwind)
   - Pros: fine‑grained control; good for design‑systems at scale.
   - Cons: slower delivery; more custom infra; mixed adoption across sub‑projects.

4) Animation stacks
   - Default: Framer Motion for transitions and micro‑interactions.
   - Optional: GSAP + ScrollTrigger for complex scroll sequences; limit scope and ensure reduced‑motion support.

5) 3D/VFX
   - React Three Fiber + drei for subtle hero visuals; dynamic import; fallback imagery; feature‑flag by capability/reduced motion.

## Decision
Adopt Option (1) with Framer Motion as the default motion layer and React Three Fiber + drei for selective 3D. Consider GSAP only where Framer is insufficient for a specific sequence and document via ADR if introduced.

## Rationale
- Accessibility: Radix primitives + shadcn/ui enforce accessible patterns; Tailwind improves consistency & velocity.
- Branding: CSS variables map directly to 360ace tokens; easy to unify sub‑brands.
- Performance: lightweight, tree‑shakable; avoids heavy component frameworks by default.
- Consistency: aligns with existing Tech/Food projects; simpler migration of components.

## Consequences
- Requires a small design‑system layer (tokens, utilities, component docs). Add Storybook for component documentation.
- Motion must honor `prefers-reduced-motion`; add a visible toggle. 3D is strictly opt‑in with graceful fallbacks.
- Establish performance budgets and a11y checks in CI to prevent regressions.

## Implementation Notes
- Tokens: extract from `360ace/assets/css/styles.css` (e.g., `--hue: 152` palette) into `styles/tokens.css`, then map into Tailwind via `tailwind.config.ts`.
- Components: bootstrap shadcn/ui and generate: Button, Input, Dialog, Sheet, Tabs, Accordion, Tooltip, Toast.
- Motion: wrap routes with a page transition; use reveal/micro interactions sparingly; GSAP gated by ADR.
- 3D: `components/three/hero.tsx` with dynamic import, capability check, and static fallback.

