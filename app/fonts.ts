import { Inter, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  display: "swap",
  variable: "--font-mono",
});

export const handwrite = localFont({
  src: "../Amsterdam Handwriting.ttf",
  display: "swap",
  variable: "--font-hand",
  weight: "400",
  style: "normal",
});
