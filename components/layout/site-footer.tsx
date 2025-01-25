// components/site-footer.tsx
"use client";

import { motion } from "framer-motion";
import { ModeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background/60 backdrop-blur-xl p-4 xl:p-8"
    >
      <div className="text-sm text-muted-foreground flex gap-2 items-center justify-between">
        &copy; {new Date().getFullYear()} Travis Hall. All rights reserved.
        <ModeToggle />
      </div>
    </motion.footer>
  );
}
