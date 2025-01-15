import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-500))",
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          500: "hsl(var(--accent-500))",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
          900: "hsl(var(--accent-900))",
          950: "hsl(var(--accent-950))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "brand-1": {
          DEFAULT: "hsl(var(--brand-1-500))",
          50: "hsl(var(--brand-1-50))",
          100: "hsl(var(--brand-1-100))",
          200: "hsl(var(--brand-1-200))",
          300: "hsl(var(--brand-1-300))",
          400: "hsl(var(--brand-1-400))",
          500: "hsl(var(--brand-1-500))",
          600: "hsl(var(--brand-1-600))",
          700: "hsl(var(--brand-1-700))",
          800: "hsl(var(--brand-1-800))",
          900: "hsl(var(--brand-1-900))",
          950: "hsl(var(--brand-1-950))",
        },
        "brand-2": {
          DEFAULT: "hsl(var(--brand-2-500))",
          50: "hsl(var(--brand-2-50))",
          100: "hsl(var(--brand-2-100))",
          200: "hsl(var(--brand-2-200))",
          300: "hsl(var(--brand-2-300))",
          400: "hsl(var(--brand-2-400))",
          500: "hsl(var(--brand-2-500))",
          600: "hsl(var(--brand-2-600))",
          700: "hsl(var(--brand-2-700))",
          800: "hsl(var(--brand-2-800))",
          900: "hsl(var(--brand-2-900))",
          950: "hsl(var(--brand-2-950))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
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
