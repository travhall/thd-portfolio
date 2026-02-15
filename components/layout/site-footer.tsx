"use client";

import { motion } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/tokens";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.expo }}
      className="bg-background/60 backdrop-blur-xl p-4 xl:p-8"
    >
      <div className="text-sm text-muted-foreground flex gap-2 items-center justify-between">
        &copy; {new Date().getFullYear()} Travis Hall. All rights reserved.
      </div>
    </motion.footer>
  );
}
