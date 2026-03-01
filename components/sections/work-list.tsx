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
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiArrowRight } from "react-icons/fi";
import type { CaseStudy } from "@/types/case-study";
import { MOTION_TOKENS } from "@/lib/tokens";
import { usePageBgContext } from "@/components/layout/page-bg-provider";
import { isLightColor, getCoverImage, getBrandColor, getBrandContrastClasses } from "@/lib/utils";

// ── CoverImagePanel Removed (moved inside StudySection) ─────────────────────

// ── StudySection ────────────────────────────────────────────────────────────

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  }),
};

interface StudySectionProps {
  study: CaseStudy;
  index: number;
  total: number;
  brandColor: string;
  isDark: boolean;
  onBecomeActive: (index: number, color: string) => void;
  onNavigate: (color: string) => void;
}

function StudySection({
  study,
  index,
  total,
  brandColor,
  isDark,
  onBecomeActive,
  onNavigate,
}: StudySectionProps) {
  const light = isLightColor(brandColor);
  const { text, muted, border } = getBrandContrastClasses(light);
  const src = getCoverImage(study, isDark);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(index === 0);

  // Map the scroll progress of *this specific section* to opacity/blur.
  // "start start" = top of section hits top of viewport (where it sticks)
  // "end start" = bottom of section hits top of viewport (fully scrolled past)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"]);
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

  // Reveal: observe the content div so the animation plays as content enters view.
  // The section is min-h-svh with content pushed to the bottom half — observing
  // the section at threshold:0.15 would fire while content is still off-screen.
  useEffect(() => {
    if (revealed) return;
    const el = contentRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry], o) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          o.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealed]);

  const animate = revealed ? "visible" : "hidden";

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`work-title-${study.id}`}
      data-snap
      className="relative min-h-svh w-full flex flex-col justify-center p-6 sm:p-10 xl:p-16"
    >
      {/* ── Sticky Image — positioned half-off right side, scrolls naturally ── */}
      <div className={`hidden md:block absolute right-[-25vw] top-0 ${index === total - 1 ? 'bottom-0' : 'bottom-[-100vh]'} w-[55vw] pointer-events-none z-0`}>
        {/* A 100vh sticky flex container perfectly aligns its bottom limit with the viewport bottom, pushing the image up exactly as the section ends */}
        <div className="sticky top-0 h-screen flex flex-col justify-center w-full">
          {/* Outer div handles scroll-tied exit (opacity & blur) */}
          <motion.div
            style={{ opacity: imageOpacity, filter }}
            className="w-full aspect-video sm:w-[96vw] md:w-[84vw] lg:w-[72vw] xl:w-[64vw] relative"
          >
            {/* Inner div handles entrance animation (slide up & fade in) */}
            <motion.div
              className="absolute inset-0"
              variants={itemVariants}
              initial="hidden"
              animate={animate}
              custom={0.25} // Glides in slightly after the title (0.08) and description (0.16)
            >
              <Image
                src={src}
                alt={`${study.title} cover image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 84vw, 64vw"
                className="object-cover border-border border shadow-lg"
                priority={index === 0}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-lg lg:max-w-3xl xl:max-w-4xl lg:ml-[5vw] xl:ml-[10vw]">
        {/* Meta row */}
        <motion.div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 ${muted}`}
          variants={itemVariants}
          initial="hidden"
          animate={animate}
          custom={0}
        >
          <span className="font-nohemi font-black text-xs tabular-nums tracking-widest uppercase">
            {study.year}
          </span>
          {study.role && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-xs font-bold">{study.role}</span>
            </>
          )}
          {study.client && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-xs font-bold">{study.client}</span>
            </>
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          id={`work-title-${study.id}`}
          className={`font-nohemi font-bold leading-[1.02] tracking-tight pb-4 text-balance ${text}`}
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          variants={itemVariants}
          initial="hidden"
          animate={animate}
          custom={0.08}
        >
          {study.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className={`mt-5 text-base md:text-lg leading-relaxed max-w-[52ch] ${muted}`}
          variants={itemVariants}
          initial="hidden"
          animate={animate}
          custom={0.16}
        >
          {study.description}
        </motion.p>

        {/* Tags */}
        <motion.ul
          className="flex gap-2 flex-wrap mt-5"
          aria-label={`Tags for ${study.title}`}
          variants={itemVariants}
          initial="hidden"
          animate={animate}
          custom={0.22}
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
        </motion.ul>

        {/* CTA */}
        <motion.div
          className="mt-8"
          variants={itemVariants}
          initial="hidden"
          animate={animate}
          custom={0.28}
        >
          <Button size="lg" asChild className="group">
            <Link href={`/work/${study.id}`} onClick={() => onNavigate(brandColor)}>
              View case study
              <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              <span className="sr-only">: {study.title}</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ── WorkList ────────────────────────────────────────────────────────────────

interface WorkListProps {
  studies: CaseStudy[];
  className?: string;
}

export function WorkList({ studies, className }: WorkListProps) {
  const { setPageBg, isDark } = usePageBgContext();
  const [activeIndex, setActiveIndex] = useState(0);

  // Set initial bg on mount
  useEffect(() => {
    if (studies.length === 0) return;
    const raf = requestAnimationFrame(() => setPageBg(getBrandColor(studies[0], isDark)));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-apply current panel's color when theme flips
  useEffect(() => {
    if (studies.length === 0) return;
    setPageBg(getBrandColor(studies[activeIndex], isDark));
  }, [isDark, setPageBg, studies, activeIndex]);

  // Scoped scroll-snap: add class to <html> on mount, clean up on unmount.
  // CSS rules keyed on .work-page ensure snap only applies to this page.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("work-page");
    return () => html.classList.remove("work-page");
  }, []);

  // Called by each section's IO when it becomes the centered panel
  const handleBecomeActive = useCallback(
    (index: number, color: string) => {
      setActiveIndex(index);
      setPageBg(color);
    },
    [setPageBg]
  );

  // Tracker colors — follows the active panel's light/dark
  const activeBrandColor = getBrandColor(studies[activeIndex] ?? studies[0], isDark);
  const trackerLight = isLightColor(activeBrandColor);
  const { text: trackerText, border: trackerBorder } = getBrandContrastClasses(trackerLight);

  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [trackerVisible, setTrackerVisible] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Hide tracker when user scrolls past the last study into the contact callout.
  // rootMargin "-50% 0px 0px 0px" makes the effective root the bottom half of the
  // viewport. The IO only fires on enter/exit of that zone; when not intersecting,
  // boundingClientRect.top tells us which side the sentinel exited from:
  //   below midpoint → we're back in the work list → show tracker
  //   above midpoint → contact section has taken over → hide tracker
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setTrackerVisible(entry.boundingClientRect.top >= window.innerHeight / 2);
        }
      },
      { rootMargin: "-50% 0px 0px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
    <div className={`overflow-x-clip min-h-screen ${className || ""}`}>
      {/* ── Fixed header row — "work" label only ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 xl:px-16 pt-7 pb-4 pointer-events-none">
        {/* Page label */}
        <div className="overflow-hidden inline-block pointer-events-auto">
          <h1 className="hero-label pb-1">
            <Link
              href="/"
              aria-label={isHovered ? "Return to index" : "Work"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              className="block focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-sm"
            >
              <div className="overflow-hidden relative h-[1.2em]" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isHovered ? "return" : "work"}
                    variants={shouldReduceMotion ? undefined : hoverLabelVariants}
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
      {/* initial={false} skips the entrance animation on page load; subsequent
          re-mounts (scroll back up) do animate in via initial/animate props */}
      <AnimatePresence initial={false}>
        {trackerVisible && (
          <motion.div
            key="tracker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`bg-(--page-bg)/50 backdrop-blur-xs fixed top-[64px] right-4 xl:top-24 xl:right-7 z-40 pointer-events-none font-nohemi text-xs tabular-nums tracking-[0.2em] border rounded-full px-3 py-1 transition-colors duration-500 ${trackerText} ${trackerBorder}`}
            aria-live="polite"
          >
            {/* Screen-reader text: announced on change, aria-label would be static */}
            <span className="sr-only">
              Case study {activeIndex + 1} of {studies.length}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
                aria-hidden="true"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="mx-1" aria-hidden="true">/</span>
            <span aria-hidden="true">{String(studies.length).padStart(2, "0")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sections — natural flow ── */}
      <div>
        {studies.map((study, index) => (
          <StudySection
            key={study.id}
            study={study}
            index={index}
            total={studies.length}
            brandColor={getBrandColor(study, isDark)}
            isDark={isDark}
            onBecomeActive={handleBecomeActive}
            onNavigate={setPageBg}
          />
        ))}
        {/* Sentinel — observed to hide the tracker when the contact callout takes over */}
        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      </div>
    </div>
  );
}
