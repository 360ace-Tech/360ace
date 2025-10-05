import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "hsl(var(--brand-50) / <alpha-value>)",
          100: "hsl(var(--brand-100) / <alpha-value>)",
          200: "hsl(var(--brand-200) / <alpha-value>)",
          300: "hsl(var(--brand-300) / <alpha-value>)",
          400: "hsl(var(--brand-400) / <alpha-value>)",
          500: "hsl(var(--brand-500) / <alpha-value>)",
          600: "hsl(var(--brand-600) / <alpha-value>)",
          700: "hsl(var(--brand-700) / <alpha-value>)",
          800: "hsl(var(--brand-800) / <alpha-value>)",
          900: "hsl(var(--brand-900) / <alpha-value>)"
        },
        tech: "hsl(var(--tech-color) / <alpha-value>)",
        food: "hsl(var(--food-color) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)", "system-ui"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        focus: "0 0 0 3px hsl(var(--brand-300) / 0.45)"
      },
      backgroundImage: {
        "grid-light": "radial-gradient(circle at 1px 1px, hsl(var(--brand-300) / 0.35) 1px, transparent 0)",
        "grid-dark": "radial-gradient(circle at 1px 1px, hsl(var(--brand-700) / 0.4) 1px, transparent 0)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;
