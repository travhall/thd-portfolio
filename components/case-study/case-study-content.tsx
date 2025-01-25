"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { TextBlock } from "./sections/text-section";
import { ImageTextBlock } from "./sections/image-text-section";
import { CaseStudyNavigation } from "./case-study-navigation";
import { PageTransition } from "@/components/layout/page-transition";

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
  const { scrollY } = useScroll();

  // Separate blur overlay opacity transform
  const blurOpacity = useTransform(scrollY, [100, 600], [0, 1]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Case study not found</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen relative"
      >
        {/* Hero Blur Block */}
        <motion.div
          className="absolute backdrop-blur-lg h-full w-full top-0 left-0 z-10 bg-primary mix-blend-screen dark:mix-blend-multiply pointer-events-none"
          style={{ opacity: blurOpacity }}
        />
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-12 md:grid-cols-[1.5fr_1fr] items-end sticky top-0 p-4 z-0"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-nohemi text-5xl md:text-6xl font-bold text-balance"
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
            <div className="flex gap-2 flex-wrap">
              {study.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-3 py-1 bg-secondary rounded text-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/3] rounded overflow-hidden row-start-1"
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
        <div className="mt-24 bg-background/80 backdrop-blur-xl relative z-20">
          {study.sections?.map((section, index) => {
            if (section.type === "text") {
              return <TextBlock key={index} section={section} />;
            }
            if (section.type === "image-text") {
              return <ImageTextBlock key={index} section={section} />;
            }
            return null;
          })}
          {/* Navigation */}
          <CaseStudyNavigation prevStudy={prevStudy} nextStudy={nextStudy} />
        </div>
      </motion.div>
    </PageTransition>
  );
}
