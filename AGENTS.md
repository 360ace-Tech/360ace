# AGENTS.md - AI Development Agents Guide
## 360ace Unified Landing Page Project

**Version:** 1.0  
**Last Updated:** October 4, 2025  
**Project:** 360ace Next.js Landing Page

---

## Overview

This document defines the AI agents and their responsibilities for building the 360ace unified landing page. Each agent has specific tasks, expertise areas, and deliverables.

---

## Agent Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PROJECT ORCHESTRATOR                  │
│           (Coordinates all agents and phases)            │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│   SETUP AGENT   │  │  DEV AGENT  │  │  QUALITY AGENT  │
│                 │  │             │  │                 │
│ - Environment   │  │ - Components│  │ - Testing       │
│ - Config        │  │ - Features  │  │ - Performance   │
│ - Dependencies  │  │ - Styling   │  │ - Accessibility │
└─────────────────┘  └─────────────┘  └─────────────────┘
```

---

## 1. PROJECT ORCHESTRATOR AGENT

**Role:** Master coordinator and project manager

### Responsibilities
- Coordinate all other agents
- Track progress against timeline
- Manage dependencies between tasks
- Ensure deliverables meet requirements
- Make architectural decisions
- Resolve conflicts between agents

### Key Tasks
1. Initialize project structure
2. Create task breakdown for other agents
3. Monitor milestone completion
4. Generate progress reports
5. Identify blockers and risks
6. Ensure consistency across codebase

### Deliverables
- Project initialization checklist
- Daily progress summaries
- Risk assessments
- Integration verification reports

### Success Criteria
- All phases completed on schedule
- Zero integration conflicts
- All agents working in harmony
- Project meets all PRD requirements

---

## 2. SETUP AGENT

**Role:** Environment and infrastructure specialist

### Responsibilities
- Initialize Next.js 15 project
- Configure all development tools
- Set up project structure
- Install and configure dependencies
- Create configuration files
- Set up Git repository structure

### Key Tasks

#### Phase 1: Project Initialization
```bash
# Tasks to complete:
1. Create Next.js 15 app with TypeScript and Tailwind
2. Initialize Git repository
3. Create branch structure (main, dev, staging)
4. Set up .gitignore properly
```

#### Phase 2: Configuration
```bash
# Configuration files to create:
1. next.config.ts - Next.js configuration
2. tailwind.config.ts - Tailwind CSS setup
3. tsconfig.json - TypeScript strict mode
4. .eslintrc.json - Linting rules
5. .prettierrc - Code formatting
6. .env.local.example - Environment template
```

#### Phase 3: Dependencies Installation
```json
{
  "dependencies": [
    "next@latest",
    "react@latest",
    "react-dom@latest",
    "framer-motion@latest",
    "lucide-react@latest",
    "react-hook-form@latest",
    "zod@latest",
    "@radix-ui/react-*",
    "next-seo@latest",
    "clsx@latest",
    "tailwind-merge@latest"
  ],
  "devDependencies": [
    "@types/node@latest",
    "@types/react@latest",
    "@types/react-dom@latest",
    "typescript@latest",
    "eslint@latest",
    "prettier@latest",
    "autoprefixer@latest",
    "postcss@latest",
    "tailwindcss@latest"
  ]
}
```

#### Phase 4: Project Structure Creation
```
360ace/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── sections/        # Page sections
│   │   ├── shared/          # Reusable components
│   │   └── forms/           # Form components
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── animations.ts
│   ├── hooks/
│   │   ├── useInView.ts
│   │   └── useScrollPosition.ts
│   ├── types/
│   │   └── index.ts
│   └── data/
│       ├── services.ts
│       ├── testimonials.ts
│       └── case-studies.ts
├── public/
│   ├── images/
│   ├── videos/
│   └── fonts/
└── docs/
    ├── PRD.md
    ├── AGENTS.md
    ├── IMPLEMENTATION.md
    └── PROMPT.md
```

#### Phase 5: shadcn/ui Setup
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add required components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add form
npx shadcn@latest add label
npx shadcn@latest add select
```

