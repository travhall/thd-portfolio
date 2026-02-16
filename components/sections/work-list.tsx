"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { MOTION_TOKENS } from "@/lib/tokens";

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_TOKENS.duration.stagger,
    },
  },
};

export function WorkList({ studies }: { studies: CaseStudy[] }) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverLabelVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: MOTION_TOKENS.duration.base,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: MOTION_TOKENS.duration.fast,
        ease: MOTION_TOKENS.ease.quart,
      },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen p-4 xl:p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={listContainerVariants}
        >
          <div className="overflow-hidden my-3 inline-block">
            <motion.h1 className="hero-label pb-2">
              Case studies
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-3 inline-block ml-3">
            <Link
              href="/"
              className="hero-label pb-2 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="overflow-hidden relative h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isHovered ? "return" : "back"}
                    variants={hoverLabelVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="block lowercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isHovered ? "Return to index" : "← Index"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </Link>
          </div>

          <div className="grid gap-4 grid-flow-row-dense grid-cols-1 md:grid-cols-3 max-w-[2400px] mx-auto auto-rows-[320px] sm:auto-rows-[400px]">
            {studies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: MOTION_TOKENS.duration.base,
                  delay: index * MOTION_TOKENS.duration.stagger * 4,
                  ease: MOTION_TOKENS.ease.expo,
                }}
                className="group card-case-study w-full h-full"
              >
                <Link
                  href={`/work/${study.id}`}
                  aria-label={`View case study: ${study.title}`}
                  className="relative block h-full"
                >
                  <Image
                    src={study.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="card-image mix-blend-luminosity"
                    priority={index === 0}
                  />
                  <div
                    className="absolute inset-0 bg-background/90 backdrop-blur transition-opacity group-hover:opacity-90"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: MOTION_TOKENS.duration.base,
                          delay: 0.2,
                          ease: MOTION_TOKENS.ease.expo,
                        }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold">{study.title}</h3>
                        <p className="text-lg text-muted-foreground mt-2">{study.description}</p>
                      </motion.div>

                      <ul className="flex gap-2 flex-wrap" aria-label="Tags">
                        {study.tags.map((tag: string, tagIndex: number) => (
                          <motion.li
                            key={tag}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: MOTION_TOKENS.duration.fast,
                              delay: tagIndex * MOTION_TOKENS.duration.stagger,
                              ease: MOTION_TOKENS.ease.expo,
                            }}
                          >
                            <Badge variant="secondary" className="case-tag">
                              {tag}
                            </Badge>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{study.year}</p>
                        <ArrowUpRight
                          className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
