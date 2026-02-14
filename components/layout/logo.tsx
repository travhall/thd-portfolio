"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MOTION_TOKENS } from "@/lib/tokens";

export function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-4 xl:p-8 fixed top-0 left-0 z-50">
        <div className="overflow-hidden my-3">
          <h1 className="hero-label opacity-0">travishall.design</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 xl:p-8 fixed top-0 left-0 z-50">
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
          travishall.design
        </motion.h1>
      </div>
    </div>
  );
}
