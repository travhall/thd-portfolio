"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
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
  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Case study not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-12 md:grid-cols-[1fr_1.5fr]"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-nohemi text-4xl md:text-6xl font-bold"
            >
              {study.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground"
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
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
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
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
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
        <div className="mt-24">
          {study.sections?.map((section, index) => {
            if (section.type === "text") {
              return <TextBlock key={index} section={section} />;
            }
            if (section.type === "image-text") {
              return <ImageTextBlock key={index} section={section} />;
            }
            return null;
          })}
        </div>

        {/* Navigation */}
        <CaseStudyNavigation prevStudy={prevStudy} nextStudy={nextStudy} />
      </div>
    </motion.div>
  );
}
