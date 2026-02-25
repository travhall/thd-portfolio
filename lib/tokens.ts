/**
 * Shared design tokens for motion and animations.
 * Used in Framer Motion transitions where CSS variables are not supported.
 * Keep in sync with app/globals.css for CSS-based transitions.
 */

export const MOTION_TOKENS = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
    stagger: 0.05,
  },
  ease: {
    /** [0.16, 1, 0.3, 1] - Entrance animations */
    expo: [0.16, 1, 0.3, 1],
    /** [0.22, 1, 0.36, 1] - Page-level transitions */
    page: [0.22, 1, 0.36, 1],
    /** [0.04, 0.62, 0.23, 0.98] - Site-wide custom easing */
    quart: [0.04, 0.62, 0.23, 0.98],
    /** Standard CSS ease-in-out */
    inOut: [0.4, 0, 0.2, 1],
  },
} as const;

// ── Hero scroll transform ranges ────────────────────────────────────────────
// Used by both Hero (home) and CaseStudyContent to drive the scroll-linked
// image parallax and blur overlay. Defined once here to keep the two in sync.

export const HERO_SCROLL = {
  /** Content (text + image) fades and drifts as user scrolls in */
  contentRange:   [0, 400] as [number, number],
  contentOpacity: [1, 0.2] as [number, number],
  contentY:       [0, 8]   as [number, number],
  /** Blur overlay fades in after the hero has mostly cleared */
  blurRange:   [500, 800] as [number, number],
  blurOpacity: [0, 1]     as [number, number],
} as const;
