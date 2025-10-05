'use client';

import { motion } from 'framer-motion';

import { heroContent } from '@/content/hub';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { eyebrow, title, description, primaryCta, secondaryCta, stats } = heroContent;
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-surface))] via-white/60 to-white/20 py-24 dark:via-white/5 dark:to-transparent">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-[hsl(var(--brand-primary)/0.25)] blur-[180px]" />
        <div className="absolute right-[-5%] top-[40%] h-96 w-96 rounded-full bg-[hsl(var(--brand-tech)/0.25)] blur-[200px]" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[3fr_2fr] md:items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          variants={container}
          className="space-y-6"
        >
          <span className="inline-flex items-center rounded-full bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--brand-muted))] shadow-sm backdrop-blur">
            {eyebrow}
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-[hsl(var(--brand-foreground))] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-[hsl(var(--brand-muted))] md:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                {primaryCta.label}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
                {secondaryCta.label}
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--brand-muted))]">
            Compound impact
          </p>
          <ul className="mt-6 grid gap-6 text-[hsl(var(--brand-foreground))]">
            {stats.map((stat) => (
              <li key={stat.label} className="flex items-baseline justify-between gap-4">
                <span className="text-4xl font-bold">{stat.value}</span>
                <span className="text-sm text-[hsl(var(--brand-muted))]">{stat.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
