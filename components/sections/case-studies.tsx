// components/sections/case-studies.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getFeaturedCaseStudies, type CaseStudy } from "@/data/case-studies";

export function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    async function loadStudies() {
      const data = await getFeaturedCaseStudies();
      setStudies(data);
    }
    loadStudies();
  }, []);

  return (
    <section className="relative z-10 bg-background/80 backdrop-blur-lg p-4 xl:p-8 flex flex-col">
      {/* Title animation remains the same */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5, margin: "100px" }}
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
            id="work"
          >
            {["Featured", "work"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: {
                        duration: 0.2,
                        ease: [0.33, 1, 0.68, 1],
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

      {/* Card Grid */}
      <div className="grid gap-4 auto-rows-[400px] grid-cols-1 md:grid-cols-2 lg:grid-cols-12 2xl:grid-cols-16 w-full max-w-6xl self-end">
        {studies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`
              ${
                index === 0
                  ? "md:col-span-2 lg:col-span-8 lg:row-span-2"
                  : "lg:col-span-4"
              }
              ${index === 1 && "lg:col-start-9"}
              ${index === 2 && "lg:col-start-9"}
              h-full
            `}
          >
            <Link href={`/work/${study.id}`}>
              <article className="group relative w-full h-full">
                <div className="relative w-full h-full rounded border-2 border-border overflow-hidden bg-primary">
                  <Image
                    src={study.coverImage}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1600px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-luminosity"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-background/95 backdrop-blur transition-opacity group-hover:opacity-90" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-bold">
                          {study.title}
                        </h3>
                        <p className="text-lg text-accent-foreground mt-2">
                          {study.description}
                        </p>
                      </motion.div>

                      <div className="flex gap-2 flex-wrap">
                        {study.tags.map((tag: string, tagIndex: number) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1 + tagIndex * 0.1,
                            }}
                          >
                            <Badge variant="secondary" className="text-sm">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {study.year}
                        </p>
                        <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
