"use client";

// ---------------------------------------------------------------------------
// Architecture: single sticky panel per study, but background and content
// are separate children within it.
//
// Each panel wrapper has opacity:1 always and is sticky.
// The background div INSIDE the panel is what gets faded via opacity.
// The content div INSIDE the panel is never faded — only clip + translate.
//
// This means the bg crossfade and text reveal are fully independent.
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

function isLightPanel(oklch: string): boolean {
  const parsed = parseOklch(oklch);
  return parsed ? parsed[0] >= 0.55 : true;
}

const FADE_ZONE = 0.4;  // fraction of vh for bg crossfade
const TEXT_ZONE = 0.25; // fraction of vh for text reveal (snappier)

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}
function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// ── Ref shape ──────────────────────────────────────────────────────────────

interface PanelRefs {
  bg: HTMLDivElement | null;        // fades
  counter: HTMLSpanElement | null;  // fades with meta
  meta: HTMLDivElement | null;      // translateY + opacity
  titleWrap: HTMLDivElement | null; // clip-path
  titleInner: HTMLDivElement | null; // translateY through clip
  body: HTMLDivElement | null;      // translateY + opacity
}

// ── StudyPanel ─────────────────────────────────────────────────────────────

interface StudyPanelProps {
  study: CaseStudy;
  index: number;
  total: number;
  brandColor: string;
  isFirst: boolean;
  setRefs: (refs: PanelRefs) => void;
}

