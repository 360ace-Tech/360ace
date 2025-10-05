import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import { Providers } from '@/components/layout/providers';
import { SiteShell } from '@/components/layout/site-shell';

export const metadata: Metadata = {
  metadataBase: new URL('https://360ace.net'),
  title: {
    default: '360ace — Unified Consultancy Hub',
    template: '%s · 360ace',
  },
  description:
    '360ace unites cloud-native engineering with food safety consultancy. Explore our technology and food practices and connect with the right experts.',
  openGraph: {
    title: '360ace — Unified Consultancy Hub',
    description:
      '360ace unites cloud-native engineering with food safety consultancy. Explore our technology and food practices and connect with the right experts.',
    url: 'https://360ace.net',
    siteName: '360ace',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '360ace — Unified Consultancy Hub',
    description:
      '360ace unites cloud-native engineering with food safety consultancy. Explore our technology and food practices and connect with the right experts.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[hsl(var(--brand-surface))] text-[hsl(var(--brand-foreground))]">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
