"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  useInView,
} from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { getCoverImage } from "@/lib/utils";
import { usePageBgContext } from "@/components/layout/page-bg-provider";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { MOTION_TOKENS } from "@/lib/tokens";
import {
  GooeyImage,
  type GooeyImageHandle,
} from "@/components/effects/gooey-image";

// ── Constants ─────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Shared sub-component ──────────────────────────────────────────────────────

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-[13px]">{value}</span>
    </div>
  );
}

// ── Magnetic hover hook ───────────────────────────────────────────────────────

function useMagneticHover(strength = 1) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, {
    stiffness: 180,
    damping: 22,
    restDelta: 0.001,
  });
  const springY = useSpring(rawY, {
    stiffness: 180,
    damping: 22,
    restDelta: 0.001,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength);
      rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength);
    },
    [rawX, rawY, strength],
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { springX, springY, rawX, rawY, onMove, onLeave };
}

// ── Mobile layout ─────────────────────────────────────────────────────────────

function FeaturedProjectMobile({
  study,
  src,
}: {
  study: CaseStudy;
  src: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      aria-labelledby="fp-title-mobile"
      data-snap
      className="relative z-10 h-dvh overflow-hidden bg-(--page-bg)/90 backdrop-blur-xl"
    >
      {/* Image card — floats gently at rest */}
      <motion.div
        layoutId="fp-image-mobile"
        className="absolute inset-4 overflow-hidden rounded-sm border border-border"
        animate={open ? { y: 0, scale: 1 } : { y: [0, -6, 0], scale: 1 }}
        transition={
          open
            ? { duration: 0.4, ease: EASE }
            : {
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }
        }
        style={{ cursor: open ? "default" : "pointer" }}
        onClick={() => !open && setOpen(true)}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="calc(100vw - 32px)"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Case content — bottom sheet */}
      <motion.div
        className="absolute inset-x-4 bottom-0 rounded-t-sm border border-b-0 border-border bg-(--page-bg)/50 backdrop-blur-xl overflow-y-auto"
        style={{ height: "60%" }}
        initial={{ y: "100%" }}
        animate={{ y: open ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button
          type="button"
          aria-label="Collapse project"
          className="absolute top-4 right-4 z-10 size-10 rounded-full bg-background/60 border border-foreground/20 flex items-center justify-center text-base leading-none hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-300"
          onClick={() => setOpen(false)}
        >
          &#215;
        </button>
        <div className="flex flex-col items-start gap-5 p-6 pt-8 min-h-full">
          <h2
            id="fp-title-mobile"
            className="font-display font-extrabold leading-[1.02] tracking-tight text-3xl"
          >
            {study.title}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/80">
            {study.description}
          </p>
          <div className="flex flex-wrap gap-6">
            {study.year && <Detail label="Year" value={study.year} />}
            {study.role && <Detail label="Role(s)" value={study.role} />}
            {study.duration && (
              <Detail label="Duration" value={study.duration} />
            )}
          </div>
          <Button asChild className="mt-auto">
            <Link href={`/work/${study.id}`} className="group">
              {study.ctaLabel ?? "View case study"}
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

// ── Desktop layout ────────────────────────────────────────────────────────────
//
// Effects:
//   Float        — stage drifts ±9 px (y) and ±5 px (x) on an organic path.
//   Magnetic     — stage tilts toward the pointer in 3-D while collapsed.
//   Gooey image  — WebGL two-image reveal wipe + silhouette morph + flowmap.
//   Elastic      — section scroll velocity drives a scaleY stretch on the image.

function FeaturedProjectDesktop({
  study,
  src,
}: {
  study: CaseStudy;
  src: string;
}) {
  const [open, setOpen] = useState(false);
  // Once the WebGL canvas is ready the static <Image> fallback fades out,
  // eliminating the "doubled image" caused by simultaneous visible layers.
  const [canvasReady, setCanvasReady] = useState(false);
  // Suppress elastic scaleY during the 820ms expand/collapse transition so
  // scroll-velocity deformation doesn't cause a visible snap.
  const [transitioning, setTransitioning] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gooeyRef = useRef<GooeyImageHandle>(null);
  const lastMouse = useRef({ x: 0, y: 0 });

  // In-view gate — don't float when section is off-screen / display:none
  const inView = useInView(sectionRef, { amount: 0.3 });

  // ── Magnetic hover ──────────────────────────────────────────────────────────
  const { springX, springY, rawX, rawY, onMove, onLeave } = useMagneticHover(1);
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(springY, [-1, 1], [3.5, -3.5]);

  useEffect(() => {
    if (open) {
      rawX.set(0);
      rawY.set(0);
      gooeyRef.current?.setHover(false);
    }
    // Suppress scaleY deformation for the full expand/collapse transition
    setTransitioning(true);
    const t = setTimeout(() => setTransitioning(false), 870);
    return () => clearTimeout(t);
  }, [open, rawX, rawY]);

  // ── Section scroll velocity → elastic image stretch ─────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const rawVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 400,
    damping: 40,
  });
  const imageScaleY = useTransform(smoothVelocity, [-4, 0, 4], [1.07, 1, 1.07]);

  // ── Gooey mouse handler — feeds the WebGL Flowmap ───────────────────────────
  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (open) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = 1.0 - (e.clientY - rect.top) / rect.height; // flip y for GL

      // Pass raw pixel deltas — GooeyImage scales them to a safe flowmap range
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      gooeyRef.current?.updateMouse(normX, normY, dx, dy);
    },
    [open],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fp-title-desktop"
      data-snap
      className="relative z-10 h-dvh overflow-hidden bg-(--page-bg)/90 backdrop-blur-xl flex items-center"
    >
      {/* Perspective wrapper */}
      <div className="w-full" style={{ perspective: "1200px" }}>
        {/* Stage: float + magnetic tilt */}
        <motion.div
          className="relative w-full"
          style={{
            ["--ih" as string]: "clamp(360px, 38vw, 600px)",
            height: open ? "var(--ih)" : "calc(var(--ih) + 68px)",
            transition: "height 820ms cubic-bezier(0.22,1,0.36,1)",
            rotateX,
            rotateY,
          }}
          animate={
            inView && !open
              ? { x: [0, -5, 2, -4, 0], y: [0, -9, -5, -7, 0] }
              : { x: 0, y: 0 }
          }
          transition={
            inView && !open
              ? {
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                  times: [0, 0.27, 0.55, 0.78, 1],
                }
              : { duration: 0.6, ease: EASE }
          }
          onMouseMove={!open ? onMove : undefined}
          onMouseLeave={!open ? onLeave : undefined}
        >
          {/* Image card ─────────────────────────────────────────────────
              No overflow:hidden on the outer div -- canvas overflow:visible
              is needed for the CSS drop-shadow to follow the gooey shape.
              The inner div clips only the static <Image> fallback, which
              fades out once the WebGL canvas is ready (canvasReady).      */}
          <motion.div
            className="absolute top-0 right-16"
            style={{
              width: open ? "69%" : "28%",
              height: "var(--ih)",
              cursor: open ? "default" : "pointer",
              // Hold scaleY at 1 during expand/collapse; resume spring after.
              scaleY: open || transitioning ? 1 : imageScaleY,
              transition: "width 820ms cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseMove={handleImageMouseMove}
            onMouseEnter={() => {
              if (!open) gooeyRef.current?.setHover(true);
            }}
            onMouseLeave={() => {
              if (!open) gooeyRef.current?.setHover(false);
            }}
            onClick={() => !open && setOpen(true)}
          >
            {/* Static fallback — clipped to card shape.
                The border stays visible; only the <Image> fades once
                the WebGL canvas is ready (canvasReady).                  */}
            <div className="absolute inset-0 overflow-hidden rounded-sm border border-border">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 69vw, 28vw"
                className="object-cover object-top"
                priority
                style={{
                  opacity: canvasReady ? 0 : 1,
                  transition: "opacity 0.5s ease",
                }}
              />
            </div>

            {/* WebGL layer — two-image reveal (base + hover).
                The silhouette alpha mask renders the card shape; no
                bleed needed since the cursor dent pulls inward.          */}
            <GooeyImage
              ref={gooeyRef}
              src={study.coverImage}
              hoverSrc={study.coverImageDark ?? study.coverImage}
              strength={0.08}
              dissipation={0.96}
              falloff={0.35}
              intensity={0.4}
              onReady={() => setCanvasReady(true)}
            />
          </motion.div>

          {/* Collapsed meta — fades out on expand */}
          <motion.div
            className="absolute right-16 pt-4"
            style={{
              top: "var(--ih)",
              width: "28%",
              pointerEvents: open ? "none" : "auto",
              cursor: "pointer",
            }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => !open && setOpen(true)}
            aria-hidden={open}
          >
            <div className="flex justify-between items-baseline gap-3">
              <h3 className="text-base font-medium tracking-tight">
                {study.title}
              </h3>
              <span className="text-sm font-medium tabular-nums">
                {study.year}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Close button — section-level */}
      <motion.button
        type="button"
        aria-label="Collapse project"
        className="absolute top-4 right-4 z-30 size-10 rounded-full bg-white/85 border border-black/20 flex items-center justify-center text-base leading-none hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-300"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: open ? 0.3 : 0 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      >
        &#215;
      </motion.button>

      {/* Case content panel — slides in from left */}
      <motion.div
        className="absolute left-0 inset-y-0 w-[45%] lg:w-[42%] flex items-center bg-(--page-bg)/60 backdrop-blur-md"
        style={{ pointerEvents: open ? "auto" : "none" }}
        initial={{ x: "-100%" }}
        animate={{ x: open ? "0%" : "-100%" }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <div className="w-full pl-[clamp(24px,4vw,56px)] pr-8 flex flex-col items-start gap-5 lg:gap-6">
          <h2
            id="fp-title-desktop"
            className="font-display font-extrabold leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
          >
            {study.title}
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-relaxed">
            {study.description}
          </p>
          <div className="flex flex-wrap gap-6">
            {study.year && <Detail label="Year" value={study.year} />}
            {study.role && <Detail label="Role(s)" value={study.role} />}
            {study.duration && (
              <Detail label="Duration" value={study.duration} />
            )}
          </div>
          <Button asChild>
            <Link href={`/work/${study.id}`} className="group">
              {study.ctaLabel ?? "View case study"}
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface FeaturedProjectProps {
  study: CaseStudy;
}

export function FeaturedProject({ study }: FeaturedProjectProps) {
  const { isDark } = usePageBgContext();
  const src = getCoverImage(study, isDark);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("home-page");
    return () => html.classList.remove("home-page");
  }, []);

  return (
    <>
      <div className="block md:hidden">
        <FeaturedProjectMobile study={study} src={src} />
      </div>
      <div className="hidden md:block">
        <FeaturedProjectDesktop study={study} src={src} />
      </div>
    </>
  );
}

// ── WorkCta ────────────────────────────────────────────────────────────────────

export function WorkCta() {
  return (
    <section
      aria-label="View all work"
      className="relative z-10 bg-(--page-bg)"
    >
      <div className="px-4 xl:px-8 py-20 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: MOTION_TOKENS.duration.slow,
            ease: MOTION_TOKENS.ease.expo,
          }}
        >
          <p className="case-section-label mb-6">Selected work</p>
          <Link
            href="/work"
            className="group block focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 rounded-sm"
          >
            <span
              className="font-display font-light tracking-tight text-muted-foreground group-hover:text-foreground transition-colors duration-500 inline-flex items-baseline gap-4"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              All case studies
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-3"
                style={{ fontSize: "0.5em" }}
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
