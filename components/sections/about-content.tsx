"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOTION_TOKENS } from "@/lib/tokens";
import { FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/page-transition";

// --- Variants (module scope — not recreated on every render) ---

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_TOKENS.duration.stagger,
    },
  },
};

const labelVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.base,
      ease: MOTION_TOKENS.ease.expo,
    },
  },
};

const fadeUpVariants: Variants = {
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

// Moved out of component — static object, no dependency on props or state
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

// --- Data ---

interface SkillGroup {
  category: string;
  label: string;
  items: string[];
}

const skills: SkillGroup[] = [
  {
    category: "design",
    label: "Design",
    items: [
      "Design Systems",
      "User Experience Design",
      "User Interface Development",
      "Wireframing & Prototyping",
      "User Research & Testing",
      "Information Architecture",
    ],
  },
  {
    category: "development",
    label: "Development",
    items: [
      "HTML/CSS/JavaScript",
      "React & Next.js",
      "Node.js",
      "Tailwind CSS",
      "Vue & Nuxt",
      "GraphQL",
    ],
  },
  {
    category: "other",
    label: "Other",
    items: [
      "Product Strategy",
      "Agile Development Methodology",
      "Design Leadership",
      "Teaching",
    ],
  },
];

interface Experience {
  role: string;
  company: string;
  url?: string;
  /** ISO 8601 date range for the dateTime attribute, e.g. "2016-01/2025-01" */
  dateTime: string;
  period: string;
  description: string;
}

const experiences: Experience[] = [
  {
    role: "Senior Design Manager, UX Design Lead",
    company: "Arrow Digital: Arrow Electronics, Inc.",
    url: "https://www.arrow.com",
    dateTime: "2016-01",
    period: "January 2016 – Present",
    description:
      "Lead UX design initiatives for Arrow Electronics' eCommerce platforms, establishing and optimizing UX processes while delivering comprehensive design systems.",
  },
  {
    role: "Senior Front End Developer",
    company: "ideapark (now Ingredient/wgdt)",
    dateTime: "2013-09/2015-01",
    period: "September 2013 – January 2015",
    description:
      "Led front-end development projects for clients like Target and Betty Crocker, delivering standards-compliant code for websites and email campaigns.",
  },
  {
    role: "Front End Developer",
    company: "The Lacek Group",
    url: "https://www.lacek.com",
    dateTime: "2010-09/2013-02",
    period: "September 2010 – February 2013",
    description:
      "Created responsive microsites and dynamic email campaigns for loyalty marketing efforts, pioneering the agency's inaugural responsive website.",
  },
];

// --- Component ---

export function AboutContent() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition>
      <div className="min-h-screen p-4 xl:p-8 max-w-8xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="space-y-10">
            {/* Page heading — hover swaps to "return to index" affordance */}
            <div className="overflow-hidden my-3">
              <motion.h1
                variants={labelVariants}
                className="hero-label pb-2 inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link
                  href="/"
                  aria-label={isHovered ? "Return to index" : "About"}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
                >
                  <div className="overflow-hidden relative h-[1.2em]" aria-hidden="true">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isHovered ? "return" : "about"}
                        variants={shouldReduceMotion ? undefined : hoverLabelVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="block"
                      >
                        {isHovered ? "return to index" : "about"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.h1>
            </div>

            <div className="section-container space-y-10">
              <motion.p variants={fadeUpVariants} className="about-heading">
                Hi I&rsquo;m Travis, and I make things people use. In other words,
                I specialize in creating inclusive, human-centered digital
                experiences.{" "}
                <span className="text-muted-foreground">
                  But something tells me you&rsquo;re not here to read a bunch of
                  industry jargon, now are you?
                </span>
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                className="flex flex-row flex-wrap gap-3"
              >
                <Button asChild variant="outline" className="rounded-full p-2.5">
                  <Link
                    href="https://github.com/travhall"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub aria-hidden="true" />
                    <span className="sr-only">GitHub (opens in new tab)</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full p-2.5">
                  <Link
                    href="https://www.linkedin.com/in/travhall/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLinkedin aria-hidden="true" />
                    <span className="sr-only">LinkedIn (opens in new tab)</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link
                    href="/Travis-Hall_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Download my CV <FiDownload aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </Link>
                </Button>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
                <motion.div
                  variants={fadeUpVariants}
                  className="col-span-1 lg:col-span-2 space-y-6 text-lg text-muted-foreground"
                >
                  <p>
                    With expertise in both design and development,{" "}
                    {/* del carries semantic "struck/removed" meaning for SR users */}
                    <del className="line-through decoration-1 text-muted-foreground/50 no-underline [text-decoration:line-through]">
                      coupled with an endless supply of useless trivia about rap
                      music, 90&rsquo;s hoops, and golden era skateboarding,
                    </del>{" "}
                    I bring a unique perspective to every project.
                  </p>
                  <p>
                    I hold an MFA in Interactive Media and have extensive experience
                    in UX/UI design, design systems, and front-end development. I
                    combine creative vision with technical expertise to build
                    engaging digital experiences that are as functional as they are beautiful.
                  </p>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-16 pt-12">
                {/* Skills */}
                <motion.div variants={fadeUpVariants} className="space-y-12">
                  <h2 className="about-subheading">Skills &amp; Technologies</h2>
                  <div className="space-y-10">
                    {skills.map(({ category, label, items }) => (
                      <div key={category} className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {label}
                        </h3>
                        <ul className="flex flex-wrap gap-2" aria-label={`${label} skills`}>
                          {items.map((skill) => (
                            <li key={skill}>
                              <Badge variant="outline">{skill}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Experience */}
                <motion.div variants={fadeUpVariants} className="space-y-12">
                  <h2 className="about-subheading">Experience</h2>
                  <ul className="space-y-12">
                    {experiences.map((exp) => (
                      <li key={exp.role} className="space-y-3">
                        <h3 className="text-xl font-semibold leading-tight">{exp.role}</h3>
                        <p className="text-sm font-medium text-primary uppercase tracking-wider">
                          {exp.url ? (
                            <Link
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline underline-offset-2"
                            >
                              {exp.company}
                            </Link>
                          ) : (
                            exp.company
                          )}
                          <span aria-hidden="true"> &bull; </span>
                          <time dateTime={exp.dateTime}>{exp.period}</time>
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
