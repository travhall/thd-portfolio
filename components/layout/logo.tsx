"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MOTION_TOKENS } from "@/lib/tokens";

export function Logo() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Fade out logo as we scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const pointerEvents = useTransform(scrollY, (y) => y > 250 ? "none" : "auto");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-4 xl:p-8 fixed top-0 left-0 z-50">
        <div className="overflow-hidden my-3">
          <h1 className="hero-label opacity-0">
            <Link href="/">travishall.design</Link>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4 xl:p-8 fixed top-0 left-0 z-50"
      style={{ opacity, pointerEvents }}
    >
      <div className="overflow-hidden my-3">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: MOTION_TOKENS.duration.base,
            delay: MOTION_TOKENS.duration.fast,
          }}
          className="hero-label"
        >
          <Link href="/">travishall.design</Link>
        </motion.h1>
      </div>
    </motion.div>
  );
}
