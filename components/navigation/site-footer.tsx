import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[hsl(var(--brand-surface))] py-12 dark:border-white/5">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[hsl(var(--brand-muted))]">
            360ace
          </p>
          <p className="max-w-md text-sm text-[hsl(var(--brand-muted))]">
            Compound consultancy across technology and food systems. We build resilient platforms, quality frameworks, and teams
            ready for the future of regulated industries.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[hsl(var(--brand-foreground))]">Practices</p>
          <ul className="space-y-2 text-sm text-[hsl(var(--brand-muted))]">
            <li>
              <a
                href="https://360ace.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[hsl(var(--brand-primary))]"
              >
                360ace.Tech
              </a>
            </li>
            <li>
              <a
                href="https://360ace.food"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[hsl(var(--brand-primary))]"
              >
                360ace.Food
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[hsl(var(--brand-foreground))]">Company</p>
          <ul className="space-y-2 text-sm text-[hsl(var(--brand-muted))]">
            <li>
              <Link href="/contact" className="transition hover:text-[hsl(var(--brand-primary))]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="transition hover:text-[hsl(var(--brand-primary))]">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="transition hover:text-[hsl(var(--brand-primary))]">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 px-6 text-xs text-[hsl(var(--brand-muted))] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} 360ace. All rights reserved.</p>
        <p>Crafted with accessibility-first, performance-led engineering.</p>
      </div>
    </footer>
  );
}
