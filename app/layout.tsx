import type { Metadata } from "next";
import "./globals.css";
import { inter, plexMono, handwrite } from "./fonts";
import { Navbar, SiteFooter, MobileDock, HeaderScrollHide } from "./shared-ui";
import PageTransition from "@/components/page-transition";
import CookieConsent from "@/components/cookie-consent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://360ace.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "360ace.NET — Consultancy",
    template: "%s | 360ace.NET",
  },
  description: "We build digital legacies with thoughtful engineering, motion, and craft.",
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "360ace.NET — Consultancy",
    siteName: "360ace.NET",
    description: "Cloud-native, data & AI platform engineering. Food quality, regulatory, and capability programs.",
    images: [
      { url: "/android-chrome-512x512.png", width: 512, height: 512, alt: "360ace.NET" },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "360ace.NET — Consultancy",
    description: "Cloud-native, data & AI platform engineering. Food quality, regulatory, and capability programs.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [{ url: "/favicon-32x32.png" }, { url: "/favicon-16x16.png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth no-scrollbar" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${plexMono.variable} ${handwrite.variable} antialiased bg-[#F9F7F2] text-[#292524] min-h-screen flex flex-col`}>
        <Navbar />
        <HeaderScrollHide />
        <div className="flex-1 flex flex-col min-h-0">
          <PageTransition>{children}</PageTransition>
        </div>
        {/* Runtime-exposed config for client side (avoids build-time inlining issues) */}
        <div id="__config" data-ts-key={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} hidden />
        <MobileDock />
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