### Deliverables
- [ ] Fully configured Next.js 15 project
- [ ] All configuration files created and validated
- [ ] Complete project structure
- [ ] All dependencies installed
- [ ] shadcn/ui initialized
- [ ] Git repository set up
- [ ] README.md with setup instructions

### Validation Checklist
```bash
# Run these commands to validate setup:
npm run dev           # Should start dev server
npm run build         # Should build successfully
npm run lint          # Should pass with no errors
tsc --noEmit         # Should have no type errors
```

### Success Criteria
- Project builds without errors
- All TypeScript types validate
- Linting passes with zero warnings
- Dev server runs on localhost:3000
- Hot reload works correctly

---

## 3. DEVELOPMENT AGENT

**Role:** Core feature implementation specialist

### Responsibilities
- Implement all UI components
- Build page sections
- Create reusable components
- Implement animations and interactions
- Handle responsive design
- Integrate with APIs

### Sub-Agents

#### 3.1 COMPONENT BUILDER AGENT

**Focus:** Reusable UI components

**Tasks:**
1. Build base UI components
   - Navigation (sticky header with scroll effects)
   - Footer (multi-column layout)
   - Buttons (multiple variants)
   - Cards (hover effects, animations)
   - Forms (validation, error states)

2. Build shared components
   - AnimatedSection wrapper
   - ScrollProgress indicator
   - LoadingSpinner
   - ErrorBoundary

3. Implement custom hooks
   - useInView (intersection observer)
   - useScrollPosition
   - useMediaQuery
   - useFormValidation

**Deliverables:**
- `/components/ui/*` - All UI components
- `/components/shared/*` - Shared components
- `/hooks/*` - Custom React hooks
- Component documentation (Storybook optional)

---

#### 3.2 SECTION BUILDER AGENT

**Focus:** Page sections implementation

**Tasks:**

**Section 1: Hero Section**
```typescript
// Requirements:
- Full viewport height (100vh)
- Animated gradient background
- Bold headline with gradient text
- Dual CTAs (Food Services / Tech Solutions)
- Scroll indicator animation
- Responsive: Stack CTAs on mobile

// Components needed:
- Hero.tsx
- GradientText.tsx
- ScrollIndicator.tsx
```

**Section 2: About Section**
```typescript
// Requirements:
- Split layout (content + visual)
- Brand story (200-250 words)
- Animated on scroll
- Interactive business structure diagram
- Responsive: Stack on mobile

// Components needed:
- About.tsx
- BusinessDiagram.tsx
```

**Section 3: Services Overview**
```typescript
// Requirements:
- Grid or bento box layout
- 6-8 service cards (3-4 per division)
- Hover effects (lift + glow)
- Animated icons
- Click to learn more

// Components needed:
- Services.tsx
- ServiceCard.tsx
```

**Section 4: Food Division Showcase**
```typescript
// Requirements:
- High-quality food imagery
- Key services list
- Stats/metrics
- Testimonial callout
- CTA to 360ace.food
- Warm color scheme (orange, green)

// Components needed:
- FoodShowcase.tsx
- StatsCounter.tsx
```

**Section 5: Tech Division Showcase**
```typescript
// Requirements:
- Tech-focused visuals
- Key services list
- Stats/metrics
- Code snippet displays
- CTA to 360ace.net/tech
- Cool color scheme (cyan, purple)

// Components needed:
- TechShowcase.tsx
- CodeDisplay.tsx
```

**Section 6: Why Choose Us**
```typescript
// Requirements:
- Feature grid (4-6 items)
- Icons with animations
- Trust indicators
- Certifications/awards

// Components needed:
- WhyChooseUs.tsx
- FeatureCard.tsx
```

**Section 7: Case Studies**
```typescript
// Requirements:
- Horizontal scroll carousel or grid
- 2-3 projects per division
- Image + description + results
- Hover reveals details

// Components needed:
- CaseStudies.tsx
- CaseStudyCard.tsx
- Carousel.tsx
```

