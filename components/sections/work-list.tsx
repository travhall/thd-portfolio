"use client";

// ---------------------------------------------------------------------------
// WorkList — natural-scroll redesign
//
// Architecture:
//   • Each case study is a full-viewport section (min-h-svh) that scrolls
//     naturally — no sticky stacking, no scroll-snap, no JS position math.
//
//   • Background: IntersectionObserver on each section with rootMargin set so
//     the trigger fires when the section crosses the vertical midpoint of the
//     viewport. On entry, setPageBg() writes the brand color directly to
//     --page-bg on <html>. The existing CSS transition (0.5s ease) handles the
//     visible blend. No per-frame updates, no lerp lag.
//
//   • Content reveal: a second IntersectionObserver (threshold 0.15) drives a
//     CSS class toggle that triggers enter animations via Tailwind transitions.
//     Fires once per section — clean, performant, no scroll math.
//
//   • Pointer events: not needed — sections are normal flow, all interactive.
//
//   • Lenis: still disabled on /work (smooth-scroll.tsx) since we don't want
//     the lerp on a page with deliberate per-section color transitions.
// ---------------------------------------------------------------------------

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FiArrowUpRight } from "react-icons/fi";
import type { CaseStudy } from "@/types/case-study";
import { MOTION_TOKENS } from "@/lib/tokens";
import { usePageBgContext } from "@/components/layout/page-bg-provider";

// ── OKLCH helpers ──────────────────────────────────────────────────────────

function parseOklch(value: string): [number, number, number] | null {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) return null;
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
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
  onVisible: (color: string) => void;
  onNavigate: (color: string) => void;
}

function StudySection({ study, index, total, brandColor, onVisible, onNavigate }: StudySectionProps) {
  const light  = isLightPanel(brandColor);
  const text   = light ? "text-[#1a1a1a]"      : "text-[#f0f0f0]";
  const muted  = light ? "text-[#1a1a1a]/55"   : "text-[#f0f0f0]/55";
  const border = light ? "border-[#1a1a1a]/25"  : "border-[#f0f0f0]/25";

  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(index === 0);

  // ── Background trigger ───────────────────────────────────────────────────
  // Fires when the section crosses the vertical midpoint of the viewport.
  // rootMargin "-50% 0px -50% 0px" means the intersection box is a 1px
  // horizontal stripe at the exact center — entry fires on the way down
  // and exit fires on the way back up, so the bg tracks which section
  // owns the center of the screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const bgObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(brandColor);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    bgObserver.observe(el);
    return () => bgObserver.disconnect();
  }, [brandColor, onVisible]);

  // ── Content reveal trigger ───────────────────────────────────────────────
  // Fires once when 15% of the section is visible. Sets `revealed` which
  // drives the transition classes below. Disconnects after first trigger.
  useEffect(() => {
    if (revealed) return; // first section starts revealed
    const el = sectionRef.current;
    if (!el) return;

    const revealObserver = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    revealObserver.observe(el);
    return () => revealObserver.disconnect();
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`work-title-${study.id}`}
      className="min-h-svh w-full flex flex-col justify-between px-6 sm:px-10 xl:px-16 pt-28 pb-16 md:pb-20"
    >
      {/* Counter */}
      <div className="flex justify-end">
        <span
          className={`font-nohemi text-xs tabular-nums tracking-[0.2em] transition-opacity duration-500 ${muted} ${revealed ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="max-w-7xl">
        {/* Meta */}
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 transition-all duration-500 delay-75 ${muted} ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-nohemi text-xs tabular-nums tracking-widest uppercase">{study.year}</span>
          {study.role   && <><span aria-hidden="true">·</span><span className="text-xs">{study.role}</span></>}
          {study.client && <><span aria-hidden="true">·</span><span className="text-xs">{study.client}</span></>}
        </div>

        {/* Title */}
        <div className="overflow-hidden pb-[0.12em]">
          <h2
            id={`work-title-${study.id}`}
            className={`font-nohemi font-medium leading-[1.02] tracking-tight pb-4 transition-all duration-700 delay-100 ${text} ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            {study.title}
          </h2>
        </div>

        {/* Body */}
        <div
          className={`transition-all duration-500 delay-200 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className={`mt-5 text-base md:text-lg leading-relaxed max-w-[52ch] ${muted}`}>
            {study.description}
          </p>

          <ul className="flex gap-2 flex-wrap mt-5" aria-label={`Tags for ${study.title}`}>
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

          <div className="mt-8">
            <Link
              href={`/work/${study.id}`}
              onClick={() => onNavigate(brandColor)}
              className={`group/cta inline-flex items-center gap-2 text-sm font-medium border-b pb-px transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm ${text} ${border} hover:border-current/70 focus-visible:ring-current`}
            >
              View case study
              <FiArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">: {study.title}</span>
            </Link>
          </div>
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

  const getBrandColor = useCallback(
    (study: CaseStudy) =>
      isDark
        ? (study.brandDark  ?? "oklch(0.20 0.01 0)")
        : (study.brandLight ?? "oklch(0.88 0.01 0)"),
    [isDark]
  );

  // Set the initial background to the first study's color on mount.
  // One rAF delay so the page-bg-transition CSS class is present and the
  // blend animates rather than snapping on first paint.
  useEffect(() => {
    if (studies.length === 0) return;
    const raf = requestAnimationFrame(() => {
      setPageBg(getBrandColor(studies[0]));
    });
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When dark/light mode changes, recompute and re-apply the first panel's
  // color (the IO will fire for whichever is currently centered on next scroll,
  // but we need the initial state to be correct immediately).
  useEffect(() => {
    if (studies.length === 0) return;
    setPageBg(getBrandColor(studies[0]));
  }, [isDark, getBrandColor, setPageBg, studies]);

  // Stable callback passed to each section's IO so they can update the bg.
  const handleVisible = useCallback(
    (color: string) => setPageBg(color),
    [setPageBg]
  );

  const [isHovered, setIsHovered] = useState(false);
  const hoverLabelVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: MOTION_TOKENS.duration.base, ease: MOTION_TOKENS.ease.quart } },
    exit:    { y: -20, opacity: 0, transition: { duration: MOTION_TOKENS.duration.fast, ease: MOTION_TOKENS.ease.quart } },
  };

  return (
    <div>
      {/* Fixed page label */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 xl:px-16 pt-7 pb-4 flex items-center pointer-events-none">
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

      {/* Sections — natural flow, no sticky, no snap */}
      <div>
        {studies.map((study, index) => (
          <StudySection
            key={study.id}
            study={study}
            index={index}
            total={studies.length}
            brandColor={getBrandColor(study)}
            onVisible={handleVisible}
            onNavigate={setPageBg}
          />
        ))}
      </div>
    </div>
  );
}
