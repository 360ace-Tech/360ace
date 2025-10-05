'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Menu, X } from 'lucide-react';

import { navigationLinks } from '@/content/hub';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MotionToggle } from '@/components/ui/motion-toggle';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md supports-[backdrop-filter]:bg-[hsla(var(--brand-surface),0.85)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.35em] uppercase">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand-primary))]" aria-hidden />
            360ace
          </Link>
        </div>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigationLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[hsl(var(--brand-muted))] transition hover:text-[hsl(var(--brand-primary))]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <MotionToggle />
          <Button asChild variant="default">
            <a href="https://360ace.tech" rel="noopener noreferrer" target="_blank">
              Explore Tech
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://360ace.food" rel="noopener noreferrer" target="_blank">
              Explore Food
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MotionToggle />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-expanded={open}
            aria-label="Open navigation menu"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div className="space-y-4 border-t border-white/10 bg-[hsl(var(--brand-surface))] px-6 pb-6 pt-4 dark:border-white/5">
          <nav className="grid gap-3" aria-label="Mobile">
            {navigationLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base font-semibold text-[hsl(var(--brand-foreground))]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="grid gap-2">
            <Button asChild>
              <a href="https://360ace.tech" rel="noopener noreferrer" target="_blank">
                Explore 360ace.Tech
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://360ace.food" rel="noopener noreferrer" target="_blank">
                Explore 360ace.Food
              </a>
            </Button>
          </div>
          <Button asChild variant="ghost">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
