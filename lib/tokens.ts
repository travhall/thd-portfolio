/**
 * Shared design tokens for motion and animations.
 * Used in Framer Motion transitions where CSS variables are not supported.
 * Keep in sync with app/tokens.css for CSS-based transitions.
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
