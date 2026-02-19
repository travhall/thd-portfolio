"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";
import { MOTION_TOKENS } from "@/lib/tokens";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Large-title index layout — animated entrance per row.
//
// Each row self-triggers when it enters the viewport. Sequence per entry:
//   1. Rule wipes in left→right (clip-path)
//   2. Title rises out of a masked overflow container
//   3. Metadata row (year / tags / description) staggers in, child by child
//
// Hover model (parent-coordinated):
//   - hoveredId is tracked in CaseStudies and passed down
//   - The hovered row stays at full opacity with its bg image visible
//   - All other rows animate to opacity 0.35
//
// useReducedMotion collapses all transforms to simple opacity fades.
// ---------------------------------------------------------------------------

// ── Variant factories ──────────────────────────────────────────────────────

const ruleVariants = (reduced: boolean): Variants => ({
  hidden: { clipPath: reduced ? "none" : "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: reduced ? 0 : MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
});

const titleVariants = (reduced: boolean): Variants => ({
  hidden: { y: reduced ? 0 : "105%", opacity: reduced ? 0 : 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: MOTION_TOKENS.duration.slow,
      ease: MOTION_TOKENS.ease.expo,
      delay: reduced ? 0 : 0.1,
    },
  },
});

const metaItemVariants = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
});

const metaContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.35 },
  },
};

const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const wordVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
};

// ── Types ──────────────────────────────────────────────────────────────────

interface CaseStudiesProps {
  studies: CaseStudy[];
}

interface StudyRowProps {
  study: CaseStudy;
  index: number;
  /** True when another row is hovered — this row should dim */
  dimmed: boolean;
  /** True when this specific row is hovered */
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ── StudyRow ───────────────────────────────────────────────────────────────

function StudyRow({ study, index, dimmed, active, onMouseEnter, onMouseLeave }: StudyRowProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.article
      aria-labelledby={`study-title-${study.id}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{ opacity: dimmed ? 0.35 : 1 }}
      transition={{ duration: 0.4, ease: MOTION_TOKENS.ease.expo }}
      className="relative"
    >
      {/* Rule — wipes in before content */}
      <motion.div
        aria-hidden="true"
        variants={ruleVariants(reduced)}
        className="h-px w-full bg-border"
      />

      <Link
        href={`/work/${study.id}`}
        aria-labelledby={`study-title-${study.id}`}
        className="relative block pt-6 pb-10 md:pb-14 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      >
        {/* Background image — only visible when this row is active */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-[--ease-expo]"
          style={{ opacity: active ? 1 : 0 }}
        >
          <Image
            src={study.coverImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale"
            style={{ opacity: 0.06 }}
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-background/60" />
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-background/40" />
        </div>

        {/* ── Title ── */}
        <div className="relative overflow-hidden pb-[0.12em]">
          <motion.h3
            id={`study-title-${study.id}`}
            variants={titleVariants(reduced)}
            className="font-nohemi font-medium leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)" }}
          >
            {study.title}
          </motion.h3>
        </div>

        {/* ── Metadata row ── */}
        <motion.div
          variants={metaContainerVariants}
          className="relative flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 mt-2 md:mt-3"
        >
          <motion.span
            variants={metaItemVariants(reduced)}
            className="font-nohemi text-xs text-muted-foreground tabular-nums tracking-widest shrink-0"
          >
            {study.year}
          </motion.span>

          <motion.ul
            variants={metaItemVariants(reduced)}
            className="flex gap-2 flex-wrap shrink-0"
            aria-label="Tags"
          >
            {study.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary">{tag}</Badge>
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={metaItemVariants(reduced)}
            className="text-sm text-muted-foreground leading-relaxed sm:ml-auto sm:text-right max-w-[40ch]"
          >
            {study.description}
          </motion.p>
        </motion.div>
      </Link>
    </motion.article>
  );
}

// ── CaseStudies ────────────────────────────────────────────────────────────

export function CaseStudies({ studies }: CaseStudiesProps) {
  const featured = studies.filter((s) => s.featured);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="relative z-10 bg-background/90 backdrop-blur px-4 xl:px-8 pt-[12vh] pb-[20vh]"
    >
      {/* Section heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
        className="mb-12 md:mb-16"
      >
        <div className="flex flex-row gap-2">
          {["Featured", "work"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                variants={wordVariants}
                className="font-nohemi text-xl md:text-2xl lg:text-3xl font-light"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Entry list */}
      <div className="mx-4">
        {featured.map((study, i) => (
          <StudyRow
            key={study.id}
            study={study}
            index={i}
            dimmed={hoveredId !== null && hoveredId !== study.id}
            active={hoveredId === study.id}
            onMouseEnter={() => setHoveredId(study.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
        {/* Closing rule */}
        <div className="h-px w-full bg-border" aria-hidden="true" />
      </div>
    </section>
  );
}