**Section 8: Testimonials**
```typescript
// Requirements:
- Auto-rotating carousel
- 5-10 testimonials
- Client photo + quote + details
- Manual navigation
- Pause on hover

// Components needed:
- Testimonials.tsx
- TestimonialCard.tsx
```

**Section 9: Contact Section**
```typescript
// Requirements:
- Contact form (validated)
- Alternative contact methods
- Success/error animations
- GDPR consent checkbox

// Components needed:
- ContactCTA.tsx
- ContactForm.tsx
```

**Deliverables:**
- `/components/sections/*` - All page sections
- Each section responsive and accessible
- Animations implemented
- Content integrated from data files

---

#### 3.3 STYLING AGENT

**Focus:** Design system and styling

**Tasks:**

1. **Tailwind Configuration**
```typescript
// Implement custom theme:
- Brand colors (navy, blue, orange)
- Food division colors
- Tech division colors
- Typography scale
- Spacing system
- Animation keyframes
- Custom utilities
```

2. **Global Styles**
```css
// Create global styles:
- CSS reset
- Typography defaults
- Smooth scrolling
- Focus styles
- Selection styles
- Print styles
```

3. **Animation Library**
```typescript
// Create animation utilities:
- Fade in/out
- Slide up/down/left/right
- Scale animations
- Rotation animations
- Glow effects
- Parallax scrolling
```

4. **Responsive Design**
```typescript
// Ensure all breakpoints work:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px
```

**Deliverables:**
- `tailwind.config.ts` - Complete configuration
- `globals.css` - Global styles
- `/lib/animations.ts` - Animation utilities
- Responsive at all breakpoints

---

#### 3.4 INTEGRATION AGENT

**Focus:** API and external integrations

**Tasks:**

1. **Contact Form API**
```typescript
// Implement:
- POST /api/contact endpoint
- Zod validation
- Email sending (nodemailer)
- Error handling
- Rate limiting
- Spam protection (honeypot)
```

2. **Analytics Integration**
```typescript
// Implement:
- Google Analytics 4 or Vercel Analytics
- Page view tracking
- Event tracking (CTAs, form submissions)
- Scroll depth tracking
- Error tracking
```

3. **SEO Implementation**
```typescript
// Implement:
- Meta tags (layout.tsx)
- Structured data (JSON-LD)
- Sitemap.xml generation
- Robots.txt
- Social media cards (OG, Twitter)
```

**Deliverables:**
- `/app/api/contact/route.ts` - Contact API
- Analytics tracking code
- SEO metadata implementation
- Sitemap and robots.txt

---

### Development Agent Success Criteria
- All components built and tested
- All sections implemented
- Responsive design perfect
- Animations smooth and performant
- Forms functional with validation
- APIs working correctly
- No TypeScript errors
- No console errors

---

## 4. QUALITY ASSURANCE AGENT

**Role:** Testing, optimization, and validation specialist

### Responsibilities
- Write and run tests
- Performance optimization
- Accessibility auditing
- Cross-browser testing
- Bug identification and tracking
- Code quality enforcement

### Sub-Agents

#### 4.1 TESTING AGENT

**Focus:** Automated and manual testing

**Tasks:**

1. **Unit Testing**
```bash
# Set up Jest + React Testing Library
npm install -D jest @testing-library/react @testing-library/jest-dom

# Test coverage targets:
- Utility functions: 100%
- Custom hooks: 100%
- Components: >80%
```

2. **Integration Testing**
```typescript
// Test scenarios:
- Navigation flow
- Form submission end-to-end
- Scroll behaviors
- Animation triggers
- External link navigation
```

3. **E2E Testing**
```bash
# Set up Playwright
npm install -D @playwright/test

# Test user journeys:
- Landing → explore services → contact
- Mobile navigation
- Form submission success/error
- CTA clicks to external sites
```

**Deliverables:**
- Test suite with >80% coverage
- E2E test scenarios
- Test documentation
- CI/CD test integration

---

#### 4.2 PERFORMANCE AGENT

**Focus:** Speed and optimization

**Tasks:**

1. **Image Optimization**
```typescript
// Checklist:
- All images use Next.js Image component
- WebP/AVIF format support
- Blur placeholders implemented
- Lazy loading configured
- Proper sizing attributes
- No layout shift (CLS)
```

