"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";

interface NavigationProps {
  prevStudy?: CaseStudy;
  nextStudy?: CaseStudy;
}

export function CaseStudyNavigation({ prevStudy, nextStudy }: NavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-24 mb-12 grid md:grid-cols-2 gap-8"
    >
      {/* Previous Project */}
      {prevStudy && (
        <Link
          href={`/work/${prevStudy.id}`}
          className="group relative flex flex-col"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Previous Project</span>
          </div>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <Image
              src={prevStudy.coverImage}
              alt={prevStudy.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-90 transition-opacity" />
          </div>
          <h3 className="font-nohemi text-lg font-medium group-hover:text-primary transition-colors">
            {prevStudy.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {prevStudy.description}
          </p>
        </Link>
      )}

      {/* Next Project */}
      {nextStudy && (
        <Link
          href={`/work/${nextStudy.id}`}
          className="group relative flex flex-col md:ml-auto md:text-right"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 md:ml-auto">
            <span>Next Project</span>
            <ArrowRight className="h-4 w-4" />
          </div>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <Image
              src={nextStudy.coverImage}
              alt={nextStudy.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-90 transition-opacity" />
          </div>
          <h3 className="font-nohemi text-lg font-medium group-hover:text-primary transition-colors">
            {nextStudy.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {nextStudy.description}
          </p>
        </Link>
      )}
    </motion.div>
  );
}
