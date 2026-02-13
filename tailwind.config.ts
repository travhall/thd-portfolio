import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        "brand-1": {
          DEFAULT: "hsl(var(--brand-1-500) / <alpha-value>)",
          50: "hsl(var(--brand-1-50) / <alpha-value>)",
          100: "hsl(var(--brand-1-100) / <alpha-value>)",
          200: "hsl(var(--brand-1-200) / <alpha-value>)",
          300: "hsl(var(--brand-1-300) / <alpha-value>)",
          400: "hsl(var(--brand-1-400) / <alpha-value>)",
          500: "hsl(var(--brand-1-500) / <alpha-value>)",
          600: "hsl(var(--brand-1-600) / <alpha-value>)",
          700: "hsl(var(--brand-1-700) / <alpha-value>)",
          800: "hsl(var(--brand-1-800) / <alpha-value>)",
          900: "hsl(var(--brand-1-900) / <alpha-value>)",
          950: "hsl(var(--brand-1-950) / <alpha-value>)",
        },
        "brand-2": {
          DEFAULT: "hsl(var(--brand-2-500) / <alpha-value>)",
          50: "hsl(var(--brand-2-50) / <alpha-value>)",
          100: "hsl(var(--brand-2-100) / <alpha-value>)",
          200: "hsl(var(--brand-2-200) / <alpha-value>)",
          300: "hsl(var(--brand-2-300) / <alpha-value>)",
          400: "hsl(var(--brand-2-400) / <alpha-value>)",
          500: "hsl(var(--brand-2-500) / <alpha-value>)",
          600: "hsl(var(--brand-2-600) / <alpha-value>)",
          700: "hsl(var(--brand-2-700) / <alpha-value>)",
          800: "hsl(var(--brand-2-800) / <alpha-value>)",
          900: "hsl(var(--brand-2-900) / <alpha-value>)",
          950: "hsl(var(--brand-2-950) / <alpha-value>)",
        },
        "brand-3": {
          DEFAULT: "hsl(var(--brand-3-500) / <alpha-value>)",
          50: "hsl(var(--brand-3-50) / <alpha-value>)",
          100: "hsl(var(--brand-3-100) / <alpha-value>)",
          200: "hsl(var(--brand-3-200) / <alpha-value>)",
          300: "hsl(var(--brand-3-300) / <alpha-value>)",
          400: "hsl(var(--brand-3-400) / <alpha-value>)",
          500: "hsl(var(--brand-3-500) / <alpha-value>)",
          600: "hsl(var(--brand-3-600) / <alpha-value>)",
          700: "hsl(var(--brand-3-700) / <alpha-value>)",
          800: "hsl(var(--brand-3-800) / <alpha-value>)",
          900: "hsl(var(--brand-3-900) / <alpha-value>)",
          950: "hsl(var(--brand-3-950) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
      },
      borderColor: {
        DEFAULT: "hsl(var(--border) / <alpha-value>))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        nohemi: ["Nohemi", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