2. **Code Optimization**
```typescript
// Checklist:
- Tree shaking enabled
- Dead code eliminated
- Bundle analyzed and optimized
- Dynamic imports for heavy components
- Code splitting verified
```

3. **Performance Monitoring**
```bash
# Run Lighthouse audits:
npm run build
npm run start
# Run Lighthouse on localhost

# Targets:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95
```

4. **Core Web Vitals**
```typescript
// Measure and optimize:
- LCP (Largest Contentful Paint): <2s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1
```

**Deliverables:**
- Lighthouse score >90 (all categories)
- Core Web Vitals passing
- Bundle size <500KB initial load
- Performance optimization report

---

#### 4.3 ACCESSIBILITY AGENT

**Focus:** WCAG 2.1 Level AA compliance

**Tasks:**

1. **Automated Testing**
```bash
# Install axe-core
npm install -D @axe-core/react

# Run automated scans
# Fix all detected issues
```

2. **Manual Testing**
```typescript
// Test checklist:
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus indicators visible
- [ ] Screen reader compatible (NVDA, JAWS)
- [ ] Color contrast >4.5:1
- [ ] Alt text on all images
- [ ] Form labels associated
- [ ] ARIA attributes correct
- [ ] Heading hierarchy proper
- [ ] Skip navigation link
```

3. **Accessibility Features**
```typescript
// Implement:
- Focus trap in mobile menu
- Keyboard shortcuts documented
- Reduced motion support (prefers-reduced-motion)
- High contrast mode support
```

**Deliverables:**
- Zero critical accessibility issues
- WCAG 2.1 Level AA compliance
- Accessibility audit report
- Documentation of features

---

#### 4.4 COMPATIBILITY AGENT

**Focus:** Cross-browser and device testing

**Tasks:**

1. **Browser Testing**
```
Desktop (1920x1080, 1440x900):
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Mobile (375x667, 414x896):
- [ ] iOS Safari (iPhone 14)
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet

Tablet (1024x768):
- [ ] iPad Safari
- [ ] Chrome Tablet
```

2. **Visual Regression Testing**
```bash
# Set up visual testing
npm install -D @percy/cli @percy/playwright

# Capture screenshots across:
- All breakpoints
- All browsers
- Key user flows
```

**Deliverables:**
- Cross-browser compatibility report
- Device testing matrix completed
- Visual regression test suite
- Bug reports and fixes

---

### Quality Agent Success Criteria
- Test coverage >80%
- Lighthouse scores >90
- Zero accessibility violations
- All browsers working perfectly
- Core Web Vitals passing
- No critical bugs

---

## 5. DOCUMENTATION AGENT

**Role:** Documentation and knowledge management

### Responsibilities
- Create comprehensive documentation
- Maintain code comments
- Generate API documentation
- Create user guides
- Update README files

### Tasks

1. **Technical Documentation**
```markdown
# Documents to create:
- SETUP.md - Installation and setup guide
- ARCHITECTURE.md - System architecture
- COMPONENTS.md - Component documentation
- API.md - API endpoint documentation
- DEPLOYMENT.md - Deployment procedures
```

2. **Code Documentation**
```typescript
// Standards:
- JSDoc comments for all functions
- Component prop documentation
- Complex logic explanations
- TODO/FIXME tracking
```

3. **User Documentation**
```markdown
# Documents to create:
- CONTENT_GUIDE.md - How to update content
- MAINTENANCE.md - Ongoing maintenance tasks
- TROUBLESHOOTING.md - Common issues and solutions
```

### Deliverables
- Complete documentation suite
- Well-commented code
- README with quick start
- Troubleshooting guide

---

## 6. DEPLOYMENT AGENT

**Role:** Build, deployment, and DevOps

### Responsibilities
- Configure build process
- Set up deployment pipeline
- Manage environments
- Configure monitoring
- Handle releases

### Tasks

1. **Build Configuration**
```bash
# Optimize build:
- Enable production optimizations
- Configure image optimization
- Set up caching strategies
- Minimize bundle size
```

