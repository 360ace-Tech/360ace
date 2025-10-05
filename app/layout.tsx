import type { Metadata } from "next";
import "./globals.css";
import { Inter, Fira_Code, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteShell } from "@/components/layout/site-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://360ace.net"),
  title: {
    default: "360ace — Unified Consultancy Hub",
    template: "%s · 360ace"
  },
  description:
    "360ace connects transformative technology and food systems expertise. Explore our Tech and Food consultancies to unlock growth and resilience.",
  openGraph: {
    title: "360ace — Unified Consultancy Hub",
    description:
      "360ace connects transformative technology and food systems expertise. Explore our Tech and Food consultancies to unlock growth and resilience.",
    url: "https://360ace.net",
    siteName: "360ace",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "360ace — Unified Consultancy Hub",
    description:
      "360ace connects transformative technology and food systems expertise. Explore our Tech and Food consultancies to unlock growth and resilience."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} ${fira.variable} antialiased bg-[hsl(var(--neutral-50))] text-[hsl(var(--neutral-900))]`}
        data-grid="true"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded-full bg-[hsl(var(--brand-500))] px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
