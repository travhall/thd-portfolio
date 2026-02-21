"use client";

import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiChevronLeft, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useSyncExternalStore } from "react";
import type { CaseStudy } from "@/types/case-study";
import { Button } from "../ui";

// SSR-safe media query hook — avoids the undefined→boolean flash that occurs
// when initializing with useState + useEffect, since useSyncExternalStore
// provides the correct server snapshot on first render.
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false, // server snapshot — no match on SSR
  );
}

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
      <div className="relative aspect-video max-w-[20rem] rounded-sm overflow-hidden mb-4 z-40">
        <Image
          src={study.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-background opacity-0 group-hover:opacity-90 transition-opacity" aria-hidden="true" />
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
    aria-label={`${direction === "prev" ? "Previous" : "Next"} case study: ${study.title}`}
    className="group relative flex flex-col p-4 rounded-sm bg-foreground/10 backdrop-blur text-foreground text-2xl transition-colors"
  >
    {direction === "prev" ? <FiChevronLeft aria-hidden="true" /> : <FiChevronRight aria-hidden="true" />}
  </Link>
);

interface NavigationProps {
  prevStudy?: CaseStudy;
  nextStudy?: CaseStudy;
}

export function CaseStudyNavigation({ prevStudy, nextStudy }: NavigationProps) {
  const [hoveredStudy, setHoveredStudy] = useState<CaseStudy | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="p-4 xl:p-8 mt-28 flex flex-row justify-between items-center gap-1"
    >

      <Button asChild variant="ghost" className="group">
        <Link href="/work">
          <FiArrowLeft 
            size="lg"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
            />
          View all work
        </Link>
      </Button>

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
