# ADR 0002 — Enhanced Motion and Interaction Patterns

Date: 2025-10-11
Status: Accepted

## Context
The initial 360ace hub site has basic fade-in page transitions and simple animations. User feedback requests more fluid, modern interactions that enhance the experience while maintaining accessibility and performance standards. The site should feel polished and engaging with smooth scrolling, sophisticated transitions, and delightful micro-interactions.

## Options Considered

### Smooth Scrolling
1) **Lenis (Studio Freight)** - Industry-standard smooth scroll library
   - Pros: Lightweight, performant, excellent momentum physics, widely adopted
   - Cons: Additional 3KB dependency
2) CSS `scroll-behavior: smooth` - Native browser API
   - Pros: Zero dependencies, simple
   - Cons: Limited control, no momentum, no reduced-motion integration
3) React Spring - Animation library with scroll features
   - Pros: Versatile animation system
   - Cons: Heavier bundle, overkill for scroll alone

### Scroll-Triggered Animations
1) **Framer Motion with useInView** - Built-in hook for intersection observer
   - Pros: Already in project, performant, excellent API, respects reduced-motion
   - Cons: None significant
2) GSAP ScrollTrigger - Powerful scroll animation library
   - Pros: Very powerful, timeline controls
   - Cons: Adds 27KB, complexity, requires careful reduced-motion handling
3) Intersection Observer API directly
   - Pros: Native, zero dependencies
   - Cons: More boilerplate, manual animation coordination

### Micro-Interactions
1) **Framer Motion gestures + variants** - Hover, tap, drag gestures
   - Pros: Declarative, performant, integrated with existing animations
   - Cons: None significant
2) CSS transitions only
   - Pros: Simple, performant
   - Cons: Limited sophistication, no magnetic effects or complex interactions
3) GSAP for all interactions
   - Pros: Powerful, flexible
   - Cons: Bundle size, imperative API increases complexity

### Page Transitions
1) **Next View Transitions API + Framer Motion** - Combined approach
   - Pros: Native browser transitions + sophisticated custom animations
   - Cons: View Transitions limited browser support (progressive enhancement)
2) Framer Motion only
   - Pros: Full control, universal support
   - Cons: Manual coordination of exit/enter states
3) Barba.js
   - Pros: Specialized for page transitions
   - Cons: Additional 15KB, overlaps with Next.js routing

## Decision
Adopt a layered approach:
- **Lenis** for smooth scrolling with momentum physics
- **Framer Motion** for all animations, transitions, and micro-interactions
- **Next View Transitions** as progressive enhancement for supporting browsers
- **useInView + variants** for scroll-triggered reveals
- Custom hooks for sophisticated interactions (magnetic buttons, cursor effects)

All animations must respect `prefers-reduced-motion` and user preferences.

## Rationale
- **Performance**: Lenis adds only 3KB; Framer Motion already in project; total impact minimal
- **Accessibility**: All solutions support reduced-motion; Framer has built-in support
- **Developer Experience**: Framer Motion provides excellent declarative API; Lenis has simple integration
- **Polish**: This stack enables sophisticated interactions found in modern premium sites
- **Maintainability**: Focused toolset reduces complexity; single animation library (Framer)

## Implementation Strategy

### Phase 1: Foundation
- Integrate Lenis smooth scroll with React wrapper
- Add global scroll progress indicator
- Create reusable animation hooks (useScrollReveal, useMagneticEffect)

### Phase 2: Enhanced Transitions
- Upgrade PageWrapper with exit animations and stagger
- Add route-specific transition variants
- Implement shared element transitions where applicable

### Phase 3: Micro-Interactions
- Magnetic button effects (subtle mouse tracking)
- 3D card tilts on hover (perspective transforms)
- Animated counters with intersection observer
- Cursor follower for enhanced feel

### Phase 4: Scroll Effects
- Parallax in hero section (subtle depth)
- Stagger-reveal for section content
- Progress-based animations (fade/scale based on scroll position)

### Phase 5: Polish
- Loading states with skeleton animations
- Success states for forms with celebration
- Smooth color theme transitions
- Page load performance optimization

## Performance Budgets
- Lenis: ~3KB gzipped
- No additional animation libraries beyond Framer Motion
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Total Blocking Time: <200ms
- Cumulative Layout Shift: <0.1

## Accessibility Requirements
- Honor `prefers-reduced-motion` system preference
- Honor user motion toggle in site preferences
- All animations should enhance, not block, core functionality
- Keyboard navigation must not be affected
- Focus states must remain clear during animations
- Screen readers should not be impacted by decorative animations

## Testing Strategy
- Visual regression testing for animation states
- Performance monitoring (Lighthouse CI)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Reduced-motion testing
- Mobile/touch device testing
- Screen reader compatibility verification

## Consequences
- **Positive**:
  - Modern, fluid experience that matches high-end sites
  - Better user engagement and perceived performance
  - Competitive differentiation
  - Maintainable animation system
- **Negative**:
  - Slight bundle increase (~3KB for Lenis)
  - More complex animation logic requires testing
  - Need to maintain reduced-motion variants
  - Performance monitoring becomes more critical

## Metrics for Success
- User engagement time: target +20%
- Bounce rate: target -15%
- Performance scores maintained: Lighthouse Performance ≥90
- Accessibility maintained: Lighthouse A11y ≥95
- Zero animation-related accessibility issues
- Positive user feedback on site feel

## References
- Lenis: https://github.com/studio-freight/lenis
- Framer Motion: https://www.framer.com/motion/
- Next View Transitions: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#view-transitions
- Web Animation Best Practices: https://web.dev/animations/
- Respecting Motion Preferences: https://web.dev/prefers-reduced-motion/
