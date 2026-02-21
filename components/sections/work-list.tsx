"use client";

// ---------------------------------------------------------------------------
// WorkList — natural-scroll, IntersectionObserver-driven background
//
// • Each study is a min-h-svh section in normal document flow
// • Background: IO with rootMargin "-50% 0px -50% 0px" — triggers when a
//   section crosses the viewport midpoint; setPageBg + CSS transition blends
// • Content reveal: staggered CSS transitions triggered by IO at threshold 0.15
// • Single fixed tracker (top-right) updates via IO as sections become active
// ---------------------------------------------------------------------------

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiArrowRight } from "react-icons/fi";
import type { CaseStudy } from "@/types/case-study";
import { MOTION_TOKENS } from "@/lib/tokens";
import { usePageBgContext } from "@/components/layout/page-bg-provider";

// ── OKLCH helpers ──────────────────────────────────────────────────────────

function parseOklch(value: string): [number, number, number] | null {
  // Matches both bare-number and percentage lightness: oklch(0.87 ...) or oklch(98.5% ...)
  const m = value.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) return null;
  const L = parseFloat(m[1]);
  // Normalise percentage form (0–100) to fractional (0–1)
  return [m[2] === "%" ? L / 100 : L, parseFloat(m[3]), parseFloat(m[4])];
}

function isLightPanel(oklch: string): boolean {
  const parsed = parseOklch(oklch);
  return parsed ? parsed[0] >= 0.55 : true;
}

// ── StudySection ────────────────────────────────────────────────────────────

interface StudySectionProps {
  study: CaseStudy;
  index: number;
  total: number;
  brandColor: string;
  onBecomeActive: (index: number, color: string) => void;
  onNavigate: (color: string) => void;
}

