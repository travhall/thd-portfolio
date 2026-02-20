"use client";

// ---------------------------------------------------------------------------
// Architecture
//
// Background: --page-bg on <html> IS the panel background. The Lenis handler
// crossfades between brand colors by interpolating OKLCH values and writing
// directly to the CSS custom property. No per-panel bg divs competing with
// the body. The body transition handles all blending across navigations.
//
// Content: sticky panels clip/translate their content for enter/exit.
//
// Pointer events: article elements have NO pointer-events property at all by
// default (inherits "auto" from the cascade). We set `pointer-events: none`
// via inline style on every NON-active article. Active article has no inline
// style (or empty), so it inherits "auto" normally. This avoids the HTML
// child-override problem where `pointer-events: auto` on a child defeats a
// parent's `none`.
// ---------------------------------------------------------------------------

import { useRef, useState, useCallback, useEffect } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

// Interpolate between two OKLCH colors and write to --page-bg.
// t=0 → colorA, t=1 → colorB. Writes directly to the DOM, no React state.
function lerpPageBg(colorA: string, colorB: string, t: number): string {
  const a = parseOklch(colorA);
  const b = parseOklch(colorB);
  if (!a || !b) return t < 0.5 ? colorA : colorB;
  const L = a[0] + (b[0] - a[0]) * t;
  const C = a[1] + (b[1] - a[1]) * t;
  const H = a[2] + (b[2] - a[2]) * t;
  return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(2)})`;
}

const FADE_ZONE = 0.5;  // fraction of vh for bg crossfade (longer = smoother)
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
  article: HTMLElement | null;       // pointer-events gating
  content: HTMLDivElement | null;    // exit: whole block clipped out the top
  counter: HTMLSpanElement | null;   // enter: fades in with meta
  meta: HTMLDivElement | null;       // enter: translateY + opacity
  titleWrap: HTMLDivElement | null;  // enter: clip-path from bottom
  titleInner: HTMLDivElement | null; // enter: translateY through clip
  body: HTMLDivElement | null;       // enter: translateY + opacity
}

// ── StudyPanel ─────────────────────────────────────────────────────────────

interface StudyPanelProps {
  study: CaseStudy;
  index: number;
  total: number;
  brandColor: string;
  isFirst: boolean;
  setRefs: (refs: PanelRefs) => void;
  onNavigate: (color: string) => void;
}

function StudyPanel({ study, index, total, brandColor, isFirst, setRefs, onNavigate }: StudyPanelProps) {
  const light = isLightPanel(brandColor);
  const text  = light ? "text-[#1a1a1a]"    : "text-[#f0f0f0]";
  const muted = light ? "text-[#1a1a1a]/55" : "text-[#f0f0f0]/55";
  const border= light ? "border-[#1a1a1a]/25": "border-[#f0f0f0]/25";

  const articleRef    = useRef<HTMLElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const metaRef       = useRef<HTMLDivElement>(null);
  const titleWrapRef  = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const bodyRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefs({
      article:    articleRef.current,
      content:    contentRef.current,
      counter:    counterRef.current,
      meta:       metaRef.current,
      titleWrap:  titleWrapRef.current,
      titleInner: titleInnerRef.current,
      body:       bodyRef.current,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article
      ref={articleRef}
      aria-labelledby={`work-panel-title-${study.id}`}
      // No pointer-events class here. Non-active panels get
      // `style.pointerEvents = "none"` set directly on the DOM node by the
      // Lenis handler and makeSetRefs. Active panel has no inline style so it
      // inherits the cascade default ("auto"). We never put pointer-events-auto
      // on any child — so the parent's "none" cleanly blocks the entire subtree.
      className="sticky top-0 h-svh w-full"
      style={{ zIndex: index + 1 }}
    >
      {/* Content — no pointer-events class, inherits from article */}
      <div
        ref={contentRef}
        className="relative h-full flex flex-col justify-between px-6 sm:px-10 xl:px-16 pt-20 pb-10 md:pb-14"
      >
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
                onClick={() => onNavigate(brandColor)}
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
  const { setPageBg, isDark } = usePageBgContext();

  const getBrandColor = useCallback(
    (study: CaseStudy) =>
      isDark
        ? (study.brandDark  ?? "oklch(0.20 0.01 0)")
        : (study.brandLight ?? "oklch(0.88 0.01 0)"),
    [isDark]
  );

  const containerRef    = useRef<HTMLDivElement>(null);
  const panelRefs       = useRef<PanelRefs[]>([]);
  const containerTopRef = useRef<number>(0);
  const isSnappingRef   = useRef(false);
  const activeIndexRef  = useRef(0);

  const makeSetRefs = useCallback(
    (i: number) => (refs: PanelRefs) => {
      panelRefs.current[i] = refs;
      // Non-first panels start with pointer-events blocked so higher-z-index
      // articles can't intercept clicks on the visible panel below them.
      // Panel 0 is already interactive (no inline style = cascade "auto").
      if (i !== 0 && refs.article) {
        refs.article.style.pointerEvents = "none";
      }
    },
    []
  );

  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (el) {
        let top = 0, node: HTMLElement | null = el;
        while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
        containerTopRef.current = top;
      }
    };
    // Set the initial page background to the first panel's brand color.
    // Defer one frame so the provider's `page-bg-transition` class is present
    // and the transition fires (smooth blend from neutral on page enter).
    const raf = requestAnimationFrame(() => {
      measure();
      if (studies.length > 0) {
        setPageBg(getBrandColor(studies[0]));
      }
    });
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When theme flips, re-set the current panel's brand color immediately
  useEffect(() => {
    const current = panelRefs.current[activeIndexRef.current];
    if (!current || studies.length === 0) return;
    setPageBg(getBrandColor(studies[activeIndexRef.current]));
  }, [isDark, getBrandColor, setPageBg, studies]);

  // ── Lenis handler ─────────────────────────────────────────────────────────
  useLenis(({ scroll }) => {
    if (studies.length === 0) return;
    const vh  = window.innerHeight;
    const rel = scroll - containerTopRef.current;

    // Active panel index
    const rawActive = rel / vh;
    const newActive = Math.max(0, Math.min(studies.length - 1, Math.round(rawActive)));

    if (newActive !== activeIndexRef.current) {
      // Restore previous panel's pointer events (remove inline style → cascade "none"
      // is not set, so it reverts to cascade "auto" — but we want none. So we
      // explicitly set "none" on all non-active panels.)
      const prev = panelRefs.current[activeIndexRef.current];
      if (prev?.article) prev.article.style.pointerEvents = "none";

      // Grant the new active panel full interactivity
      const next = panelRefs.current[newActive];
      if (next?.article) next.article.style.pointerEvents = "";

      activeIndexRef.current = newActive;
    }

    // ── Drive --page-bg from scroll position ──────────────────────────────
    // Between panels i and i+1, blend from brandColor[i] to brandColor[i+1].
    // At exact snap points, set the exact color (no interpolation needed).
    // This replaces per-panel background divs entirely — the body IS the bg.
    if (!reduced) {
      const floatIndex = clamp01(rel / ((studies.length - 1) * vh)) * (studies.length - 1);
      const lo = Math.floor(floatIndex);
      const hi = Math.min(lo + 1, studies.length - 1);
      const frac = floatIndex - lo;

      const colorLo = getBrandColor(studies[lo]);
      const colorHi = getBrandColor(studies[hi]);
      const blended = frac < 0.001
        ? colorLo
        : frac > 0.999
          ? colorHi
          : lerpPageBg(colorLo, colorHi, easeOut(frac));

      document.documentElement.style.setProperty("--page-bg", blended);
    } else {
      // Reduced motion: snap directly to the active panel's color
      document.documentElement.style.setProperty(
        "--page-bg",
        getBrandColor(studies[newActive])
      );
    }

    studies.forEach((_, i) => {
      const r = panelRefs.current[i];
      if (!r) return;

      if (i === 0) {
        if (r.counter) r.counter.style.opacity = "1";
        return;
      }

      // ── Shared scroll progress for this panel's transition ─────────────
      const tRaw = (rel - i * vh) / (TEXT_ZONE * vh);
      const t    = reduced ? (tRaw >= 0.5 ? 1 : 0) : clamp01(tRaw);

      // ── EXIT: slide the previous panel's entire content block out the top ─
      const prevPanel = panelRefs.current[i - 1];
      if (prevPanel?.content) {
        const exitT = easeOutQuint(clamp01(t / 0.7));
        prevPanel.content.style.clipPath  = `inset(${(exitT * 105).toFixed(2)}% 0 0 0)`;
        prevPanel.content.style.transform = `translateY(${(exitT * -60).toFixed(2)}px)`;
      }

      // ── ENTER: reveal this panel's content from the bottom ─────────────

      const metaT = easeOut(clamp01(t / 0.7));
      if (r.counter) r.counter.style.opacity = metaT.toFixed(4);
      if (r.meta) {
        r.meta.style.transform = `translateY(${((1 - metaT) * 32).toFixed(2)}px)`;
        r.meta.style.opacity   = metaT.toFixed(4);
      }

      const titleT = easeOutQuint(clamp01((t - 0.05) / 0.65));
      if (r.titleWrap)  r.titleWrap.style.clipPath  = `inset(${((1 - titleT) * 100).toFixed(2)}% 0 0 0)`;
      if (r.titleInner) r.titleInner.style.transform = `translateY(${((1 - titleT) * 80).toFixed(2)}px)`;

      const bodyT = easeOut(clamp01((t - 0.35) / 0.65));
      if (r.body) {
        r.body.style.transform = `translateY(${((1 - bodyT) * 20).toFixed(2)}px)`;
        r.body.style.opacity   = bodyT.toFixed(4);
      }
    });
  }, [studies, reduced, getBrandColor]);

  // ── Soft snap ─────────────────────────────────────────────────────────────
  useLenis((lenis) => {
    if (reduced || studies.length === 0) return;

    const { scroll, velocity } = lenis;
    const VELOCITY_THRESHOLD = 0.8;
    const SNAP_ZONE          = 0.38;

    if (isSnappingRef.current) {
      if (Math.abs(velocity) < 0.05) isSnappingRef.current = false;
      return;
    }
    if (Math.abs(velocity) >= VELOCITY_THRESHOLD) return;

    const vh           = window.innerHeight;
    const containerTop = containerTopRef.current;
    const containerEnd = containerTop + studies.length * vh;

    if (scroll < containerTop - vh || scroll > containerEnd) return;

    const rel          = scroll - containerTop;
    const nearestIndex = Math.round(rel / vh);
    const clampedIndex = Math.max(0, Math.min(studies.length - 1, nearestIndex));
    const targetScroll = containerTop + clampedIndex * vh;
    const dist         = Math.abs(scroll - targetScroll);

    if (dist < SNAP_ZONE * vh && dist > 2) {
      isSnappingRef.current = true;
      lenis.scrollTo(targetScroll, {
        duration: 0.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    }
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
            onNavigate={setPageBg}
          />
        ))}
      </div>
    </div>
  );
}
