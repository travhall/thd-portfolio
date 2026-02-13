"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/data/case-studies";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";

export function WorkList({ studies }: { studies: CaseStudy[] }) {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background p-4 xl:p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          <div className="overflow-hidden my-3">
            <motion.h1
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                  },
                },
              }}
              className="font-nohemi text-sm font-semibold"
            >
              My work
            </motion.h1>
          </div>

          <div className="grid gap-4 grid-flow-row-dense grid-cols-1 md:grid-cols-3 max-w-[2400px] mx-auto auto-rows-[320px] sm:auto-rows-[400px]">
            {studies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="w-full"
              >
                <Link href={`/work/${study.id}`} className="block h-full">
                  <article className="group relative w-full h-full rounded border-2 border-border overflow-hidden bg-primary">
                    <Image
                      src={study.coverImage}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
