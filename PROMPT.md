# PROMPT.md - AI Assistant Activation Guide
## 360ace Unified Landing Page Development

**Version:** 1.0  
**Date:** October 4, 2025  
**Purpose:** Guide AI coding assistants through the complete development process

---

## 🎯 Mission Statement

You are an expert Next.js developer tasked with building a state-of-the-art landing page for 360ace - a company that operates both food services (360ace.food) and technology services (360ace.net). This single-page landing site will serve as the unified gateway to both divisions.

---

## 📋 Before You Start

### Required Documents
Read these documents in order:
1. **PRD.md** - Complete project requirements and specifications
2. **AGENTS.md** - Agent architecture and responsibilities
3. **IMPLEMENTATION.md** - Technical implementation guide

### Required Context
- **Project Type:** Next.js 15 single-page landing website
- **Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Timeline:** 7 weeks from setup to deployment
- **Target:** Modern, high-performance, accessible, conversion-optimized

---

## 🚀 Development Phases

Follow these phases in order. Complete each phase fully before moving to the next.

---

## PHASE 1: PROJECT SETUP

### Objective
Initialize the Next.js 15 project with all required configurations and dependencies.

### Your Tasks

1. **Create the Next.js project:**
```bash
npx create-next-app@latest 360ace --typescript --tailwind --app --eslint
cd 360ace
```

2. **Install all dependencies:**
```bash
# Core dependencies
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers/zod clsx tailwind-merge next-seo nodemailer

# Dev dependencies
npm install -D @types/nodemailer @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

3. **Initialize shadcn/ui:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card input textarea form label select
```

4. **Create project structure:**
```bash
mkdir -p src/components/{ui,sections,shared,forms}
mkdir -p src/{lib,hooks,types,data}
mkdir -p public/{images,videos,fonts}
mkdir -p docs
```

5. **Create configuration files:**
   - Copy `next.config.ts` from IMPLEMENTATION.md
   - Copy `tailwind.config.ts` from IMPLEMENTATION.md
   - Update `tsconfig.json` with strict mode
   - Create `.env.local.example`
   - Create `.prettierrc` and `.eslintrc.json`

6. **Create utility files:**
   - `src/lib/utils.ts` - cn() function
   - `src/lib/constants.ts` - Site configuration
   - `src/types/index.ts` - TypeScript types

7. **Initialize Git:**
```bash
git init
git add .
git commit -m "Initial project setup"
```

### Validation
Run these commands to verify setup:
```bash
npm run dev      # Should start without errors
npm run build    # Should build successfully
npm run lint     # Should pass
tsc --noEmit     # Should have no type errors
```

### Deliverable
✅ Fully configured Next.js 15 project ready for development

---

## PHASE 2: CORE COMPONENTS

### Objective
Build reusable components and custom hooks that will be used throughout the site.

### Your Tasks

1. **Create custom hooks:**
   - `src/hooks/useInView.ts` - Intersection observer hook
   - `src/hooks/useScrollPosition.ts` - Scroll tracking hook
   
   Reference IMPLEMENTATION.md for complete code.

2. **Build shared components:**
   - `src/components/shared/Navigation.tsx` - Sticky navigation with mobile menu
   - `src/components/shared/Footer.tsx` - Multi-column footer
   - `src/components/shared/ScrollProgress.tsx` - Scroll indicator
   - `src/components/shared/AnimatedSection.tsx` - Animation wrapper
   
   Reference IMPLEMENTATION.md for complete code.

3. **Test each component:**
   - Verify Navigation sticks on scroll
   - Test mobile menu open/close
   - Verify ScrollProgress updates
   - Test AnimatedSection triggers

### Deliverable
✅ All shared components working and tested

---

## PHASE 3: PAGE SECTIONS - PART 1

### Objective
Build the first set of page sections (Hero, About, Services).

### Your Tasks

1. **Build Hero Section (`src/components/sections/Hero.tsx`):**
   - Full-screen height with gradient background
   - Animated gradient text for "Flavor" and "Innovation"
   - Two prominent CTAs linking to food and tech sites
   - Scroll indicator with bounce animation
   - Responsive: Stack CTAs on mobile
   
   Reference IMPLEMENTATION.md for starter code, enhance with:
   - Animated background blobs
   - Smooth fade-in on load
   - Hover effects on CTAs