function StudySection({
  study,
  index,
  total,
  brandColor,
  onBecomeActive,
  onNavigate,
}: StudySectionProps) {
  const light  = isLightPanel(brandColor);
  const text   = light ? "text-[#1a1a1a]"      : "text-[#f0f0f0]";
  const muted  = light ? "text-[#1a1a1a]/55"   : "text-[#f0f0f0]/55";
  const border = light ? "border-[#1a1a1a]/30"  : "border-[#f0f0f0]/30";

  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(index === 0);

  // Background: fires when section center crosses viewport midpoint
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onBecomeActive(index, brandColor);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, brandColor, onBecomeActive]);

  // Reveal: fires once when 15% of the section enters the viewport
  useEffect(() => {
    if (revealed) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry], o) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          o.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealed]);

  // Shared transition base — each element adds its own delay via inline style.
  // duration-500 / duration-700 are valid Tailwind values; duration-600 is not.
  const base = "transition-all ease-out";
  const hidden = "opacity-0 translate-y-5";
  const visible = "opacity-100 translate-y-0";

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`work-title-${study.id}`}
      className="min-h-svh w-full flex flex-col justify-between px-6 sm:px-10 xl:px-16 pt-28 pb-16 md:pb-20"
    >
      {/* Spacer — pushes content to lower half, matching the old panel layout */}
      <div />

      <div className="max-w-7xl">
        {/* Meta row */}
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 ${muted} ${base} ${revealed ? visible : hidden}`}
          style={{ transitionDuration: "500ms", transitionDelay: revealed ? "0ms" : "0ms" }}
        >
          <span className="font-nohemi text-xs tabular-nums tracking-widest uppercase">
            {study.year}
          </span>
          {study.role && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-xs">{study.role}</span>
            </>
          )}
          {study.client && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-xs">{study.client}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div className="overflow-hidden pb-[0.12em]">
          <h2
            id={`work-title-${study.id}`}
            className={`font-nohemi font-medium leading-[1.02] tracking-tight pb-4 text-balance ${text} ${base} ${revealed ? visible : hidden}`}
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              transitionDuration: "700ms",
              transitionDelay: revealed ? "80ms" : "0ms",
            }}
          >
            {study.title}
          </h2>
        </div>

        {/* Description */}
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed max-w-[52ch] ${muted} ${base} ${revealed ? visible : hidden}`}
          style={{ transitionDuration: "500ms", transitionDelay: revealed ? "160ms" : "0ms" }}
        >
          {study.description}
        </p>

        {/* Tags */}
        <ul
          className={`flex gap-2 flex-wrap mt-5 ${base} ${revealed ? visible : hidden}`}
          style={{ transitionDuration: "500ms", transitionDelay: revealed ? "220ms" : "0ms" }}
          aria-label={`Tags for ${study.title}`}
        >
          {study.tags.map((tag) => (
            <li key={tag}>
              <Badge
                variant="outline"
                className={`bg-transparent hover:bg-transparent ${text} ${border}`}
              >
                {tag}
              </Badge>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          className={`mt-8 ${base} ${revealed ? visible : hidden}`}
          style={{ transitionDuration: "500ms", transitionDelay: revealed ? "280ms" : "0ms" }}
        >
          
          <Button size="lg" asChild className="group">
            <Link href={`/work/${study.id}`} onClick={() => onNavigate(brandColor)}>
              View case study 
              <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              <span className="sr-only">: {study.title}</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── WorkList ────────────────────────────────────────────────────────────────

interface WorkListProps {
  studies: CaseStudy[];
}

export function WorkList({ studies: allStudies }: WorkListProps) {
  const studies = allStudies;
  const { setPageBg, isDark } = usePageBgContext();
  const [activeIndex, setActiveIndex] = useState(0);

  const getBrandColor = useCallback(
    (study: CaseStudy) =>
      isDark
        ? (study.brandDark  ?? "oklch(0.20 0.01 0)")
        : (study.brandLight ?? "oklch(0.88 0.01 0)"),
    [isDark]
  );

  // Set initial bg on mount
  useEffect(() => {
    if (studies.length === 0) return;
    const raf = requestAnimationFrame(() => setPageBg(getBrandColor(studies[0])));
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-apply current panel's color when theme flips
  useEffect(() => {
    if (studies.length === 0) return;
    setPageBg(getBrandColor(studies[activeIndex]));
  }, [isDark, getBrandColor, setPageBg, studies, activeIndex]);

  // Called by each section's IO when it becomes the centered panel
  const handleBecomeActive = useCallback(
    (index: number, color: string) => {
      setActiveIndex(index);
      setPageBg(color);
    },
    [setPageBg]
  );

  // Tracker colors — follows the active panel's light/dark
  const activeBrandColor = getBrandColor(studies[activeIndex] ?? studies[0]);
  const trackerLight = isLightPanel(activeBrandColor);
  const trackerText   = trackerLight ? "text-[#1a1a1a]"     : "text-[#f0f0f0]";
  const trackerBorder = trackerLight ? "border-[#1a1a1a]/30" : "border-[#f0f0f0]/30";

  const [isHovered, setIsHovered] = useState(false);
  const hoverLabelVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: MOTION_TOKENS.duration.base, ease: MOTION_TOKENS.ease.quart },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: MOTION_TOKENS.duration.fast, ease: MOTION_TOKENS.ease.quart },
    },
  };

  return (
    <div>
      {/* ── Fixed header row — "work" label only ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 xl:px-16 pt-7 pb-4 pointer-events-none">
        {/* Page label */}
        <div className="overflow-hidden inline-block pointer-events-auto">
          <h1
            className="hero-label pb-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              href="/"
              aria-label="Work — return to index"
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded-sm"
            >
              <div className="overflow-hidden relative h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isHovered ? "return" : "work"}
                    variants={hoverLabelVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="block"
                  >
                    {isHovered ? "return to index" : "work"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </Link>
          </h1>
        </div>
      </header>

      {/* ── Tracker pill — sits below the nav menu button ── */}
      {/* Nav is at top-4 right-4 xl:top-8 xl:right-8 with ~40px height */}
      <div
        className={`bg-(--page-bg)/50 backdrop-blur-xs fixed top-[64px] right-4 xl:top-[82px] xl:right-8 z-40 pointer-events-none font-nohemi text-xs tabular-nums tracking-[0.2em] border rounded-full px-3 py-1 transition-colors duration-500 ${trackerText} ${trackerBorder}`}
        aria-live="polite"
        aria-label={`Case study ${activeIndex + 1} of ${studies.length}`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className="mx-1">/</span>
        <span>{String(studies.length).padStart(2, "0")}</span>
      </div>

      {/* ── Sections — natural flow ── */}
      <div>
        {studies.map((study, index) => (
          <StudySection
            key={study.id}
            study={study}
            index={index}
            total={studies.length}
            brandColor={getBrandColor(study)}
            onBecomeActive={handleBecomeActive}
            onNavigate={setPageBg}
          />
        ))}
      </div>
    </div>
  );
}
