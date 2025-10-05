# 360ace Consultancy Hub

A Next.js 15 (App Router) experience that introduces the unified 360ace consultancy hub. The site highlights the two specialist practices — [360ace.Tech](https://360ace.tech) and [360ace.Food](https://360ace.food) — and directs visitors to the practice sites for deep engagement.

## Tech Stack
- Next.js 15 with the App Router and Turbopack dev server
- TypeScript (strict), Tailwind CSS v4 tokens, custom design system primitives
- shadcn-inspired UI components using `class-variance-authority`
- Framer Motion (hero micro-interactions) with `prefers-reduced-motion` support
- React Hook Form + Zod validation for the contact workflow

## Local Development
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to view the site.

## Quality Gates
- `npm run lint` – ESLint (Next.js + TypeScript) with `--max-warnings=0`
- `npm run typecheck` – TypeScript strict mode
- `npm run build` – Production build with Turbopack

## Project Structure
```
app/
  page.tsx                 # Home (hero, practices, process, testimonials)
  consulting/page.tsx      # Overview with outbound CTAs to practice sites
  contact/page.tsx         # Hub contact form
  legal/*                  # Privacy & Terms templates
  api/contact/route.ts     # Contact form handler with Zod validation + rate limit
components/
  layout/                  # Shell, header, footer
  sections/                # Home page sections
  forms/                   # Contact form
  ui/                      # Button, inputs, toggles
lib/
  hub-content.ts           # Curated copy for the hub modules
styles/
  tokens.css               # Brand color + typography tokens
```

## Environment & Deployment
- Configure email delivery for the contact route via environment variables when connecting Resend/SendGrid.
- Add security headers (CSP, Permissions-Policy, Referrer-Policy) via your hosting platform (e.g., Vercel middleware).
- Update `metadataBase` in `app/layout.tsx` if the production hostname changes.

## Roadmap
- Expand shadcn/ui component coverage and Storybook documentation
- Add analytics & error monitoring (Vercel Analytics / Sentry)
- Automate Lighthouse and Playwright smoke checks in CI
