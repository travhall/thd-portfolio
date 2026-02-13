/**
 * Shared design tokens for motion and animations.
 * These are used in Framer Motion transitions where CSS variables are not supported.
 * They should be kept in sync with app/tokens.css if you use them there as well.
 */

export const MOTION_TOKENS = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
    stagger: 0.05,
    menu: 0.5,
  },
  ease: {
    /** [0.16, 1, 0.3, 1] - Great for entrance animations */
    expo: [0.16, 1, 0.3, 1],
    /** [0.04, 0.62, 0.23, 0.98] - The classic site-wide custom easing */
    quart: [0.04, 0.62, 0.23, 0.98],
    /** Standard CSS ease-in-out */
    inOut: [0.4, 0, 0.2, 1],
  },
} as const;
