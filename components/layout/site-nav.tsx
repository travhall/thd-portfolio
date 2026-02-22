"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/lib/tokens";

// Variant factories — called inside the component so useReducedMotion
// can collapse durations without touching module-scope constants.
function buildMenuVariants(reduced: boolean): Variants {
  return {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: reduced ? 0 : MOTION_TOKENS.duration.base,
          ease: MOTION_TOKENS.ease.quart,
        },
        opacity: { duration: reduced ? 0 : 0.3 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: reduced ? 0 : MOTION_TOKENS.duration.slow,
          ease: MOTION_TOKENS.ease.quart,
        },
        opacity: { duration: reduced ? 0 : 0.5 },
        staggerChildren: reduced ? 0 : 0.07,
        delayChildren: reduced ? 0 : 0.2,
      },
    },
  };
}

function buildItemVariants(reduced: boolean): Variants {
  return {
    closed: {
      opacity: 0,
      y: reduced ? 0 : 20,
      transition: {
        duration: reduced ? 0 : 0.3,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
  };
}

function buildButtonTextVariants(reduced: boolean): Variants {
  return {
    initial: { y: reduced ? 0 : 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduced ? 0 : MOTION_TOKENS.duration.slow,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
    exit: {
      y: reduced ? 0 : -20,
      opacity: 0,
      transition: {
        duration: reduced ? 0 : 0.3,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
  };
}

// Defined at module scope — not recreated on every SiteNav render.
interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  reduced: boolean;
}

function MenuItem({ href, children, isActive, onClick, reduced }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Link
        href={href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "block py-1 px-2 rounded-sm text-card-foreground hover:text-card relative z-10 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isActive ? "font-bold underline decoration underline-offset-4" : ""
        )}
      >
        {children}
      </Link>
      <motion.div
        initial={false}
        animate={{
          scale: isHovered ? 1 : 0.8,
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute inset-0 bg-foreground/80 rounded-xs"
        style={{ originX: 0 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      />
    </motion.div>
  );
}

interface SiteNavProps {
  studies: Array<{ id: string; title: string }>;
}

export function SiteNav({ studies }: SiteNavProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/$/, "") || "/";
  const reduced = useReducedMotion() ?? false;
  const menuVariants = buildMenuVariants(reduced);
  const itemVariants = buildItemVariants(reduced);
  const buttonTextVariants = buildButtonTextVariants(reduced);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  // Close on Escape, return focus to trigger
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const menu = menuRef.current;
        if (!menu) return;
        const focusable = Array.from(
          menu.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.closest('[inert]') && !el.closest('[aria-hidden="true"]'));

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close when clicking outside the nav header entirely.
  // Uses mousedown so it fires before focus shifts away.
  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen]);

  // Focus the first interactive item once the open animation completes.
  // Called via onAnimationComplete on the motion.nav — avoids a fragile setTimeout.
  const handleMenuAnimationComplete = useCallback((definition: string) => {
    if (definition === "open") {
      const menu = menuRef.current;
      if (!menu) return;
      const first = menu.querySelector<HTMLElement>("a[href], button:not([disabled])");
      first?.focus();
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Replaces the Lenis ScrollReset: jump to top on every route change.
  // behavior:"instant" overrides scroll-smooth on <html> so the reset
  // never animates — it always cuts immediately to the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  if (!mounted) {
    return (
      <header ref={headerRef} className="fixed top-4 right-4 xl:top-8 xl:right-8 z-50 pointer-events-none">
        <div className="px-4 py-2 rounded-sm nav-trigger opacity-0">
          <span className="text-xs font-medium tracking-wider lowercase">Menu</span>
        </div>
      </header>
    );
  }

  return (
    <header ref={headerRef} className="fixed top-4 right-4 xl:top-8 xl:right-8 z-50">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : MOTION_TOKENS.duration.base,
          delay: reduced ? 0 : MOTION_TOKENS.duration.base,
          ease: MOTION_TOKENS.ease.quart,
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="site-nav-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="px-4 py-2 rounded-sm nav-trigger relative"
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={isOpen ? "close" : "menu"}
                variants={buttonTextVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="block text-xs font-medium tracking-wider lowercase"
              >
                {isOpen ? "Close" : "Menu"}
              </motion.span>
            </AnimatePresence>
          </div>
        </button>
      </motion.div>

      {/* Menu is always in the DOM so aria-controls always resolves.
          `inert` removes it from tab order and AT when closed without
          breaking the aria-controls reference (unlike aria-hidden). */}
      <motion.nav
        ref={menuRef}
        id="site-nav-menu"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        onAnimationComplete={handleMenuAnimationComplete}
        aria-label="Site navigation"
        inert={isOpen ? undefined : true}
        className="absolute top-10 right-0 w-[18rem] rounded-sm nav-menu overflow-hidden"
      >
        <motion.div className="p-4 space-y-3">
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.div variants={itemVariants}>
                <MenuItem href="/" isActive={pathname === "/"} onClick={handleClose} reduced={reduced}>
                  Index
                </MenuItem>
              </motion.div>
            </div>

            <div role="group" aria-labelledby="nav-work-label" className="space-y-3">
              <div className="overflow-hidden px-2">
                <motion.div variants={itemVariants}>
                  <span
                    id="nav-work-label"
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary"
                  >
                    Work
                  </span>
                </motion.div>
              </div>
              <div className="space-y-1">
                {studies.slice(0, 5).map((study) => (
                  <div key={study.id} className="overflow-hidden">
                    <motion.div variants={itemVariants}>
                      <MenuItem
                        href={`/work/${study.id}`}
                        isActive={pathname === `/work/${study.id}`}
                        onClick={handleClose}
                        reduced={reduced}
                      >
                        {study.title}
                      </MenuItem>
                    </motion.div>
                  </div>
                ))}
                {studies.length > 5 && (
                  <div className="overflow-hidden">
                    <motion.div variants={itemVariants}>
                      <MenuItem href="/work" isActive={pathname === "/work"} onClick={handleClose} reduced={reduced}>
                        All Case Studies
                      </MenuItem>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-foreground/10">
            <div className="overflow-hidden">
              <motion.div variants={itemVariants}>
                <MenuItem href="/about" isActive={pathname === "/about"} onClick={handleClose} reduced={reduced}>
                  About
                </MenuItem>
              </motion.div>
            </div>
          </div>
          <div className="pt-4 border-t border-foreground/10">
            <div className="overflow-hidden">
              <motion.div variants={itemVariants}>
                <ModeToggle />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </header>
  );
}