function StudyPanel({ study, index, total, brandColor, isFirst, setRefs }: StudyPanelProps) {
  const light = isLightPanel(brandColor);
  const text  = light ? "text-[#1a1a1a]"    : "text-[#f0f0f0]";
  const muted = light ? "text-[#1a1a1a]/55" : "text-[#f0f0f0]/55";
  const border= light ? "border-[#1a1a1a]/25": "border-[#f0f0f0]/25";

  const bgRef         = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const metaRef       = useRef<HTMLDivElement>(null);
  const titleWrapRef  = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const bodyRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefs({
      bg:         bgRef.current,
      counter:    counterRef.current,
      meta:       metaRef.current,
      titleWrap:  titleWrapRef.current,
      titleInner: titleInnerRef.current,
      body:       bodyRef.current,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Panel wrapper: sticky, always opacity 1, never faded
    <article
      aria-labelledby={`work-panel-title-${study.id}`}
      className="sticky top-0 h-svh w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* ── Background (this is what fades) ── */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundColor: brandColor,
          opacity: isFirst ? 1 : 0,
        }}
      >
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

      {/* ── Content (never faded — only clip + translate) ── */}
      <div className="relative h-full flex flex-col justify-between px-6 sm:px-10 xl:px-16 pt-20 pb-10 md:pb-14">
        {/* Counter */}
        <div className="flex justify-end">
          <span
            ref={counterRef}
            className={`font-nohemi text-xs tabular-nums tracking-[0.2em] ${muted}`}
            aria-hidden="true"
            style={isFirst ? undefined : { opacity: 0 }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="max-w-7xl">
          {/* Meta */}
          <div
            ref={metaRef}
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 ${muted}`}
            style={isFirst ? undefined : { transform: "translateY(32px)", opacity: 0 }}
          >
            <span className="font-nohemi text-xs tabular-nums tracking-widest uppercase">{study.year}</span>
            {study.role && <><span aria-hidden="true">·</span><span className="text-xs">{study.role}</span></>}
            {study.client && <><span aria-hidden="true">·</span><span className="text-xs">{study.client}</span></>}
          </div>

          {/* Title — clip outer + thrust inner */}
          <div className="pb-[0.12em]">
            <div
              ref={titleWrapRef}
              className="overflow-hidden"
              style={isFirst ? undefined : { clipPath: "inset(100% 0 0 0)" }}
            >
              <div
                ref={titleInnerRef}
                style={isFirst ? undefined : { transform: "translateY(80px)" }}
              >
                <h2
                  id={`work-panel-title-${study.id}`}
                  className={`font-nohemi font-medium leading-[1.02] tracking-tight pb-4 ${text}`}
                  style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
                >
                  {study.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            style={isFirst ? undefined : { transform: "translateY(20px)", opacity: 0 }}
          >
            <p className={`mt-5 text-base md:text-lg leading-relaxed max-w-[52ch] ${muted}`}>
              {study.description}
            </p>
            <ul className="flex gap-2 flex-wrap mt-5" aria-label={`Tags for ${study.title}`}>
              {study.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className={`bg-transparent hover:bg-transparent ${text} ${border}`}>
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href={`/work/${study.id}`}
                className={`group/cta inline-flex items-center gap-2 text-sm font-medium border-b pb-px transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm ${text} ${border} hover:border-current/70 focus-visible:ring-current`}
              >
                View case study
                <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
                <span className="sr-only">: {study.title}</span>
              </Link>
            </div>
          </div>
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

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const sync = () => setDarkMode(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const getBrandColor = useCallback(
    (study: CaseStudy) => darkMode
      ? (study.brandDark  ?? "oklch(0.20 0.01 0)")
      : (study.brandLight ?? "oklch(0.88 0.01 0)"),
    [darkMode]
  );

  const containerRef    = useRef<HTMLDivElement>(null);
  const panelRefs       = useRef<PanelRefs[]>([]);
  const containerTopRef = useRef<number>(0);

  const makeSetRefs = useCallback(
    (i: number) => (refs: PanelRefs) => { panelRefs.current[i] = refs; },
    []
  );

  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      let top = 0, node: HTMLElement | null = el;
      while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      containerTopRef.current = top;
    };
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Lenis handler ─────────────────────────────────────────────────────────
  useLenis(({ scroll }) => {
    if (studies.length === 0) return;
    const vh  = window.innerHeight;
    const rel = scroll - containerTopRef.current;

    studies.forEach((_, i) => {
      const r = panelRefs.current[i];
      if (!r) return;

      if (i === 0) {
        if (r.bg)      r.bg.style.opacity      = "1";
        if (r.counter) r.counter.style.opacity  = "1";
        return;
      }

      // ── Background crossfade ───────────────────────────────────────────
      if (r.bg) {
        const bgRaw = (rel - i * vh) / (FADE_ZONE * vh);
        r.bg.style.opacity = reduced
          ? bgRaw >= 0.5 ? "1" : "0"
          : easeOut(clamp01(bgRaw)).toFixed(4);
      }

      // ── Text reveal: clip + translate only, zero opacity changes ───────
      const tRaw = (rel - i * vh) / (TEXT_ZONE * vh);
      const t    = reduced ? (tRaw >= 0.5 ? 1 : 0) : clamp01(tRaw);

      // Counter + Meta: slide up, fade in together before title
      const metaT = easeOut(clamp01(t / 0.7));
      if (r.counter) {
        r.counter.style.opacity = metaT.toFixed(4);
      }
      if (r.meta) {
        r.meta.style.transform = `translateY(${((1 - metaT) * 32).toFixed(2)}px)`;
        r.meta.style.opacity   = metaT.toFixed(4);
      }

      // Title: clip unmasks from bottom, inner element thrusts upward
      const titleT = easeOutQuint(clamp01((t - 0.05) / 0.65));
      if (r.titleWrap)  r.titleWrap.style.clipPath  = `inset(${((1 - titleT) * 100).toFixed(2)}% 0 0 0)`;
      if (r.titleInner) r.titleInner.style.transform = `translateY(${((1 - titleT) * 80).toFixed(2)}px)`;

      // Body: slides up, fades in after title lands
      const bodyT = easeOut(clamp01((t - 0.35) / 0.65));
      if (r.body) {
        r.body.style.transform = `translateY(${((1 - bodyT) * 20).toFixed(2)}px)`;
        r.body.style.opacity   = bodyT.toFixed(4);
      }
    });
  }, [studies, reduced]);

  const [isHovered, setIsHovered] = useState(false);
  const hoverLabelVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: MOTION_TOKENS.duration.base, ease: MOTION_TOKENS.ease.quart } },
    exit:    { y: -20, opacity: 0, transition: { duration: MOTION_TOKENS.duration.fast, ease: MOTION_TOKENS.ease.quart } },
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 xl:px-16 pt-7 pb-4 flex items-center pointer-events-none">
        <div className="overflow-hidden inline-block pointer-events-auto">
          <h1
            className="hero-label pb-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="/" aria-label="Work — return to index" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded-sm">
              <div className="overflow-hidden relative h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isHovered ? "return" : "work"}
                    variants={hoverLabelVariants}
                    initial="initial" animate="animate" exit="exit"
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

      <div ref={containerRef} style={{ height: `calc(${studies.length * 100}svh + 60vh)` }}>
        {studies.map((study, index) => (
          <StudyPanel
            key={study.id}
            study={study}
            index={index}
            total={studies.length}
            brandColor={getBrandColor(study)}
            isFirst={index === 0}
            setRefs={makeSetRefs(index)}
          />
        ))}
      </div>
    </div>
  );
}
