import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

import { SiteShell } from "@/components/layout/site-shell";
import site from "@/content/site.json" assert { type: "json" };

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: site.title,
    template: "%s | 360ace",
  },
  description: site.description,
  keywords: [
    "360ace",
    "consultancy",
    "cloud native",
    "food systems",
    "quality assurance",
    "devops",
    "platform engineering",
  ],
  openGraph: {
    title: site.title,
    description: site.description,
    url: "https://360ace.net",
    siteName: "360ace",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <SiteShell>{children}</SiteShell>
        </body>
      </html>
    </ViewTransitions>
  );
}
