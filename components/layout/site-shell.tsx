import { ReactNode } from "react";

import { PreferencesProvider } from "@/components/providers/preferences-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-[999] -translate-y-32 rounded-md bg-[color:var(--color-primary)] px-4 py-2 text-sm font-medium text-[color:var(--color-primary-foreground)] focus:translate-y-0 focus:outline-none"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main-content" className="flex-1 bg-[color:var(--color-background)]">
          {children}
        </main>
        <SiteFooter />
      </div>
    </PreferencesProvider>
  );
}
