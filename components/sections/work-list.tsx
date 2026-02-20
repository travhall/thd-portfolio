"use client";

// ---------------------------------------------------------------------------
// /work page — sticky full-viewport panel layout with crossfade transitions
//
// Crossfade model:
//   Panel 0 is always opacity 1 (base layer). Panels 1..n start at opacity 0.
//   The Lenis handler directly mutates el.style.opacity + el.style.transform
//   on every scroll tick — no React state, no re-renders, full 60fps.
//
//   Because the incoming panel fades in on top of the previous panel
//   (which is still sticky and fully visible), you see a genuine color blend.
//
// Scroll model:
//   Each panel gets one full viewport of scroll depth.
//   Panel i starts fading in at relativeScroll = i * vh.
//   FADE_ZONE controls how quickly the fade completes (as fraction of vh).
// ---------------------------------------------------------------------------

import { useRef, useState, useCallback, useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FiArrowUpRight } from "react-icons/fi";
import type { CaseStudy } from "@/types/case-study";
import { MOTION_TOKENS } from "@/lib/tokens";

// ── OKLCH helpers ──────────────────────────────────────────────────────────

function parseOklch(value: string): [number, number, number] | null {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) return null;
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
}

/** L >= 0.55 → light background → use dark text */
function isLightPanel(oklch: string): boolean {
  const parsed = parseOklch(oklch);
  return parsed ? parsed[0] >= 0.55 : true;
}

// Each panel occupies one full vh of scroll depth.
// FADE_ZONE = how much of that vh is used for the crossfade (0–1).
// 0.4 = fade completes in the first 40% of each panel's scroll zone.
const FADE_ZONE = 0.4;

// How many px the content translates upward as the panel fades in.
const CONTENT_RISE_PX = 48;

// ── Panel content entrance variants ────────────────────────────────────────

const panelContentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const panelItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
};

// ── StudyPanel ─────────────────────────────────────────────────────────────

interface StudyPanelProps {
  study: CaseStudy;
  index: number;
  total: number;
  brandColor: string;
  setPanelEl: (el: HTMLElement | null) => void;
  setContentEl: (el: HTMLDivElement | null) => void;
}

