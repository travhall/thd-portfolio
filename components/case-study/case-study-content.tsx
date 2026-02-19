"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { LedeBlock } from "./sections/lede-section";
import { TextBlock } from "./sections/text-section";
import { ImageTextBlock } from "./sections/image-text-section";
import { CaseStudyMeta } from "./case-study-meta";
import { Badge } from "@/components/ui/badge";
import { CaseStudyNavigation } from "./case-study-navigation";

// Scroll transform ranges for the hero section.
// HERO_SCROLL_RANGE: the image fades and shifts as the user scrolls into the content (0–400px).
// BLUR_SCROLL_RANGE: the frosted-glass overlay fades in slightly later (500–800px), after the
// hero text has cleared, so both effects don't compete. The 400–500px gap is intentional — it
// gives the hero fade a moment to settle before the blur overlay begins appearing.
const HERO_SCROLL_RANGE = [0, 400];
const HERO_OPACITY_OUTPUT = [1, 0.2];
const HERO_Y_OUTPUT = [0, 8];
const BLUR_SCROLL_RANGE = [500, 800];
const BLUR_OPACITY_OUTPUT = [0, 1];

interface CaseStudyContentProps {
  study: CaseStudy;
  prevStudy?: CaseStudy;
  nextStudy?: CaseStudy;
}

export function CaseStudyContent({ study, prevStudy, nextStudy }: CaseStudyContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, HERO_SCROLL_RANGE, shouldReduceMotion ? [0, 0] : HERO_Y_OUTPUT);
  const opacity = useTransform(scrollY, HERO_SCROLL_RANGE, shouldReduceMotion ? [1, 1] : HERO_OPACITY_OUTPUT);
  const blurOpacity = useTransform(
    scrollY,
    BLUR_SCROLL_RANGE,
    shouldReduceMotion ? [0, 0] : BLUR_OPACITY_OUTPUT,
  );

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <div className="min-h-screen relative">
        {/* Hero Blur Block */}
        <motion.div
          aria-hidden="true"
          className="absolute backdrop-blur-md h-full w-full top-0 left-0 z-10 pointer-events-none"
          style={{
            opacity: blurOpacity,
            backgroundColor: "var(--hero-blur-bg)",
            mixBlendMode: "var(--hero-blur-blend)" as React.CSSProperties["mixBlendMode"],
          }}
        />

        {/* Hero Text Block */}
        <motion.div
          className="relative z-10 max-w-2xl p-4 md:p-6 lg:p-8 mt-[48vh] mb-[24vh] lg:my-[24vh] space-y-6"
          style={{ opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="case-hero-heading"
          >
            {study.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground text-balance"
          >
            {study.description}
          </motion.p>
          <ul className="flex gap-2 flex-wrap" aria-label="Tags">
            {study.tags.map((tag, index) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Badge variant="secondary">{tag}</Badge>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{ y }}
          className="sticky top-2 z-0 aspect-3/4 md:aspect-video sm:w-[96vw] md:w-[84vw] lg:w-[72vw] xl:w-[64vw] flex items-end m-4"
        >
          <div className="absolute inset-0 z-0 rounded-sm border-2 border-border overflow-hidden bg-muted">
            <Image
              src={study.coverImage}
              alt={`${study.title} — cover image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 84vw, 64vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="mt-24 bg-background/80 backdrop-blur-xl relative z-20 space-y-0">
          {study.sections.map((section, index) => (
            <div key={index} className="section-container border-b border-border/5 last:border-none">
              {section.type === "lede" && (
                <div className="space-y-10 flex flex-col xl:flex-row-reverse">
                  <LedeBlock section={section} links={study.links} />
                  <CaseStudyMeta study={study} />
                </div>
              )}
              {section.type === "text" && <TextBlock section={section} />}
              {section.type === "image-text" && <ImageTextBlock section={section} />}
            </div>
          ))}
          <CaseStudyNavigation prevStudy={prevStudy} nextStudy={nextStudy} />
        </div>
      </div>
    </MotionConfig>
  );
}
