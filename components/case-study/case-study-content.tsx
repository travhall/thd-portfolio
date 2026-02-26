"use client";

import React from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { getCoverImage } from "@/lib/utils";
import { LedeBlock } from "./sections/lede-section";
import { TextBlock } from "./sections/text-section";
import { ImageTextBlock } from "./sections/image-text-section";
import { CaseStudyMeta } from "./case-study-meta";
import { Badge } from "@/components/ui/badge";
import { CaseStudyNavigation } from "./case-study-navigation";
import { usePageBgContext } from "@/components/layout/page-bg-provider";
import { Hero } from "@/components/layout/hero";

interface CaseStudyContentProps {
  study: CaseStudy;
  prevStudy?: CaseStudy;
  nextStudy?: CaseStudy;
}

export function CaseStudyContent({ study, prevStudy, nextStudy }: CaseStudyContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = usePageBgContext();
  const brandColor = isDark
    ? (study.brandDark ?? null)
    : (study.brandLight ?? null);

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <div className="min-h-screen relative">
        <Hero
          imageSrc={getCoverImage(study, isDark)}
          imageAlt={`${study.title} cover image`}
          pageBg={brandColor}
          imageDelay={0.3}
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
        </Hero>

        {/* Content Sections */}
        <div className="mt-24 bg-(--page-bg)/90 backdrop-blur-xl relative z-20 space-y-0">
          {study.sections.map((section, index) => (
            <div key={index} className="section-container border-b border-border/5 last:border-none">
              {section.type === "lede" && (
                <div className="flex flex-col xl:flex-row-reverse gap-10">
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
