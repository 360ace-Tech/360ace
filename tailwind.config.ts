import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.{md,mdx,json}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        brand: {
          DEFAULT: "hsl(var(--brand-primary) / <alpha-value>)",
          accent: "hsl(var(--brand-accent) / <alpha-value>)",
          tech: "hsl(var(--brand-tech) / <alpha-value>)",
          food: "hsl(var(--brand-food) / <alpha-value>)",
          surface: "hsl(var(--brand-surface) / <alpha-value>)",
        },
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        focus: "0 0 0 3px hsl(var(--brand-primary) / 0.35)",
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
