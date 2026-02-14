"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { TextBlock } from "./sections/text-section";
import { ImageTextBlock } from "./sections/image-text-section";
import { CaseStudyNavigation } from "./case-study-navigation";

interface CaseStudyContentProps {
  study: CaseStudy;
  prevStudy?: CaseStudy;
  nextStudy?: CaseStudy;
}

export function CaseStudyContent({
  study,
  prevStudy,
  nextStudy,
}: CaseStudyContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Separate blur overlay opacity transform — disabled when reduced motion is preferred
  const blurOpacity = useTransform(scrollY, [100, 600], shouldReduceMotion ? [0, 0] : [0, 1]);

  return (
    <div className="min-h-screen relative">
        {/* Hero Blur Block */}
        <motion.div
          className="absolute backdrop-blur-lg h-full w-full top-0 left-0 z-10 bg-primary mix-blend-screen dark:mix-blend-multiply pointer-events-none"
          style={{ opacity: blurOpacity }}
        />
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
          className="grid gap-12 md:grid-cols-[1.5fr_1fr] items-end sticky top-0 p-4 xl:p-8 z-0"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
              className="case-hero-heading"
            >
              {study.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
              className="text-xl text-muted-foreground text-balance"
            >
              {study.description}
            </motion.p>
            <div className="flex gap-2 flex-wrap">
              {study.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.5 + index * 0.1 }}
                  className="case-tag"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            className="relative aspect-4/5 md:aspect-3/4 lg:aspect-4/3 rounded-sm overflow-hidden row-start-1"
          >
            <Image
              src={study.coverImage}
              alt={study.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <div className="mt-24 bg-background/80 backdrop-blur-xl relative z-20 space-y-0">
          {study.sections?.map((section, index) => {
            return (
              <div key={index} className="section-container border-b border-border/5 last:border-none">
                {section.type === "text" && <TextBlock section={section} />}
                {section.type === "image-text" && (
                  <ImageTextBlock section={section} />
                )}
              </div>
            );
          })}
          {/* Navigation */}
          <CaseStudyNavigation prevStudy={prevStudy} nextStudy={nextStudy} />
        </div>
    </div>
  );
}