2. **Build About Section (`src/components/sections/About.tsx`):**
   - Split layout: content on left, visual on right
   - Company story (150-200 words)
   - Key stats (years in business, clients served, etc.)
   - Fade-in animation on scroll
   - Responsive: Stack on mobile

3. **Build Services Section (`src/components/sections/Services.tsx`):**
   - Grid or bento box layout
   - Service cards for both divisions (3-4 each)
   - Hover effects: lift and glow
   - Icons from lucide-react
   - Click to expand or link to more info

4. **Create data files:**
   - `src/data/services.ts` - Service information
   - Reference IMPLEMENTATION.md structure

### Deliverable
✅ Hero, About, and Services sections complete and responsive

---

## PHASE 4: PAGE SECTIONS - PART 2

### Objective
Build division-specific showcase sections.

### Your Tasks

1. **Build Food Showcase (`src/components/sections/FoodShowcase.tsx`):**
   - Warm color scheme (orange, green, cream)
   - High-quality food imagery placeholders
   - List of key services
   - Stats/metrics display
   - Call-out testimonial
   - CTA button to 360ace.food (opens in new tab)
   - Responsive with stacked layout on mobile

2. **Build Tech Showcase (`src/components/sections/TechShowcase.tsx`):**
   - Cool color scheme (cyan, purple, gray)
   - Tech-focused visuals (code snippets, dashboards)
   - List of key services
   - Stats/metrics display
   - Animated code display (optional)
   - CTA button to 360ace.net/tech (opens in new tab)
   - Responsive with stacked layout on mobile

3. **Ensure visual differentiation:**
   - Food section feels warm, inviting, culinary
   - Tech section feels modern, cutting-edge, professional

### Deliverable
✅ Both division showcases complete with distinct identities

---

## PHASE 5: PAGE SECTIONS - PART 3

### Objective
Build supporting sections (Why Choose Us, Case Studies, Testimonials).

### Your Tasks

1. **Build Why Choose Us (`src/components/sections/WhyChooseUs.tsx`):**
   - Feature grid (4-6 items)
   - Icon + headline + description for each
   - Trust indicators (certifications, awards)
   - Stagger animation on scroll

2. **Build Case Studies (`src/components/sections/CaseStudies.tsx`):**
   - Horizontal scroll or grid layout
   - 2-3 case studies per division
   - Card with image, title, brief description, results
   - Hover reveals more details
   - "View Full Case Study" link (can be placeholder)

3. **Build Testimonials (`src/components/sections/Testimonials.tsx`):**
   - Carousel or grid display
   - Auto-rotation (optional)
   - Manual navigation controls
   - Client photo + quote + name + title + company
   - Mix of food and tech clients

4. **Create data files:**
   - `src/data/testimonials.ts` - Testimonial data
   - `src/data/case-studies.ts` - Case study data

### Deliverable
✅ All supporting sections complete and animated

---

## PHASE 6: CONTACT & FORMS

### Objective
Implement functional contact form with validation and email integration.

### Your Tasks

1. **Build Contact Section (`src/components/sections/ContactCTA.tsx`):**
   - Compelling headline
   - Contact form integration
   - Alternative contact methods (email, phone)
   - Contrasting background

2. **Build Contact Form (`src/components/forms/ContactForm.tsx`):**
   - Fields: Name*, Email*, Phone, Interest*, Message*, Consent*
   - Real-time validation with react-hook-form and zod
   - Error states with clear messages
   - Success state with animation
   - Loading state during submission
   - Reference IMPLEMENTATION.md for complete code

3. **Create API endpoint (`src/app/api/contact/route.ts`):**
   - POST endpoint for form submission
   - Zod validation
   - Email sending with nodemailer
   - Error handling
   - Rate limiting (optional)
   - Reference IMPLEMENTATION.md for complete code

4. **Configure email:**
   - Set up SMTP credentials in `.env.local`
   - Test email sending
   - Verify emails arrive correctly formatted

### Validation
- Submit form with valid data → Success message
- Submit form with invalid data → Error messages
- Submit form without consent → Validation error
- Check inbox for test emails

### Deliverable
✅ Fully functional contact form with email integration

---

## PHASE 7: PAGE ASSEMBLY

### Objective
Assemble all sections into the main page with proper layout and metadata.

### Your Tasks

