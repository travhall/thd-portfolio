import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CaseStudy } from "@/types/case-study";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── OKLCH color utilities ───────────────────────────────────────────────────
// Shared across work-list and case-studies. Handles both bare-number and
// percentage lightness: oklch(0.87 ...) or oklch(98.5% ...).

export function parseOklch(value: string): [number, number, number] | null {
  const m = value.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) return null;
  const L = parseFloat(m[1]);
  return [m[2] === "%" ? L / 100 : L, parseFloat(m[3]), parseFloat(m[4])];
}

export function isLightColor(oklch: string): boolean {
  const parsed = parseOklch(oklch);
  return parsed ? parsed[0] >= 0.55 : true;
}

// Returns the correct cover image for a case study based on current theme.
// Falls back to coverImage when no dark variant exists.
export function getCoverImage(study: CaseStudy, isDark: boolean): string {
  return isDark && study.coverImageDark ? study.coverImageDark : study.coverImage;
}

// ── Brand color utilities ────────────────────────────────────────────────────
// Centralised fallbacks: a very dark neutral for dark mode, a very light
// neutral for light mode — safe on any background.
const BRAND_DARK_FALLBACK = "oklch(0.20 0.01 0)";
const BRAND_LIGHT_FALLBACK = "oklch(0.88 0.01 0)";

// Returns the appropriate brand color for a study given the current theme.
export function getBrandColor(study: CaseStudy, isDark: boolean): string {
  return isDark
    ? (study.brandDark ?? BRAND_DARK_FALLBACK)
    : (study.brandLight ?? BRAND_LIGHT_FALLBACK);
}

// Returns Tailwind class strings for text/muted/border overlaid on a brand bg.
// Uses near-black (#1a1a1a) on light brand colors, near-white (#f0f0f0) on dark.
export function getBrandContrastClasses(isLight: boolean) {
  return {
    text:   isLight ? "text-[#1a1a1a]"      : "text-[#f0f0f0]",
    muted:  isLight ? "text-[#1a1a1a]/55"   : "text-[#f0f0f0]/55",
    border: isLight ? "border-[#1a1a1a]/30" : "border-[#f0f0f0]/30",
  };
}
