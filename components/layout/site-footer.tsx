import Link from "next/link";

import { MotionToggle } from "@/components/ui/motion-toggle";

const footerLinks = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
];

const practiceLinks = [
  { label: "360ace.Tech", href: "https://360ace.tech" },
  { label: "360ace.Food", href: "https://360ace.food" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)]/40 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--color-muted-foreground)]">
              360ace Consultancy Hub
            </p>
            <p className="max-w-sm text-sm text-[color:var(--color-muted-foreground)]">
              Platform, product, and quality experts supporting bold teams across technology and food systems.
            </p>
            <MotionToggle />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-muted-foreground)]">
              Practices
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {practiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-[color:var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-muted-foreground)]">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-[color:var(--color-primary)]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs text-[color:var(--color-muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} 360ace. All rights reserved.</p>
          <p>Built with respect for accessibility, privacy, and measurable impact.</p>
        </div>
      </div>
    </footer>
  );
}