1. **Update `src/app/page.tsx`:**
   - Import all sections
   - Arrange in logical order:
     - Hero
     - About
     - Services
     - Food Showcase
     - Tech Showcase
     - Why Choose Us
     - Case Studies
     - Testimonials
     - Contact
   - Add proper IDs for navigation anchors
   - Ensure spacing is consistent

2. **Update `src/app/layout.tsx`:**
   - Add comprehensive metadata
   - OpenGraph tags
   - Twitter cards
   - Structured data (JSON-LD)
   - Reference IMPLEMENTATION.md for complete code

3. **Create SEO files:**
   - `src/app/sitemap.ts` - XML sitemap
   - `src/app/robots.ts` - Robots.txt
   - Reference IMPLEMENTATION.md for code

4. **Test navigation:**
   - Click all nav items → Smooth scroll to sections
   - Mobile menu works correctly
   - External links open in new tabs

### Deliverable
✅ Complete single-page website with all sections

---

## PHASE 8: STYLING & ANIMATIONS

### Objective
Polish the design with consistent styling and smooth animations.

### Your Tasks

1. **Review and enhance Tailwind config:**
   - Verify all custom colors are defined
   - Check animation keyframes
   - Add any missing utilities

2. **Add global styles (`src/app/globals.css`):**
   - Custom scrollbar styling
   - Selection colors
   - Focus states
   - Print styles (optional)
   - Reference IMPLEMENTATION.md for styles

3. **Implement animations:**
   - Scroll-triggered animations (use AnimatedSection)
   - Hover effects on all interactive elements
   - Loading states
   - Transition states

4. **Ensure consistent spacing:**
   - Section padding: py-20 (desktop), py-12 (mobile)
   - Container max-width consistent
   - Element spacing follows design system

5. **Responsive refinement:**
   - Test all breakpoints (375px, 768px, 1024px, 1440px, 1920px)
   - Ensure no horizontal scroll
   - Check all text is readable
   - Verify touch targets are 44x44px minimum

### Deliverable
✅ Polished, consistent, beautifully animated site

---

## PHASE 9: OPTIMIZATION

### Objective
Optimize for performance, achieving Lighthouse scores >90.

### Your Tasks

1. **Image Optimization:**
   - Convert all images to WebP/AVIF
   - Add blur placeholders
   - Implement lazy loading
   - Ensure all use Next.js Image component
   - Optimize image sizes (<200KB each)

2. **Code Optimization:**
   - Remove unused code
   - Minimize bundle size
   - Implement code splitting
   - Dynamic imports for heavy components
   - Tree-shake unused imports

3. **Font Optimization:**
   - Use variable fonts
   - Implement font-display: swap
   - Preload critical fonts
   - Subset fonts if needed

4. **Run Lighthouse audit:**
```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse
# Run audit for Performance, Accessibility, Best Practices, SEO
```

5. **Fix issues until:**
   - Performance: >90
   - Accessibility: >95
   - Best Practices: >90
   - SEO: >95

6. **Measure Core Web Vitals:**
   - LCP: <2 seconds
   - FID: <100ms
   - CLS: <0.1

### Deliverable
✅ Lighthouse scores >90 across all categories

---

## PHASE 10: ACCESSIBILITY

### Objective
Ensure WCAG 2.1 Level AA compliance.

### Your Tasks

1. **Automated testing:**
   - Install axe DevTools browser extension
   - Run scan on page
   - Fix all critical and serious issues

2. **Manual testing:**
   - [ ] Keyboard navigation works (Tab, Enter, Esc)
   - [ ] Focus indicators are visible
   - [ ] All images have alt text
   - [ ] Form labels are associated
   - [ ] Heading hierarchy is correct (h1 > h2 > h3)
   - [ ] Color contrast is sufficient (>4.5:1)
   - [ ] No keyboard traps

3. **Screen reader testing:**
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Ensure all content is announced
   - Verify navigation makes sense
   - Test form submission flow

4. **ARIA implementation:**
   - Add ARIA labels where needed
   - Use semantic HTML first
   - Only add ARIA when necessary

### Deliverable
✅ Fully accessible site with zero critical violations

---

## PHASE 11: TESTING

### Objective
Implement comprehensive test coverage.

### Your Tasks

1. **Set up testing:**
```bash
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```
   - Create `jest.config.js` and `jest.setup.js`
   - Reference IMPLEMENTATION.md for configuration

