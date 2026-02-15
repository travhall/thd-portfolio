"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MOTION_TOKENS } from "@/lib/tokens";

export function Hero() {
  const { scrollY } = useScroll();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const y = useTransform(scrollY, [0, 400], [0, 8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  // Separate blur overlay opacity transform
  const blurOpacity = useTransform(scrollY, [500, 800], [0, 1]);

  // Determine if we should show the dark image
  const shouldShowDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <>
      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl p-4 md:p-6 lg:p-8 mt-[48vh] mb-[24vh] lg:my-[24vh]"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.25 }}
          className="hero-heading mt-1"
        >
          Creating thoughtful digital experiences through design &amp; code
        </motion.p>
      </motion.div>
      {/* Hero Blur Block */}
      <motion.div
        className="absolute backdrop-blur-md h-full w-full top-0 left-0 z-10 bg-primary mix-blend-screen dark:mix-blend-multiply pointer-events-none"
        style={{ opacity: blurOpacity }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION_TOKENS.duration.slow }}
        style={{ y }}
        className="sticky top-2 z-0 aspect-3/4 md:aspect-video sm:w-[96vw] md:w-[84vw] lg:w-[72vw] xl:w-[64vw] flex items-end m-4"
      >
        {/* Background Image Container — decorative, no semantic content */}
        <div className="absolute inset-0 z-0 rounded-md border-2 border-border overflow-hidden bg-muted" role="presentation">
          {mounted && (
            <Image
              src={
                shouldShowDark
                  ? "/images/hero-dark.jpg"
                  : "/images/hero-light.jpg"
              }
              alt=""
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </motion.div>
    </>
  );
}
