"use client";

// ---------------------------------------------------------------------------
// Hero
//
// Shared hero layout for the home page and all case study pages.
// Owns the scroll-linked parallax, blur overlay, and LCP-safe image entrance.
//
// LCP pattern: the <img> is always opacity:1 so the browser registers it as
// an LCP candidate from first paint. A decorative bg-background overlay sits
// on top and animates out, producing a visually identical fade-in without
// blocking LCP measurement.
//
// Props
//   imageSrc    — override the default dark/light hero images (required for
//                 case study pages; omit on the home page)
//   imageAlt    — alt text; defaults to "" (decorative)
//   pageBg      — color passed to usePageBg; defaults to null (theme reset)
//   imageDelay  — entrance delay in seconds for the image; defaults to 0
//   children    — content rendered in the hero text block; defaults to the
//                 home page heading so <Hero /> works with no props
// ---------------------------------------------------------------------------

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";
import { MOTION_TOKENS, HERO_SCROLL } from "@/lib/tokens";
import { usePageBg } from "@/hooks/use-page-bg";
import { usePageBgContext } from "@/components/layout/page-bg-provider";

const HERO_SIZES =
  "(min-width: 1280px) 64vw, (min-width: 1024px) 72vw, (min-width: 768px) 84vw, (min-width: 640px) 96vw, 100vw";

interface HeroProps {
  /** Override the default dark/light hero images. Pass for case study pages. */
  imageSrc?: string;
  /** Alt text for the hero image. Defaults to "" (decorative). */
  imageAlt?: string;
  /** Background color for the page. Passed to usePageBg. Defaults to null (theme reset). */
  pageBg?: string | null;
  /** Delay in seconds before the hero image animates in. Defaults to 0. */
  imageDelay?: number;
  /** Hero text content. Defaults to the home page heading. */
  children?: React.ReactNode;
}

export function Hero({
  imageSrc,
  imageAlt = "",
  pageBg = null,
  imageDelay = 0,
  children,
}: HeroProps) {
  const { scrollY } = useScroll();
  const { isDark } = usePageBgContext();

  usePageBg(pageBg);

  const resolvedSrc =
    imageSrc ?? (isDark ? "/images/hero-dark.jpg" : "/images/hero-light.jpg");

  const y = useTransform(scrollY, HERO_SCROLL.contentRange, HERO_SCROLL.contentY);
  const opacity = useTransform(scrollY, HERO_SCROLL.contentRange, HERO_SCROLL.contentOpacity);
  const blurOpacity = useTransform(scrollY, HERO_SCROLL.blurRange, HERO_SCROLL.blurOpacity);

  return (
    <>
      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl p-4 md:p-6 lg:p-8 mt-[48vh] mb-[24vh] lg:my-[24vh] space-y-6"
        style={{ opacity }}
      >
        {children ?? (
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.25 }}
            className="hero-heading mt-1"
          >
            Creating thoughtful digital experiences through design &amp; code
          </motion.h1>
        )}
      </motion.div>

      {/* Hero Blur Block — decorative scroll-driven overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute backdrop-blur-md h-full w-full top-0 left-0 z-10 pointer-events-none"
        style={{
          opacity: blurOpacity,
          backgroundColor: "var(--hero-blur-bg)",
          mixBlendMode: "var(--hero-blur-blend)" as React.CSSProperties["mixBlendMode"],
        }}
      />

      {/* Hero Image
          Three-layer structure keeps entrance animation, clipping, and parallax
          on separate elements so transforms don't conflict.
          - Outer sticky div: entrance slide (y: 32 → 0), no scroll y
          - Card div: visual boundary (border, rounded, overflow-hidden), clips parallax
          - Parallax div: scroll-driven y drift, clipped inside the card
          - Overlay: sibling to the card (NOT inside it), so it covers the full
            container area — including the card border — from the very first paint.
            CSS opacity defaults to 1, so the block is hidden even before Framer
            Motion initializes. Fades out in sync with the entrance slide to reveal
            the card and image simultaneously. Uses --page-bg so the color always
            matches the visible page bg (including brand colors on case study pages). */}
      <motion.div
        initial={{ y: 32 }}
        animate={{ y: 0 }}
        transition={{ duration: MOTION_TOKENS.duration.slow, delay: imageDelay }}
        className="sticky top-2 z-0 aspect-3/4 md:aspect-video sm:w-[96vw] md:w-[84vw] lg:w-[72vw] xl:w-[64vw] m-4"
      >
        {/* Visual card boundary — clips the parallax movement */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Scroll parallax — contained within the card */}
          <motion.div style={{ y }} className="absolute inset-0 rounded-sm border-2 border-border">
            <Image
              src={resolvedSrc}
              alt={imageAlt}
              fill
              sizes={HERO_SIZES}
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        {/* LCP overlay — sibling to the card div, so it covers the full container
            including the card border. CSS opacity defaults to 1 so it's opaque from
            the very first paint, regardless of when Framer Motion initializes.
            The <img> stays at opacity:1 throughout so the browser counts it as the
            LCP candidate from first paint. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            backgroundColor: "var(--page-bg)",
            // Mirror the page-bg-transition timing so the overlay stays in sync
            // with the body background during cross-page color transitions.
            // Without this, --page-bg updates instantly on the overlay while the
            // body transitions over 0.5s, making the overlay rectangle visible.
            transition: "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: MOTION_TOKENS.duration.slow, delay: imageDelay }}
        />
      </motion.div>
    </>
  );
}
