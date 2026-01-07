import localFont from "next/font/local";

// Offline-safe fallback: map variables to system stacks via utility classes in globals.css
export const inter = { variable: "font-sans" } as const;
export const plexMono = { variable: "font-mono" } as const;

export const handwrite = localFont({
  src: "./fonts/AmsterdamHandwriting.ttf",
  display: "swap",
  variable: "--font-hand",
  weight: "400",
  style: "normal",
});
