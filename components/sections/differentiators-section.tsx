"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/motion/scroll-reveal";
import { differentiators } from "@/lib/hub-content";

export function DifferentiatorsSection() {
  return (
    <section id="differentiators" className="bg-[color:var(--color-background)] py-20 scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
              Why teams choose 360ace
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              Integrated expertise. Proven, measurable delivery.
            </h2>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid gap-6 md:grid-cols-3" staggerDelay={0.12}>
          {differentiators.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItemVariants}
              className="group rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-muted)]/40 p-8 transition-all duration-300 hover:bg-[color:var(--color-muted)]/60 hover:shadow-md hover:shadow-black/10 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold group-hover:text-[color:var(--color-primary)] transition-colors duration-300">{item.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">{item.description}</p>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
