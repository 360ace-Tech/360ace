import type { Metadata } from 'next';

import { foodHighlights, techHighlights, type PracticeHighlight } from '@/content/hub';

type PracticeOverview = {
  slug: string;
  highlight: PracticeHighlight;
};

const practices: readonly PracticeOverview[] = [
  { slug: 'tech', highlight: techHighlights },
  { slug: 'food', highlight: foodHighlights },
];

export const metadata: Metadata = {
  title: 'Consulting Practices',
  description:
    'Explore how 360ace.Tech and 360ace.Food collaborate to solve technology and food system challenges with one integrated hub.',
};

export default function ConsultingPage() {
  return (
    <div className="bg-[hsl(var(--brand-surface))] py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
            Consulting practices
          </p>
          <h1 className="text-4xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-5xl">
            Two specialist teams, one aligned delivery model
          </h1>
          <p className="text-base text-[hsl(var(--brand-muted))]">
            Every engagement starts with the same outcomes-focused process. Choose the practice that fits best or activate both
            for compound impact.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          {practices.map(({ slug, highlight }) => (
            <article
              key={slug}
              className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-white/15 bg-white/80 p-8 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[hsl(var(--brand-foreground))]">{highlight.title}</h2>
                <p className="text-sm text-[hsl(var(--brand-muted))]">{highlight.summary}</p>
                <ul className="space-y-2 text-sm text-[hsl(var(--brand-foreground))]">
                  {highlight.items.map((item) => (
                    <li key={item.title} className="rounded-2xl bg-white/70 p-3 shadow-sm backdrop-blur dark:bg-white/5">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-[hsl(var(--brand-muted))]">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={highlight.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[hsl(var(--brand-primary))] underline-offset-4 hover:underline"
              >
                {highlight.cta.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
