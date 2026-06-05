"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { getCoverImage } from "@/lib/utils";
import { usePageBgContext } from "@/components/layout/page-bg-provider";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { MOTION_TOKENS } from "@/lib/tokens";

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

// ── Mobile layout ─────────────────────────────────────────────────────────────
//
// Full-screen (100dvh). Image fills the viewport; tapping it opens a 60%
// bottom-sheet overlay with a glass background. Scroll is locked while open.
// layoutId="fp-image-mobile" wires the shared-element hook for the future
// case-study transition — no visible effect today.

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
      {/* Image card — inset-4 matches the hero image's m-4 floating-card treatment */}
      <motion.div
        layoutId="fp-image-mobile"
        className="absolute inset-4 overflow-hidden rounded-sm border border-border"
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

      {/* Case content — bottom sheet, slides up from section floor
          bottom-0 + y:"100%" hides exactly flush with overflow-hidden */}
      <motion.div
        className="absolute inset-x-4 bottom-0 rounded-t-sm border border-b-0 border-border bg-(--page-bg)/50 backdrop-blur-xl overflow-y-auto"
        style={{ height: "60%" }}
        initial={{ y: "100%" }}
        animate={{ y: open ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Close button */}
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
// Two-layer structure:
//   Stage (flex-centered in the section) — owns the image card + collapsed meta.
//   Panel (absolute, section-level) — full-height glass sheet that slides in
//     from the left on expand, independent of the stage dimensions.
//
// Separating the panel from the stage means it always spans 100dvh regardless
// of the image's aspect-ratio, and the x-slide never conflicts with the image's
// width transition.
//
// layoutId="fp-image-desktop" wires the shared-element hook for the future
// case-study transition — no visible effect today.

function FeaturedProjectDesktop({
  study,
  src,
}: {
  study: CaseStudy;
  src: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-labelledby="fp-title-desktop"
      data-snap
      className="relative z-10 h-dvh overflow-hidden bg-(--page-bg)/90 backdrop-blur-xl flex items-center"
    >
      {/* ── Stage: image card + collapsed meta (flex-centered) ─────────────── */}
      <div
        className="relative w-full transition-[height] duration-820 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          ["--ih" as string]: "clamp(360px, 38vw, 600px)",
          height: open ? "var(--ih)" : "calc(var(--ih) + 158px)",
        }}
      >
        {/* Image — right-anchored, grows leftward on expand */}
        <motion.div
          layoutId="fp-image-desktop"
          className="absolute top-0 right-8 overflow-hidden border border-border transition-[width] duration-820 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: open ? "69%" : "22.5%",
            height: "var(--ih)",
            cursor: open ? "default" : "pointer",
          }}
          onClick={() => !open && setOpen(true)}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 768px) 69vw, 22vw"
            className="object-cover object-top"
            priority
          />
        </motion.div>

        {/* Collapsed meta — below image, fades out when panel opens */}
        <motion.div
          className="absolute right-8 pt-4.5"
          style={{
            top: "var(--ih)",
            width: "22.5%",
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
          <p className="mt-2 text-sm leading-snug text-muted-foreground line-clamp-2">
            {study.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {study.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center h-5.75 px-3 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-[11px] text-muted-foreground whitespace-nowrap"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Close button — section-level so it anchors to viewport top-right ── */}
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

      {/* ── Case content panel — full section height, slides in from left ───── */}
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

  // Scoped scroll-snap: add class to <html> on mount, clean up on unmount.
  // CSS rules keyed on .home-page ensure snap only applies to this page.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("home-page");
    return () => html.classList.remove("home-page");
  }, []);

  return (
    <>
      {/* Mobile: full-screen bottom-sheet */}
      <div className="block md:hidden">
        <FeaturedProjectMobile study={study} src={src} />
      </div>
      {/* Desktop: horizontal accordion */}
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
                className="flex-none transition-transform duration-500 group-hover:translate-x-3"
                style={{ fontSize: "0.5em" }}
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
