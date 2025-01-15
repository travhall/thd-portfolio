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
      className="py-12 px-4 sm:px-6 lg:px-8 border-t"
    >
      <div className="text-sm text-muted-foreground flex gap-2 items-center justify-between">
        &copy; {new Date().getFullYear()} Travis Hall. All rights reserved.
        <ModeToggle />
      </div>
    </motion.footer>
  );
}
