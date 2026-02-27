"use client";

import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiChevronLeft, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useSyncExternalStore } from "react";
import type { CaseStudy } from "@/types/case-study";
import { Button } from "../ui";
import { usePageBgContext } from "@/components/layout/page-bg-provider";
import { getCoverImage, cn } from "@/lib/utils";

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
  const { isDark } = usePageBgContext();

  if (!study) return null;

  const coverSrc = getCoverImage(study, isDark);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-sm p-4 border border-border bg-(--page-bg)/50 backdrop-blur-xs absolute bottom-16 -right-32 w-full max-w-[20rem]"
    >
      <div className="relative aspect-video max-w-[20rem] rounded-sm overflow-hidden mb-4 z-40">
        <Image
          src={coverSrc}
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

// ── Desktop: icon-only button with hover preview ──────────────────────────────

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
    onFocus={() => onHover(study)}
    onBlur={() => onHover(null)}
    aria-label={`${direction === "prev" ? "Previous" : "Next"} case study: ${study.title}`}
    className="group relative flex flex-col p-4 rounded-sm bg-foreground/10 backdrop-blur text-foreground text-2xl transition-colors"
  >
    {direction === "prev" ? <FiChevronLeft aria-hidden="true" /> : <FiChevronRight aria-hidden="true" />}
  </Link>
);

// ── Mobile: labeled block showing direction + title ───────────────────────────

interface MobileNavItemProps {
  study: CaseStudy;
  direction: "prev" | "next";
}

const MobileNavItem = ({ study, direction }: MobileNavItemProps) => {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/work/${study.id}`}
      aria-label={`${isPrev ? "Previous" : "Next"} case study: ${study.title}`}
      className={cn(
        "group flex flex-col gap-1 p-4 rounded-sm bg-foreground/10 backdrop-blur text-foreground transition-colors hover:bg-foreground/15",
        !isPrev && "items-end"
      )}
    >
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        {isPrev && <FiChevronLeft aria-hidden="true" />}
        {isPrev ? "Previous" : "Next"}
        {!isPrev && <FiChevronRight aria-hidden="true" />}
      </span>
      <span className="text-sm font-medium line-clamp-1">
        {study.title}
      </span>
    </Link>
  );
};

// ── Main navigation component ─────────────────────────────────────────────────

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
      className="p-4 xl:p-8 mt-28 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center lg:gap-1"
    >
      {/* View all work — always visible */}
      <Button asChild variant="default" size="lg" className="group w-fit">
        <Link href="/work">
          <FiArrowLeft
            size="lg"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          View all work
        </Link>
      </Button>

      {/* Desktop: hover preview container */}
      {isDesktop && (
        <div className="preview-container w-full relative">
          <PreviewContent study={hoveredStudy} />
        </div>
      )}

      {/* Desktop: icon-only prev/next buttons with hover preview */}
      <div className="hidden lg:flex gap-1">
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

      {/* Mobile: labeled prev/next blocks with study title */}
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        {prevStudy
          ? <MobileNavItem study={prevStudy} direction="prev" />
          : <div />}
        {nextStudy
          ? <MobileNavItem study={nextStudy} direction="next" />
          : <div />}
      </div>
    </motion.div>
  );
}
