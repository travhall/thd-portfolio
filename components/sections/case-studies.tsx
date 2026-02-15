"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/types/case-study";
import { cn } from "@/lib/utils";
import { MOTION_TOKENS } from "@/lib/tokens";

interface CaseStudiesProps {
  studies: CaseStudy[];
}

export function CaseStudies({ studies }: CaseStudiesProps) {
  return (
    <section id="work" className="relative z-10 bg-background/80 backdrop-blur-lg p-4 xl:p-8 flex flex-col">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5, margin: "100px" }}
        className="overflow-hidden mt-[10vh]"
      >
        <h2 className="font-nohemi text-xl md:text-2xl lg:text-3xl font-light mb-2">
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2,
                },
              },
            }}
            className="flex flex-row gap-1 lg:gap-2 pt-4"
          >
            {["Featured", "work"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: {
                        duration: MOTION_TOKENS.duration.fast,
                        ease: MOTION_TOKENS.ease.expo,
                      },
                    },
                  }}
                  className="block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </h2>
      </motion.div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 w-full max-w-[1800px] mx-auto">
        {studies.map((study, index) => (
          <motion.article
            key={study.id}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: MOTION_TOKENS.duration.slow,
              ease: MOTION_TOKENS.ease.expo,
              delay: index * 0.1
            }}
            className={cn(
              "group card-case-study h-[500px] md:h-[600px]",
              index === 0 ? "lg:col-span-8 lg:row-span-1" : "lg:col-span-4",
              index === 2 ? "lg:col-span-5" : "",
              index === 1 ? "lg:col-span-4" : "",
              index === 3 ? "lg:col-span-7" : ""
            )}
          >
            <Link
              href={`/work/${study.id}`}
              aria-label={`View case study: ${study.title}`}
              className="relative w-full h-full p-8 flex flex-col justify-between"
            >
              <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image
                  src={study.coverImage}
                  alt=""
                  fill
                  sizes={index === 0 ? "70vw" : "33vw"}
                  className="card-image"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-80" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <Badge variant="outline" className="card-badge">
                  {study.year}
                </Badge>
                <div className="bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-nohemi font-semibold tracking-tight">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md line-clamp-2">
                    {study.description}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap" aria-label="Tags">
                  {study.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
