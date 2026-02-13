"use client";

import Link from "next/link";
import Image from "next/image";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { CaseStudy } from "@/types/case-study";

interface PreviewProps {
  study: CaseStudy | null;
}

const PreviewContent = ({ study }: PreviewProps) => {
  if (!study) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="case-preview-card absolute bottom-16 -right-32 w-full max-w-[20rem]"
    >
      <div className="relative aspect-video max-w-[20rem] rounded overflow-hidden mb-4 z-40">
        <Image
          src={study.coverImage}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-90 transition-opacity" />
      </div>
      <h3 className="font-nohemi text-lg font-medium transition-colors">
        {study.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {study.description}
      </p>
    </motion.div>
  );
};

interface NavButtonProps {
  study: CaseStudy;
  direction: "prev" | "next";
  onHover: (study: CaseStudy | null) => void;
}

const NavButton = ({ study, direction, onHover }: NavButtonProps) => (
  <Link
    href={`/work/${study.id}`}
    onMouseEnter={() => onHover(study)}
    onMouseLeave={() => onHover(null)}
    className="group relative flex flex-col p-4 rounded backdrop-blur text-2xl transition-colors"
    style={{ 
      backgroundColor: "var(--case-nav-bg)",
      color: "var(--case-nav-text)"
    }}
  >
    {direction === "prev" ? <IoChevronBack /> : <IoChevronForward />}
  </Link>
);

interface NavigationProps {
  prevStudy?: CaseStudy;
  nextStudy?: CaseStudy;
}

export function CaseStudyNavigation({ prevStudy, nextStudy }: NavigationProps) {
  const [hoveredStudy, setHoveredStudy] = useState<CaseStudy | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1280); // xl breakpoint
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="sticky bottom-4 right-2 p-4 xl:p-8 -mt-28 flex flex-row place-content-end gap-1"
    >
      {isDesktop && (
        <div className="preview-container w-full relative">
          <PreviewContent study={hoveredStudy} />
        </div>
      )}

      <div className="flex gap-1">
        {prevStudy && (
          <NavButton
            study={prevStudy}
            direction="prev"
            onHover={setHoveredStudy}
          />
        )}
        {nextStudy && (
          <NavButton
            study={nextStudy}
            direction="next"
            onHover={setHoveredStudy}
          />
        )}
      </div>
    </motion.div>
  );
}
