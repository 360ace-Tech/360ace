import type { Metadata } from "next";
import "./globals.css";

import { SiteShell } from "@/components/layout/site-shell";
import site from "@/content/site.json" assert { type: "json" };
import { inter, plexMono } from "./fonts";

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
  twitter: {
    card: "summary_large_image",
    site: "@360ace",
    creator: "@360ace",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plexMono.variable} antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
