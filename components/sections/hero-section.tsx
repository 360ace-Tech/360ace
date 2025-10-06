"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePreferences } from "@/components/providers/preferences-context";
import { hero } from "@/lib/hub-content";

const orbitVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 28,
      ease: "linear",
    },
  },
};

export function HeroSection() {
  const { reduceMotion } = usePreferences();

  return (
    <section id="home" className="relative overflow-hidden bg-[color:var(--color-background)] scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-20 sm:px-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-sm uppercase tracking-[0.6em] text-[color:var(--color-muted-foreground)]">
            {hero.eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-xl text-lg text-[color:var(--color-muted-foreground)]">
            {hero.description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-[color:var(--color-tech)] text-white hover:bg-[color:var(--color-tech)]/90">
              <Link href={hero.techCta.href} target="_blank" rel="noreferrer">
                {hero.techCta.label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-[color:var(--color-food)] text-black hover:bg-[color:var(--color-food)]/90">
              <Link href={hero.foodCta.href} target="_blank" rel="noreferrer">
                {hero.foodCta.label}
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-[320px] w-[320px] rounded-full bg-gradient-to-br from-[color:var(--color-tech-soft)] via-white to-[color:var(--color-food-soft)] shadow-[var(--shadow-lg)]">
            {!reduceMotion && (
              <motion.div
                className="absolute inset-[-18%] rounded-full border border-dashed border-[color:var(--color-primary)]/50"
                variants={orbitVariants}
                animate="animate"
              />
            )}
            <div className="absolute inset-8 rounded-full bg-[color:var(--color-background)]/80 backdrop-blur-sm" />
            <div className="absolute inset-16 flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
                Integrated Practices
              </span>
              <span className="text-2xl font-semibold">Tech × Food</span>
              <p className="mx-auto max-w-[180px] text-sm text-[color:var(--color-muted-foreground)]">
                Shared roadmaps for platform velocity and product integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
