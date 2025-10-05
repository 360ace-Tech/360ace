import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/navigation/site-footer';
import { SiteHeader } from '@/components/navigation/site-header';

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-slate-900"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 bg-[hsl(var(--brand-surface))]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
