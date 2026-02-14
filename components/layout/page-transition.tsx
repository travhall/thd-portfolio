"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/tokens";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : MOTION_TOKENS.duration.base,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
