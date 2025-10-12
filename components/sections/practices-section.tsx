"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/motion/scroll-reveal";
import { practiceHighlights } from "@/lib/hub-content";
import { cn } from "@/lib/utils";

const accentClasses: Record<string, string> = {
  tech: "bg-[color:var(--color-tech-soft)] border-[color:var(--color-tech)]/50",
  food: "bg-[color:var(--color-food-soft)] border-[color:var(--color-food)]/50",
};

export function PracticesSection() {
  return (
    <section id="practices" className="bg-[color:var(--color-muted)]/30 py-20 scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
              Two specialist practices
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              Dedicated teams for resilient digital platforms and trusted food systems.
            </h2>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid gap-6 md:grid-cols-2" staggerDelay={0.15}>
          {practiceHighlights.map((practice) => (
            <motion.div
              key={practice.name}
              variants={staggerItemVariants}
              className={cn(
                "flex h-full flex-col justify-between gap-6 rounded-[var(--radius-lg)] border p-8 shadow-sm shadow-black/5 transition-shadow duration-300 hover:shadow-md hover:shadow-black/10",
                accentClasses[practice.accent] ?? "bg-white border-[color:var(--color-border)]",
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{practice.name}</h3>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
                      practice.accent === "tech"
                        ? "bg-[color:var(--color-tech)]/15 text-[color:var(--color-tech)]"
                        : "bg-[color:var(--color-food)]/20 text-[color:var(--color-food)]",
                    )}
                  >
                    {practice.accent === "tech" ? "Technology" : "Food systems"}
                  </span>
                </div>
                <p className="text-sm text-[color:var(--color-muted-foreground)]">{practice.summary}</p>
                <ul className="space-y-2 text-sm">
                  {practice.services.map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-primary)]" aria-hidden />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Button asChild variant="outline">
                  <Link href={practice.href} target="_blank" rel="noreferrer">
                    Explore {practice.name}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
