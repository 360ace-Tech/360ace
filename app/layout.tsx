import type { Metadata } from "next";
import "./globals.css";
import { inter, plexMono, handwrite } from "./fonts";
import { Navbar, SiteFooter, MobileDock } from "./shared-ui";
import PageTransition from "@/components/page-transition";
import CookieConsent from "@/components/cookie-consent";

export const metadata: Metadata = {
  title: "360ace.NET — Consultancy",
  description: "We build digital legacies with thoughtful engineering, motion, and craft.",
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
        <div className="flex-1 flex flex-col min-h-0">
          <PageTransition>{children}</PageTransition>
        </div>
        <MobileDock />
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
