import type { Metadata } from "next";
import "./globals.css";

import { SiteShell } from "@/components/layout/site-shell";

const siteTitle = "360ace — Unified Consultancy Hub";
const siteDescription =
  "Strategic technology and food systems consultancy under one 360ace hub. Explore the practices and connect with experts.";

export const metadata: Metadata = {
  metadataBase: new URL("https://360ace.net"),
  title: {
    default: siteTitle,
    template: "%s | 360ace",
  },
  description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
    url: "https://360ace.net",
    siteName: "360ace",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
