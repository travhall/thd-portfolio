"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOTION_TOKENS } from "@/lib/tokens";

export function Logo() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  // Clean up pathname to handle trailing slashes
  const normalizedPathname = pathname?.replace(/\/$/, "") || "/";
  
  // Hide only on top-level work and about pages
  const isHiddenPage = normalizedPathname === "/work" || normalizedPathname === "/about";

  // Normal scroll fade for home and other pages
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const pointerEvents = useTransform(scrollY, (y) => y > 250 ? "none" : "auto");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div aria-hidden="true" className="p-4 xl:p-8 fixed top-0 left-0 z-50 pointer-events-none">
        <div className="overflow-hidden my-3">
          <span className="hero-label opacity-0">
            travishall.design
          </span>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isHiddenPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-4 xl:p-8 fixed top-0 left-0 z-40"
          style={{ opacity: scrollOpacity, pointerEvents }}
        >
          <div className="overflow-hidden my-3">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_TOKENS.duration.base,
                delay: MOTION_TOKENS.duration.fast,
              }}
              className="hero-label"
            >
              <Link href="/">travishall.design</Link>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
