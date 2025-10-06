"use client";

import { motion } from "framer-motion";
import { credibility } from "@/lib/hub-content";
import { CountUp } from "@/components/ui/count-up";

function parseStatValue(v: string): { n: number; suffix: string } {
  const m = String(v).match(/^(\d+)/);
  const n = m ? parseInt(m[1], 10) : 0;
  const suffix = String(v).slice(m?.[1].length ?? 0);
  return { n, suffix };
}

export function CredibilitySection() {
  return (
    <section id="credibility" className="bg-[color:var(--color-muted)]/20 py-20 scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.5em] text-[color:var(--color-muted-foreground)]">
            Trusted impact
          </p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Delivering measurable change for regulated and growth-focused teams.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {credibility.stats.map((stat, idx) => {
            const { n, suffix } = parseStatValue(stat.value);
            return (
              <motion.div
                key={stat.label}
                className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-8 text-center shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <span className="text-4xl font-semibold text-[color:var(--color-primary)]">
                  <CountUp to={n} duration={1.2} />{suffix}
                </span>
                <p className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.4em] text-[color:var(--color-muted-foreground)]">
          {credibility.logos.map((logo, idx) => (
            <motion.span
              key={logo}
              className="rounded-full border border-dashed border-[color:var(--color-border)] px-4 py-2"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.04 }}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
