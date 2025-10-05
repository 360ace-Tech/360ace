"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const HeroOrb = dynamic(() => import("@/components/three/hero-orb").then((mod) => mod.HeroOrb), {
  ssr: false,
  loading: () => null
});

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-50))] via-white to-[hsl(var(--brand-100))] py-24">
      <div className="absolute inset-0 -z-10 opacity-40 blur-3xl" aria-hidden>
        <div className="mx-auto h-[26rem] max-w-4xl rounded-full bg-[hsl(var(--brand-200))]" />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand-100))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--brand-600))]">
            Unified Consultancy
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-[hsl(var(--neutral-900))] sm:text-5xl">
            Technology and food systems expertise united to deliver resilient outcomes.
          </h1>
          <p className="max-w-xl text-base text-[hsl(var(--neutral-700))]">
            360ace blends cloud, platform, and reliability engineering with world-class food quality and regulatory consultancy.
            Navigate to the practice that fits your mission — or bring both teams together for end-to-end transformation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="tech" size="lg">
              <Link href="https://360ace.tech" target="_blank" rel="noreferrer">
                Explore 360ace-Tech
              </Link>
            </Button>
            <Button asChild variant="food" size="lg">
              <Link href="https://360ace.food" target="_blank" rel="noreferrer">
                Explore 360ace-Food
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#process">Our unified process</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[320px] w-full">
          <div className="absolute inset-0 rounded-[2rem] bg-[hsl(var(--brand-500))] opacity-10 blur-3xl" aria-hidden />
          <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[2rem] border border-[hsl(var(--brand-100))] bg-white/70 shadow-2xl shadow-[hsl(var(--brand-900))/0.18] backdrop-blur">
            {prefersReducedMotion ? (
              <div className="mx-auto max-w-xs text-center text-sm text-[hsl(var(--neutral-600))]">
                Interactive hero disabled for reduced motion preference. Explore our practices via the buttons.
              </div>
            ) : (
              <HeroOrb />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