2. **Write unit tests:**
   - Test utility functions (cn, etc.)
   - Test custom hooks (useInView, useScrollPosition)
   - Target >80% coverage

3. **Write component tests:**
   - Test Navigation (rendering, mobile menu)
   - Test ContactForm (validation, submission)
   - Test at least 3 other components

4. **Write integration tests:**
   - Test navigation flow
   - Test form submission end-to-end
   - Test scroll behaviors

5. **Cross-browser testing:**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)
   - [ ] Mobile Safari (iOS)
   - [ ] Chrome Mobile (Android)

### Deliverable
✅ Test suite with >80% coverage, all tests passing

---

## PHASE 12: DEPLOYMENT

### Objective
Deploy to Vercel and configure production environment.

### Your Tasks

1. **Prepare for deployment:**
   - Verify all environment variables documented
   - Ensure `.env.local.example` is up to date
   - Run final build: `npm run build`
   - Test production build locally: `npm run start`

2. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

3. **Configure Vercel:**
   - Set environment variables in dashboard
   - Configure custom domain (360ace.net)
   - Enable Vercel Analytics
   - Set up preview deployments

4. **Post-deployment verification:**
   - [ ] Site loads correctly
   - [ ] All sections render properly
   - [ ] Forms submit successfully
   - [ ] External links work
   - [ ] Analytics tracking works
   - [ ] SSL certificate active
   - [ ] No console errors

5. **Set up monitoring:**
   - Configure uptime monitoring
   - Set up error tracking (optional: Sentry)
   - Configure performance monitoring

### Deliverable
✅ Live production site at 360ace.net

---

## 🎯 Quality Checklist

Before considering the project complete, verify:

### Functionality
- [ ] All navigation links work (smooth scroll)
- [ ] Mobile menu opens/closes correctly
- [ ] All CTAs link to correct destinations
- [ ] Contact form validates properly
- [ ] Form submission sends emails
- [ ] Success/error states display correctly
- [ ] All external links open in new tabs

### Design
- [ ] Consistent spacing throughout
- [ ] Typography is readable and consistent
- [ ] Colors match design system
- [ ] Hover states on all interactive elements
- [ ] Animations are smooth (60fps)
- [ ] No layout shift during page load
- [ ] Responsive at all breakpoints

### Performance
- [ ] Lighthouse Performance >90
- [ ] LCP <2 seconds
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] Bundle size <500KB initial load
- [ ] All images optimized

### Accessibility
- [ ] Lighthouse Accessibility >95
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA
- [ ] All images have alt text
- [ ] Forms have proper labels

### SEO
- [ ] Lighthouse SEO >95
- [ ] Meta tags present and correct
- [ ] Structured data validates
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Social cards display correctly

### Code Quality
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] ESLint passes
- [ ] Code is well-commented
- [ ] Test coverage >80%
- [ ] All tests passing

---

## 🚨 Important Notes

### DO:
✅ Follow the phases in order
✅ Test after each phase
✅ Commit code regularly
✅ Use TypeScript strict mode
✅ Write semantic HTML
✅ Optimize images before adding
✅ Test accessibility continuously
✅ Ask questions when unclear

### DON'T:
❌ Skip phases or rush
❌ Use `any` type in TypeScript
❌ Use regular `<img>` tags (use Next.js Image)
❌ Hardcode content (use data files)
❌ Ignore console warnings
❌ Skip testing
❌ Deploy without verification
❌ Use browser localStorage in artifacts

---

## 📚 Reference Documents

- **PRD.md**: Full project requirements and specifications
- **AGENTS.md**: Agent roles and responsibilities
- **IMPLEMENTATION.md**: Technical code examples and patterns

---

## 🆘 Troubleshooting

If you encounter issues:

1. **Check IMPLEMENTATION.md** for troubleshooting guide
2. **Review Next.js documentation** for framework-specific issues
3. **Verify environment variables** are set correctly
4. **Clear .next folder** and rebuild: `rm -rf .next && npm run build`
5. **Check node_modules**: Delete and reinstall if issues persist

---

## ✅ Success Criteria

The project is complete when:

1. All 12 phases are finished
2. Quality checklist is 100% complete
3. Lighthouse scores >90 across all categories
4. Site is live on 360ace.net
5. All tests passing
6. Documentation is complete
7. Stakeholders approve

---

## 