function StudyPanel({
  study,
  index,
  total,
  brandColor,
  setPanelEl,
  setContentEl,
}: StudyPanelProps) {
  const light = isLightPanel(brandColor);
  const text = light ? "text-[#1a1a1a]" : "text-[#f0f0f0]";
  const muted = light ? "text-[#1a1a1a]/55" : "text-[#f0f0f0]/55";
  const borderCls = light ? "border-[#1a1a1a]/25" : "border-[#f0f0f0]/25";

  return (
    <article
      ref={setPanelEl}
      aria-labelledby={`work-panel-title-${study.id}`}
      className="sticky top-0 h-svh w-full overflow-hidden"
      style={{
        backgroundColor: brandColor,
        opacity: index === 0 ? 1 : 0,
        zIndex: index + 1,
      }}
    >
      {/* Subtle cover image texture */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image
          src={study.coverImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
          style={{ opacity: 0.04 }}
          priority={index < 2}
        />
      </div>

      <div className="relative h-full flex flex-col justify-between px-6 sm:px-10 xl:px-16 pt-20 pb-10 md:pb-14">
        {/* Panel counter — top right */}
        <div className="flex justify-end">
          <span
            className={`font-nohemi text-xs tabular-nums tracking-[0.2em] ${muted}`}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/*
          Content wrapper — mutated by Lenis handler for the rise effect.
          Panel 0 starts at translateY(0); others rise from CONTENT_RISE_PX to 0.
        */}
        <div
          ref={setContentEl}
          style={{
            transform:
              index === 0
                ? "translateY(0px)"
                : `translateY(${CONTENT_RISE_PX}px)`,
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            variants={panelContentVariants}
            className="max-w-7xl"
          >
            {/* Year · role · client */}
            <motion.div
              variants={panelItemVariants}
              className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 ${muted}`}
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
            </motion.div>

            {/* Title */}
            <motion.div
              variants={panelItemVariants}
              className="overflow-hidden pb-[0.12em]"
            >
              <h2
                id={`work-panel-title-${study.id}`}
                className={`font-nohemi font-medium leading-[1.02] tracking-tight pb-4 ${text}`}
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                {study.title}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={panelItemVariants}
              className={`mt-5 text-base md:text-lg leading-relaxed max-w-[52ch] ${muted}`}
            >
              {study.description}
            </motion.p>

            {/* Tags */}
            <motion.ul
              variants={panelItemVariants}
              className="flex gap-2 flex-wrap mt-5"
              aria-label={`Tags for ${study.title}`}
            >
              {study.tags.map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    className={`bg-transparent hover:bg-transparent ${text} ${borderCls}`}
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div variants={panelItemVariants} className="mt-8">
              <Link
                href={`/work/${study.id}`}
                className={`
                  group/cta inline-flex items-center gap-2 text-sm font-medium
                  border-b pb-px transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm
                  ${text} ${borderCls} hover:border-current/70 focus-visible:ring-current
                `}
              >
                View case study
                <FiArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="sr-only">: {study.title}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

// ── WorkList ───────────────────────────────────────────────────────────────

interface WorkListProps {
  studies: CaseStudy[];
}

export function WorkList({ studies: allStudies }: WorkListProps) {
  const reduced = useReducedMotion() ?? false;
  const studies = allStudies;

  // ── Reactive dark mode ──────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const sync = () =>
      setDarkMode(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const getBrandColor = useCallback(
    (study: CaseStudy) =>
      darkMode
        ? (study.brandDark ?? "oklch(0.20 0.01 0)")
        : (study.brandLight ?? "oklch(0.88 0.01 0)"),
    [darkMode]
  );

  // ── Panel + content refs (direct DOM mutation — no state updates) ────────
  const containerRef = useRef<HTMLDivElement>(null);
  const panelEls = useRef<(HTMLElement | null)[]>([]);
  const contentEls = useRef<(HTMLDivElement | null)[]>([]);
  const containerTopRef = useRef<number>(0);

  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      containerTopRef.current = top;
    };
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

  const makePanelRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      panelEls.current[i] = el;
    },
    []
  );

  const makeContentRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      contentEls.current[i] = el;
    },
    []
  );

  // ── Lenis scroll handler ────────────────────────────────────────────────
  useLenis(
    ({ scroll }) => {
      const container = containerRef.current;
      if (!container || studies.length === 0) return;

      const vh = window.innerHeight;
      const relativeScroll = scroll - containerTopRef.current;

      studies.forEach((_, i) => {
        const panelEl = panelEls.current[i];
        const contentEl = contentEls.current[i];
        if (!panelEl) return;

        if (i === 0) {
          panelEl.style.opacity = "1";
          if (contentEl) contentEl.style.transform = "translateY(0px)";
          return;
        }

        // Panel i fades in during scroll zone [i*vh, i*vh + FADE_ZONE*vh].
        // Progress 0 = start of fade, 1 = fully opaque.
        const progress = (relativeScroll - i * vh) / (FADE_ZONE * vh);
        const opacity = reduced
          ? progress >= 0.5 ? 1 : 0
          : Math.max(0, Math.min(1, progress));
        const contentProgress = opacity;

        panelEl.style.opacity = String(opacity);
        if (contentEl) {
          contentEl.style.transform = `translateY(${(CONTENT_RISE_PX * (1 - contentProgress)).toFixed(2)}px)`;
        }
      });
    },
    [studies, reduced]
  );

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
      {/* Fixed nav header — animated hover swap "work" ↔ "return to index" */}
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

      {/*
        Container height: n * 100svh gives each panel a full viewport of scroll
        depth. The extra 60vh lets the last panel complete its fade and rest
        fully opaque before the scroll container ends.
      */}
      <div
        ref={containerRef}
        style={{ height: `calc(${studies.length * 100}svh + 60vh)` }}
      >
        {studies.map((study, index) => (
          <StudyPanel
            key={study.id}
            study={study}
            index={index}
            total={studies.length}
            brandColor={getBrandColor(study)}
            setPanelEl={makePanelRef(index)}
            setContentEl={makeContentRef(index)}
          />
        ))}
      </div>
    </div>
  );
}
