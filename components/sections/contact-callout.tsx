"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { EmailPopover } from "@/components/ui/email-popover";
import { siteConfig } from "@/lib/site-config";
import { MOTION_TOKENS } from "@/lib/tokens";
import { usePageBgContext } from "@/components/layout/page-bg-provider";

const { social } = siteConfig;

// ── Variants (module scope — not recreated on render) ──────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
};

// ---------------------------------------------------------------------------
// ContactCallout
//
// Full-height section placed at the end of the /work page. Uses whileInView
// so the stagger animation fires once as the section scrolls into the
// viewport — consistent with the reveal pattern used throughout the site.
//
// <address> is the correct semantic wrapper for contact information; the
// not-italic class resets the browser's default italic presentation.
// ---------------------------------------------------------------------------

export function ContactCallout() {
  const { setPageBg } = usePageBgContext();
  const sectionRef = useRef<HTMLElement>(null);

  // Reset the page background to the default theme color when this section
  // scrolls to the viewport midpoint — mirroring the IO pattern in work-list.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPageBg(null);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [setPageBg]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="min-h-[90vh] flex flex-col justify-center p-6 sm:p-10 xl:p-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        className="max-w-3xl"
      >
        {/* Label */}
        <motion.p variants={itemVariants} className="hero-label lowercase">
          Get in touch
        </motion.p>

        {/* Heading — real h2 for document outline + aria-labelledby on section */}
        <motion.h2
          id="contact-heading"
          variants={itemVariants}
          className="about-heading mb-5"
        >
          Let&rsquo;s work together.
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground leading-relaxed max-w-[52ch] mb-10"
        >
          Open to freelance projects, consulting engagements, and full-time
          opportunities. If you have something to build, I&rsquo;d love to
          hear about it.
        </motion.p>

        {/* CTAs — wrapped in <address> as semantic contact information */}
        <motion.address
          variants={itemVariants}
          className="not-italic flex flex-row flex-wrap gap-3"
        >
          <EmailPopover
            triggerVariant="default"
            triggerSize="lg"
            triggerClassName="group"
            subject="Let's work together"
            align="start"
          >
            <FiMail aria-hidden="true" />
            {social.email}
          </EmailPopover>

          <Button asChild variant="outline" size="lg" className="group">
            <Link
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
              <FiArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="sr-only">(opens in new tab)</span>
            </Link>
          </Button>
        </motion.address>
      </motion.div>
    </section>
  );
}
