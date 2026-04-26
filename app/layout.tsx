import type { Metadata } from "next";
import "./globals.css";
import { inter, plexMono, handwrite } from "./fonts";
import { Navbar, SiteFooter, MobileDock, HeaderScrollHide } from "./shared-ui";
import PageTransition from "@/components/page-transition";
import CookieConsent from "@/components/cookie-consent";
import GoogleAnalytics from "@/components/google-analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://360ace.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "360ace.NET — Consultancy",
    template: "%s | 360ace.NET",
  },
  description: "We build digital legacies with thoughtful engineering, motion, and craft. Cloud-native, data & AI platform engineering. Food quality, regulatory, and capability programs.",
  keywords: [
    "consultancy",
    "cloud engineering",
    "data engineering",
    "AI platform",
    "platform engineering",
    "food quality",
    "regulatory compliance",
    "360ace",
    "technology consulting",
    "digital transformation"
  ],
  authors: [{ name: "360ace.NET" }],
  creator: "360ace.NET",
  publisher: "360ace.NET",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "360ace.NET — Consultancy",
    siteName: "360ace.NET",
    description: "Cloud-native, data & AI platform engineering. Food quality, regulatory, and capability programs.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "360ace.NET Logo",
        type: "image/png"
      },
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "apple-touch-icon", url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/360ace/";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "360ace.NET",
    "url": siteUrl,
    "logo": `${siteUrl}/android-chrome-512x512.png`,
    "description": "Cloud-native, data & AI platform engineering. Food quality, regulatory, and capability programs.",
    "sameAs": [linkedinUrl],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  return (
    <html lang="en" className="scroll-smooth no-scrollbar" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${plexMono.variable} ${handwrite.variable} antialiased bg-[#F9F7F2] text-[#292524] min-h-screen flex flex-col`}>
        <GoogleAnalytics />
        <Navbar />
        <HeaderScrollHide />
        <div className="flex-1 flex flex-col min-h-0">
          <PageTransition>{children}</PageTransition>
        </div>
        <div id="__config" data-ts-key={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} hidden />
        <MobileDock />
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
