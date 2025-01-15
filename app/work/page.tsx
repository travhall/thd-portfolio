"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllCaseStudies, type CaseStudy } from "@/data/case-studies";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export default function WorkPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    async function loadStudies() {
      const data = await getAllCaseStudies();
      setStudies(data);
    }
    loadStudies();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
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
          <div className="overflow-hidden mb-16">
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
              className="font-nohemi text-5xl sm:text-6xl font-black"
            >
              Selected Works
            </motion.h1>
          </div>

          <div className="grid gap-8">
            {studies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/work/${study.id}`}>
                  <article className="group relative grid md:grid-cols-[1fr_1.5fr] gap-8 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="space-y-4">
                      <motion.h2 className="font-nohemi text-2xl font-bold group-hover:text-primary transition-colors">
                        {study.title}
                      </motion.h2>
                      <p className="text-muted-foreground">
                        {study.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {study.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {study.year}
                      </p>
                    </div>
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                      <Image
                        src={study.coverImage}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
