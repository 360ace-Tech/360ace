"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/motion/scroll-reveal";
import { testimonials } from "@/lib/hub-content";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[color:var(--color-background)] py-16 sm:py-20 scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
              Voices from our partners
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              The right expertise at the right moment across digital and product lifecycles.
            </h2>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid gap-6 md:grid-cols-2" staggerDelay={0.15}>
          {testimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.quote}
              variants={staggerItemVariants}
              className="group flex h-full flex-col justify-between rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-muted)]/30 p-6 sm:p-8 transition-all duration-300 hover:shadow-md hover:shadow-black/10 hover:border-[color:var(--color-primary)]/30"
            >
              <p className="text-base text-[color:var(--color-foreground)] italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-4 pt-4 border-t border-[color:var(--color-border)]">
                <p className="text-sm">
                  <span className="font-semibold text-[color:var(--color-foreground)]">{testimonial.name}</span>
                  <br />
                  <span className="text-[color:var(--color-muted-foreground)]">{testimonial.role}</span>
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