2. **Deployment Setup**
```bash
# Vercel deployment:
1. Connect GitHub repository
2. Configure environment variables
3. Set up preview deployments
4. Configure production domain
5. Enable analytics
```

3. **Environment Management**
```bash
# Environments:
- Development (local)
- Staging (staging.360ace.net)
- Production (360ace.net)

# Environment variables for each
```

4. **Monitoring Setup**
```bash
# Configure:
- Error tracking (Sentry optional)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring
- Alert thresholds
```

### Deliverables
- Working CI/CD pipeline
- All environments configured
- Monitoring dashboards active
- Rollback procedures documented

---

## Agent Communication Protocol

### Daily Standup (Async)
Each agent reports:
1. What was completed yesterday
2. What's planned for today
3. Any blockers or dependencies

### Code Review Process
```
1. Developer Agent creates feature branch
2. Implements feature with tests
3. Quality Agent reviews and tests
4. Documentation Agent adds docs
5. Project Orchestrator approves merge
```

### Handoff Protocol
```
Setup Agent → Development Agent
- Environment ready
- Dependencies installed
- Structure created

Development Agent → Quality Agent
- Features implemented
- Self-tested
- Ready for QA

Quality Agent → Deployment Agent
- All tests passing
- Performance optimized
- Ready for deployment
```

---

## Success Metrics for Agents

### Overall Project Success
- [ ] Delivered on time (7 weeks)
- [ ] All PRD requirements met
- [ ] Lighthouse scores >90
- [ ] Zero critical bugs
- [ ] Deployment successful
- [ ] Stakeholder approval

### Individual Agent Success
**Setup Agent:**
- Environment setup in <4 hours
- Zero configuration issues

**Development Agent:**
- All components functional
- Code quality score >8/10
- TypeScript strict mode passing

**Quality Agent:**
- Test coverage >80%
- All QA checks passing
- Performance targets met

**Documentation Agent:**
- All docs complete and accurate
- Zero documentation gaps

**Deployment Agent:**
- Zero-downtime deployment
- All environments stable

---

## Emergency Procedures

### Critical Bug Found
```
1. Deployment Agent: Immediately rollback if in production
2. Development Agent: Isolate and fix bug
3. Quality Agent: Verify fix
4. Project Orchestrator: Approve hotfix deployment
```

### Performance Regression
```
1. Performance Agent: Identify regression source
2. Development Agent: Optimize problematic code
3. Quality Agent: Verify improvements
4. Deployment Agent: Deploy fix
```

### Accessibility Violation
```
1. Accessibility Agent: Document violation
2. Development Agent: Implement fix
3. Accessibility Agent: Verify compliance
4. Deploy immediately (critical issue)
```

---

## Tools and Resources

### Development Tools
- **IDE:** VS Code (recommended extensions listed in docs)
- **Version Control:** Git + GitHub
- **Package Manager:** npm or yarn
- **Browser DevTools:** Chrome DevTools, React DevTools

### Testing Tools
- **Unit/Integration:** Jest + React Testing Library
- **E2E:** Playwright
- **Accessibility:** axe DevTools, WAVE
- **Performance:** Lighthouse, WebPageTest

### Deployment Tools
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics or Google Analytics 4
- **Monitoring:** Vercel Dashboard

### Communication
- **Project Tracking:** GitHub Projects or Jira
- **Documentation:** Markdown files in /docs folder
- **Code Review:** GitHub Pull Requests

---

## Conclusion

This agent architecture ensures:
- ✅ Clear separation of concerns
- ✅ Parallel workflow capability
- ✅ Quality at every stage
- ✅ Comprehensive coverage
- ✅ Efficient collaboration
- ✅ Successful project delivery

Each agent should refer to the PRD.md for detailed requirements and IMPLEMENTATION.md for technical specifications.

**Next Step:** Use PROMPT.md to activate agents and begin development.

---

**Document Status:** Ready for Agent Activation  
**Last Reviewed:** October 4, 2025  
**Next Review:** After each major milestone