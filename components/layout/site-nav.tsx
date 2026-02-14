"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { getAllCaseStudies } from "@/data/case-studies";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/lib/tokens";
 
export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [studies, setStudies] = useState<Array<{ id: string; title: string }>>(
    []
  );
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/$/, "") || "/";
 
  // Load case studies when menu opens
  const loadStudies = async () => {
    if (studies.length === 0) {
      const data = await getAllCaseStudies();
      setStudies(data.map((study) => ({ id: study.id, title: study.title })));
    }
  };
 
  const handleToggle = async () => {
    if (!isOpen) {
      await loadStudies();
    }
    setIsOpen(!isOpen);
  };
 
  const menuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: MOTION_TOKENS.duration.base,
          ease: MOTION_TOKENS.ease.quart,
        },
        opacity: {
          duration: 0.3,
        },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: MOTION_TOKENS.duration.slow,
          ease: MOTION_TOKENS.ease.quart,
        },
        opacity: {
          duration: 0.5,
        },
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };
 
  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.menu,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
  };
 
  const buttonTextVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: MOTION_TOKENS.duration.menu,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
  };

  const MenuItem = ({
    href,
    children,
    isActive,
  }: {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        <Link
          href={href}
          onClick={() => setIsOpen(false)}
          className={cn(
            "block py-1 px-2 rounded-sm text-background hover:text-foreground relative z-10 transition-colors duration-200",
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
          className="absolute inset-0 bg-background rounded-xs"
          style={{ originX: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    );
  };

  return (
    <div className="fixed top-4 right-4 xl:top-8 xl:right-8 z-50">
      <button
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
              className="block text-xs font-medium tracking-wider"
            >
              {isOpen ? "Close" : "Menu"}
            </motion.span>
          </AnimatePresence>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="site-nav-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            aria-label="Site navigation"
            className="absolute top-10 right-0 w-[280px] rounded-sm nav-menu overflow-hidden"
          >
            <motion.div className="p-4 space-y-3">
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <MenuItem href="/" isActive={pathname === "/"}>
                      Index
                    </MenuItem>
                  </motion.div>
                </div>
 
                <div className="space-y-3">
                  <div className="overflow-hidden px-2">
                    <motion.div variants={itemVariants}>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/50">
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
                          >
                            {study.title}
                          </MenuItem>
                        </motion.div>
                      </div>
                    ))}
                    {studies.length > 5 && (
                      <div className="overflow-hidden">
                        <motion.div variants={itemVariants}>
                          <MenuItem href="/work" isActive={pathname === "/work"}>
                            All Case Studies
                          </MenuItem>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
 
              <div className="pt-4 border-t border-background/10">
                <div className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <MenuItem href="/about" isActive={pathname === "/about"}>
                      About
                    </MenuItem>
                  </motion.div>
                </div>
              </div>
              <div className="pt-4 border-t border-background/10">
                <div className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <ModeToggle />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
