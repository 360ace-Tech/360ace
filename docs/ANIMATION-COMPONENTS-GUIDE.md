# Animation Components Guide

Quick reference for using the new animation components in the 360ace hub site.

## Table of Contents
- [Scroll Reveal Components](#scroll-reveal-components)
- [Interactive Components](#interactive-components)
- [Utility Components](#utility-components)
- [Best Practices](#best-practices)

---

## Scroll Reveal Components

### ScrollReveal

Animates content as it enters the viewport.

```tsx
import { ScrollReveal } from "@/components/motion/scroll-reveal";

<ScrollReveal
  direction="up"      // "up" | "down" | "left" | "right" | "none"
  delay={0}           // delay in seconds
  duration={0.6}      // animation duration in seconds
  once={true}         // animate once or on every scroll
  className="..."     // optional className
>
  <YourContent />
</ScrollReveal>
```

**Example**:
```tsx
<ScrollReveal direction="up">
  <h2>This heading will fade in from below</h2>
</ScrollReveal>
```

---

### StaggerContainer

Animates child elements sequentially with a stagger effect.

```tsx
import { StaggerContainer, staggerItemVariants } from "@/components/motion/scroll-reveal";
import { motion } from "framer-motion";

<StaggerContainer
  staggerDelay={0.1}  // delay between each child
  className="grid gap-6 md:grid-cols-3"
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={staggerItemVariants}
    >
      {item.content}
    </motion.div>
  ))}
</StaggerContainer>
```

**Example**:
```tsx
<StaggerContainer className="grid gap-6 md:grid-cols-3" staggerDelay={0.15}>
  {cards.map((card) => (
    <motion.div key={card.id} variants={staggerItemVariants}>
      <Card {...card} />
    </motion.div>
  ))}
</StaggerContainer>
```

---

## Interactive Components

### MagneticButton

Creates a magnetic effect that follows the cursor.

```tsx
import { MagneticButton } from "@/components/ui/magnetic-button";

<MagneticButton
  strength={0.3}      // 0-1, how strong the magnetic pull
  className="..."     // standard button classes
  onClick={() => {}}  // click handler
>
  Click Me
</MagneticButton>
```

**Example**:
```tsx
<MagneticButton
  strength={0.4}
  className="rounded-full bg-primary px-6 py-3 text-white"
  onClick={handleClick}
>
  Get Started
</MagneticButton>
```

**Note**: Automatically disabled when `prefers-reduced-motion` is active.

---

### TiltCard

Adds 3D tilt effect that follows mouse movement.

```tsx
import { TiltCard } from "@/components/ui/tilt-card";

<TiltCard
  tiltAmount={15}     // degrees of tilt (default: 15)
  glareEffect={true}  // show glare effect (default: true)
  className="..."     // optional className
>
  <YourCardContent />
</TiltCard>
```

**Example**:
```tsx
<TiltCard tiltAmount={12} glareEffect={true} className="rounded-lg border p-8">
  <h3>Interactive Card</h3>
  <p>Hover to see the 3D tilt effect</p>
</TiltCard>
```

**Note**: Automatically falls back to static rendering for reduced-motion users.

---

### CursorFollower

Global cursor enhancement (already included in SiteShell).

```tsx
import { CursorFollower } from "@/components/ui/cursor-follower";

// In your layout/shell
<CursorFollower />
```

**Features**:
- Follows cursor with smooth spring physics
- Expands when hovering interactive elements
- Desktop only (hidden on mobile)
- Mix-blend-mode for elegant contrast
- Automatically disabled for reduced motion

---

## Utility Components

### CountUp

Animated number counter with intersection observer.

```tsx
import { CountUp } from "@/components/ui/count-up";

<CountUp
  to={100}           // target number
  from={0}           // starting number (default: 0)
  duration={1.2}     // animation duration (default: 1.2)
  delay={0}          // delay before starting (default: 0)
  once={true}        // animate once or repeat (default: true)
  className="..."    // optional className
/>
```

**Example**:
```tsx
<div className="text-4xl font-bold">
  <CountUp to={250} duration={1.5} />+
  <p className="text-sm">Projects Completed</p>
</div>
```

**Note**: Animates only when element enters viewport.

---

### Enhanced Button

Standard button component with improved micro-interactions (already applied to all Button components).

```tsx
import { Button } from "@/components/ui/button";

<Button
  variant="default"   // "default" | "outline" | "ghost" | "secondary"
  size="default"      // "default" | "sm" | "lg" | "icon"
>
  Click Me
</Button>
```

**Features**:
- Active scale effect (`active:scale-[0.98]`)
- Smooth shadow transitions
- Enhanced hover states
- 200ms transition duration

---

## Best Practices

### 1. Respect Reduced Motion

All components automatically respect the user's `prefers-reduced-motion` setting. The PreferencesContext handles this globally.

```tsx
import { usePreferences } from "@/components/providers/preferences-context";

const { reduceMotion } = usePreferences();

if (reduceMotion) {
  // Provide simpler animation or skip entirely
}
```

### 2. Performance Considerations

**DO**:
- Use `once={true}` for ScrollReveal unless repeat animation is essential
- Keep stagger delays reasonable (0.1-0.15s recommended)
- Limit the number of simultaneously animating elements

**DON'T**:
- Animate too many elements at once (causes jank)
- Use very long durations (>1s feels sluggish)
- Nest multiple animation wrappers unnecessarily

### 3. Scroll Reveal Patterns

**Section Headers**:
```tsx
<ScrollReveal direction="up">
  <div className="space-y-4">
    <p className="text-sm uppercase">Section Label</p>
    <h2 className="text-4xl font-bold">Section Title</h2>
  </div>
</ScrollReveal>
```

**Grid of Cards**:
```tsx
<StaggerContainer className="grid gap-6 md:grid-cols-3" staggerDelay={0.12}>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemVariants}>
      <Card {...item} />
    </motion.div>
  ))}
</StaggerContainer>
```

**Sequential Content**:
```tsx
<ScrollReveal direction="up" delay={0}>
  <FirstElement />
</ScrollReveal>
<ScrollReveal direction="up" delay={0.2}>
  <SecondElement />
</ScrollReveal>
<ScrollReveal direction="up" delay={0.4}>
  <ThirdElement />
</ScrollReveal>
```

### 4. Animation Timing

**Recommended Durations**:
- Page transitions: 0.5s
- Scroll reveals: 0.6s
- Micro-interactions: 0.2s
- Counters: 1.2-1.5s

**Recommended Stagger Delays**:
- Small items (buttons, badges): 0.05-0.08s
- Medium items (cards): 0.1-0.15s
- Large sections: 0.2-0.3s

### 5. Combining Animations

**Good - Clear hierarchy**:
```tsx
<ScrollReveal direction="up">
  <StaggerContainer staggerDelay={0.1}>
    {items.map(item => (
      <motion.div key={item.id} variants={staggerItemVariants}>
        <TiltCard>
          <CardContent />
        </TiltCard>
      </motion.div>
    ))}
  </StaggerContainer>
</ScrollReveal>
```

**Avoid - Too many nested animations**:
```tsx
<ScrollReveal>
  <motion.div animate={...}>
    <ScrollReveal> {/* Unnecessary nesting */}
      <TiltCard>
        <motion.div animate={...}> {/* Too much */}
          <Content />
        </motion.div>
      </TiltCard>
    </ScrollReveal>
  </motion.div>
</ScrollReveal>
```

### 6. Accessibility Checklist

✅ **Before deploying**:
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Verify keyboard navigation still works
- [ ] Check screen reader compatibility
- [ ] Ensure no content is hidden by animations
- [ ] Verify focus states remain visible
- [ ] Test on low-end devices for performance

### 7. Testing Reduced Motion

**Browser DevTools**:
```
Chrome/Edge:
1. Open DevTools (F12)
2. Cmd+Shift+P → "Emulate CSS prefers-reduced-motion"

Firefox:
1. Open DevTools
2. Responsive Design Mode
3. Enable "prefers-reduced-motion"
```

**In Code**:
```tsx
// Force reduced motion for testing
<PreferencesProvider initialReduceMotion={true}>
  <App />
</PreferencesProvider>
```

---

## Component Composition Examples

### Hero Section with Parallax
```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref}>
      <motion.div style={{ y }}>
        <h1>Hero Content</h1>
      </motion.div>
    </section>
  );
}
```

### Stats Section with CountUp
```tsx
<section>
  <ScrollReveal direction="up">
    <h2>Our Impact</h2>
  </ScrollReveal>

  <StaggerContainer className="grid gap-6 md:grid-cols-3">
    {stats.map((stat) => (
      <motion.div key={stat.label} variants={staggerItemVariants}>
        <div className="text-4xl font-bold">
          <CountUp to={stat.value} duration={1.5} />+
        </div>
        <p>{stat.label}</p>
      </motion.div>
    ))}
  </StaggerContainer>
</section>
```

### Interactive CTA
```tsx
<ScrollReveal direction="up">
  <div className="text-center">
    <h2>Ready to get started?</h2>
    <MagneticButton
      strength={0.35}
      className="mt-8 rounded-full bg-primary px-8 py-4 text-white"
      onClick={handleGetStarted}
    >
      Get Started Today
    </MagneticButton>
  </div>
</ScrollReveal>
```

---

## Troubleshooting

### Animation not triggering
- Check if element is wrapped in `"use client"` component
- Verify PreferencesProvider is in the component tree
- Ensure viewport threshold is appropriate for element size

### Janky animations
- Reduce number of simultaneous animations
- Check for layout shifts (use `will-change` sparingly)
- Verify no heavy JavaScript running during animation

### TypeScript errors
- Import types from framer-motion: `import { type Variants } from "framer-motion"`
- Ensure motion components use correct prop types

---

For more details, see:
- [ADR 0002: Enhanced Motion Patterns](./adr/0002-enhanced-motion-interactions.md)
- [Enhancements Summary](./ENHANCEMENTS-SUMMARY.md)
- [Framer Motion Docs](https://www.framer.com/motion/)
