"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { CaseStudy } from "@/types/case-study";
import { MOTION_TOKENS } from "@/lib/tokens";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Two-column offset layout. Cards sit in a loose two-column grid where the
// right column is pushed down, creating a staggered, editorial rhythm.
// Text lives below each image — not overlaid — so the image breathes.
// ---------------------------------------------------------------------------

// Per-card config: which column (0 = left, 1 = right) and relative height.
// Adjust these to tune the visual weight distribution across the four cards.
const CARD_CONFIG = [
  { col: 0, aspectClass: "aspect-[3.5/3]" },       // left,  portrait
  { col: 1, aspectClass: "aspect-[3/3.5]" },       // right, tall portrait
  { col: 0, aspectClass: "aspect-[3/3.5]" },       // left,  landscape
  { col: 1, aspectClass: "aspect-[3.5/3]" },       // right, portrait
] as const;

const headingContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headingWordVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
};

interface CaseStudiesProps {
  studies: CaseStudy[];
}

// Module-scope so it's not recreated on every render.
function StudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const config = CARD_CONFIG[index] ?? { col: index % 2, aspectClass: "aspect-[3/4]" };

  return (
    <motion.article
      aria-labelledby={`study-title-${study.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.ease.expo,
        // Left column enters slightly before right
        delay: config.col === 0 ? 0 : 0.12,
      }}
      style={{ gridColumn: config.col === 0 ? 1 : 2 }}
      className="flex flex-col gap-4 group max-w-96"
    >
      {/* Image block */}
      <Link
        href={`/work/${study.id}`}
        aria-labelledby={`study-title-${study.id}`}
        className="relative block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className={`relative w-full ${config.aspectClass}`}>
          <Image
            src={study.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover grayscale opacity-30 transition-all duration-700 ease-[--ease-expo] group-hover:opacity-60 group-hover:grayscale-0"
            priority={index < 2}
          />
          {/* Subtle vignette at the bottom edge only */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/30 to-transparent pointer-events-none"
          />
        </div>

        {/* Arrow — top-right corner, appears on hover */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-[--ease-expo]"
        >
          <FiArrowUpRight className="h-4 w-4 text-foreground" />
        </div>
      </Link>

      {/* Text block — outside the image */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            id={`study-title-${study.id}`}
            className="font-nohemi text-xl md:text-2xl font-medium leading-tight tracking-tight"
          >
            <Link
              href={`/work/${study.id}`}
              className="hover:opacity-60 transition-opacity duration-200 focus-visible:outline-none focus-visible:underline"
            >
              {study.title}
            </Link>
          </h3>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {study.year}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[48ch]">
          {study.description}
        </p>

        <ul className="flex gap-2 flex-wrap mt-1" aria-label="Tags">
          {study.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Badge variant="outline">{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function CaseStudies({ studies }: CaseStudiesProps) {
  const featured = studies.filter((s) => s.featured);

  return (
    <section
      id="work"
      className="relative z-10 bg-background/90 backdrop-blur px-4 xl:px-8 pt-[12vh] pb-[20vh]"
    >
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="overflow-hidden mb-16 md:mb-24"
      >
        <motion.div
          variants={headingContainerVariants}
          className="flex flex-row gap-2"
        >
          {["Featured", "work"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                variants={headingWordVariants}
                className="font-nohemi text-xl md:text-2xl lg:text-3xl font-light"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/*
        Two-column grid. The right column is offset downward via padding-top
        so the cards feel staggered rather than gridded.
        On mobile this collapses to a single column.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 xl:gap-x-48 max-w-7xl mx-auto">
        {/* Left column */}
        <div className="flex flex-col gap-20 lg:gap-32 xl:gap-48">
          {featured
            .filter((_, i) => (CARD_CONFIG[i]?.col ?? i % 2) === 0)
            .map((study, i) => {
              const originalIndex = featured.indexOf(study);
              return <StudyCard key={study.id} study={study} index={originalIndex} />;
            })}
        </div>

        {/* Right column — pushed down further for a more pronounced offset */}
        <div className="flex flex-col gap-20 lg:gap-32 xl:gap-48 md:pt-[32vh]">
          {featured
            .filter((_, i) => (CARD_CONFIG[i]?.col ?? i % 2) === 1)
            .map((study) => {
              const originalIndex = featured.indexOf(study);
              return <StudyCard key={study.id} study={study} index={originalIndex} />;
            })}
        </div>
      </div>
    </section>
  );
}
