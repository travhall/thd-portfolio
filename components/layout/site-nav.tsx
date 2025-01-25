"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCaseStudies } from "@/data/case-studies";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [studies, setStudies] = useState<Array<{ id: string; title: string }>>(
    []
  );
  const pathname = usePathname();

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

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98],
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
          duration: 0.6,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: {
          duration: 0.5,
        },
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  const buttonTextVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
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
            isActive ? "font-bold" : ""
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
          className="absolute inset-0 bg-background rounded-sm"
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
        className="px-4 py-2 rounded-sm bg-brand-3-950/80 dark:bg-brand-3-300/80 text-background hover:bg-brand-3-950/60 dark:hover:bg-brand-3-300/60 backdrop-blur-xl transition-colors relative"
      >
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={isOpen ? "close" : "menu"}
              variants={buttonTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="block text-xs"
            >
              {isOpen ? "Close" : "Menu"}
            </motion.span>
          </AnimatePresence>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-9 right-0 w-[260px] rounded-sm bg-brand-3-950/80 dark:bg-brand-3-300/80 backdrop-blur-xl overflow-hidden"
          >
            <motion.div className="p-4 space-y-1">
              <div className="overflow-hidden">
                <motion.div variants={itemVariants}>
                  <MenuItem href="/" isActive={pathname === "/"}>
                    Index
                  </MenuItem>
                </motion.div>
              </div>

              <div className="space-y-1">
                <div className="overflow-hidden">
                  <motion.div variants={itemVariants}>
                    <span className="block mx-2 text-sm text-background">
                      work
                    </span>
                  </motion.div>
                </div>
                <div className="space-y-1">
                  {studies.slice(0, 4).map((study) => (
                    <div key={study.id} className="overflow-hidden px-2">
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
                  {studies.length > 4 && (
                    <div className="overflow-hidden px-2">
                      <motion.div variants={itemVariants}>
                        <MenuItem href="/work" isActive={pathname === "/work"}>
                          View all
                        </MenuItem>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-hidden">
                <motion.div variants={itemVariants}>
                  <MenuItem href="/about" isActive={pathname === "/about"}>
                    About
                  </MenuItem>
                </motion.div>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
