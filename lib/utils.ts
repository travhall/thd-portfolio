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
