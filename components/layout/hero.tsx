"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Hero() {
  const { scrollY } = useScroll();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform values for zoom-out/recede effect
  const scale = useTransform(scrollY, [0, 900], [1, 0.6]);
  const y = useTransform(scrollY, [0, 400], [0, 8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  // Separate blur overlay opacity transform
  const blurOpacity = useTransform(scrollY, [100, 400], [0, 1]);

  // Determine if we should show the dark image
  const shouldShowDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <>
      {/* Hero Blur Block */}
      <motion.div
        className="absolute backdrop-blur-lg h-full w-full top-0 left-0 z-10 bg-brand-2-600 dark:bg-accent-500 mix-blend-screen dark:mix-blend-multiply pointer-events-none"
        style={{ opacity: blurOpacity }}
      />
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ scale, y }}
        className="sticky top-4 z-0 h-[80dvh] flex items-end m-4"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
          {mounted && (
            <Image
              src={
                shouldShowDark
                  ? "/images/hero-dark.jpg"
                  : "/images/hero-light.jpg"
              }
              alt="Hero background"
              fill
              className="object-cover object-right-bottom"
              priority
            />
          )}
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-2xl p-4 md:p-6 lg:p-8"
          style={{ opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-nohemi text-lg sm:text-xl font-medium text-balance"
          >
            travis hall <span className="text-primary/80 font-bold">dot</span>{" "}
            design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-balance"
          >
            Creating thoughtful digital experiences through design &amp; code
          </motion.p>
        </motion.div>
      </motion.section>
    </>
  );
}
