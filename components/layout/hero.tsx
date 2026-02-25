"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";
import { MOTION_TOKENS, HERO_SCROLL } from "@/lib/tokens";
import { usePageBg } from "@/hooks/use-page-bg";
import { usePageBgContext } from "@/components/layout/page-bg-provider";

export function Hero() {
  const { scrollY } = useScroll();
  // isDark starts false on SSR — light image renders first, same as before.
  // Avoids the mounted+useTheme pattern by reusing the provider's observer.
  const { isDark } = usePageBgContext();

  // Reset page background to theme default when home page mounts.
  // Handles the case where the user navigates home from a brand-colored page.
  usePageBg(null);

  const y = useTransform(scrollY, HERO_SCROLL.contentRange, HERO_SCROLL.contentY);
  const opacity = useTransform(scrollY, HERO_SCROLL.contentRange, HERO_SCROLL.contentOpacity);
  const blurOpacity = useTransform(scrollY, HERO_SCROLL.blurRange, HERO_SCROLL.blurOpacity);

  return (
    <>
      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl p-4 md:p-6 lg:p-8 mt-[48vh] mb-[24vh] lg:my-[24vh]"
        style={{ opacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.25 }}
          className="hero-heading mt-1"
        >
          Creating thoughtful digital experiences through design &amp; code
        </motion.h1>
      </motion.div>
      {/* Hero Blur Block — decorative overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute backdrop-blur-md h-full w-full top-0 left-0 z-10 pointer-events-none"
        style={{
          opacity: blurOpacity,
          backgroundColor: "var(--hero-blur-bg)",
          mixBlendMode: "var(--hero-blur-blend)" as React.CSSProperties["mixBlendMode"],
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION_TOKENS.duration.slow }}
        style={{ y }}
        className="sticky top-2 z-0 aspect-3/4 md:aspect-video sm:w-[96vw] md:w-[84vw] lg:w-[72vw] xl:w-[64vw] flex items-end m-4"
      >
        {/* Background Image Container — decorative, no semantic content */}
        <div
          className="absolute inset-0 z-0 rounded-sm border-2 border-border overflow-hidden bg-muted"
          aria-hidden="true"
        >
          <Image
            src={isDark ? "/images/hero-dark.jpg" : "/images/hero-light.jpg"}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </>
  );
}
