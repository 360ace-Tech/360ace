"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/motion/scroll-reveal";
import { unifiedProcess } from "@/lib/hub-content";

export function ProcessSection() {
  return (
    <section id="process" className="py-20 scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
              A shared engagement model
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              One playbook to unite platform velocity and product integrity.
            </h2>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid gap-6 md:grid-cols-5" staggerDelay={0.1}>
          {unifiedProcess.map((item, index) => (
            <motion.div
              key={item.step}
              variants={staggerItemVariants}
              className="group rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-background)]/80 p-6 shadow-sm shadow-black/5 transition-all duration-300 hover:shadow-md hover:shadow-black/10 hover:-translate-y-1"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 text-sm font-bold text-[color:var(--color-primary)] transition-colors duration-300 group-hover:bg-[color:var(--color-primary)] group-hover:text-white">
                {index + 1}
              </div>
              <div className="text-sm font-semibold uppercase tracking-[0.4em] text-[color:var(--color-primary)]">
                {item.step}
              </div>
              <p className="mt-4 text-sm text-[color:var(--color-muted-foreground)]">{item.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
