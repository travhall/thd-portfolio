"use client";

import { motion } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/tokens";

export function Footer() {
  return (
    <motion.footer
      aria-label="Site"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.expo }}
      className="p-4 xl:p-8 relative"
    >
      <div className="text-sm text-muted-foreground flex gap-2 items-center justify-between">
        &copy; {new Date().getFullYear()} Travis Hall. All rights reserved.
      </div>
    </motion.footer>
  );
}
