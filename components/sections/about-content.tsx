"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOTION_TOKENS } from "@/lib/tokens";
import { FiDownload, FiGithub, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/page-transition";
import { usePageBg } from "@/hooks/use-page-bg";

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

// Static — no dependency on props or state
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
    label: "Skills",
    items: [
      "Design Systems",
      "User Experience Design",
      "User Interface Development",
      "Wireframing & Prototyping",
      "User Research & Usability Testing",
      "Information Architecture",
      "Design Sprints",
      "Product Strategy",
      "Agile Development Methodology",
      "Design Leadership",
      "Teaching",
    ],
  },
  {
    category: "tools",
    label: "Tools",
    items: [
      "Figma & FigJam",
      "VS Code",
      "Command Line",
      "Atlassian Suite",
      "Adobe Creative Suite",
      "Sketch",
      "GitHub & Bitbucket",
    ],
  },
  {
    category: "technologies",
    label: "Technologies",
    items: [
      "HTML / CSS / JavaScript",
      "TypeScript",
      "React & Next.js",
      "Vue & Nuxt",
      "Node.js",
      "Tailwind CSS",
      "GraphQL & Apollo",
      "Shopify & Square",
      "WordPress & Strapi",
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
    dateTime: "2016-01/",
    period: "January 2016 – Present",
    description:
      "Leading UX across Arrow's eCommerce platforms — a suite serving millions of engineers globally. Established the design system foundation, built and scaled the UX team, and introduced research-driven process across product and engineering orgs.",
  },
  {
    role: "Senior Front End Developer",
    company: "ideapark (now Ingredient/wgdt)",
    dateTime: "2013-09/2015-01",
    period: "September 2013 – January 2015",
    description:
      "Front-end lead on campaigns and microsites for Target, Betty Crocker, and other national brands — responsible for production code quality, standards compliance, and cross-browser delivery across a high-volume agency pipeline.",
  },
  {
    role: "Front End Developer",
    company: "The Lacek Group",
    url: "https://www.lacek.com",
    dateTime: "2010-09/2013-02",
    period: "September 2010 – February 2013",
    description:
      "Built responsive microsites and email campaigns for loyalty marketing programs. Delivered the agency's first responsive website, introducing the practice internally at a time when responsive design was still far from standard.",
  },
  {
    role: "Visiting Artist / Faculty",
    company: "Minneapolis College of Art and Design",
    url: "https://www.mcad.edu",
    dateTime: "2008-08/2010-08",
    period: "August 2008 – August 2010",
    description:
      "Taught digital media design and web development at both postbaccalaureate and undergraduate levels — covering digital image creation, audio/video production, and front-end technologies.",
  },
  {
    role: "Freelance Designer / Developer",
    company: "travishall.design",
    url: "https://www.travishall.design",
    dateTime: "2005-05/",
    period: "May 2005 – Present",
    description:
      "Independent practice spanning art direction, branding, wireframing, and bespoke site development. Clients have included McCann, Likeletter Projects, Morsekode, and playworkgroup.",
  },
];

// --- Component ---

export function AboutContent() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  // Explicitly reset the page background to the theme default on mount.
  // Without this, navigating away from a brand-colored case study page would
  // leave --page-bg set to that brand color for the duration of the about page.
  usePageBg(null);

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

              {/* Intro — photo + bio side by side */}
              <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">

                {/* Photo */}
                <motion.div variants={fadeUpVariants} className="w-full">
                  <div className="relative aspect-3/4 rounded-sm overflow-hidden bg-muted">
                    <Image
                      src="/images/profile-img.jpg"
                      alt="Travis Hall"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Bio + links */}
                <div className="space-y-8">
                  <motion.p variants={fadeUpVariants} className="about-heading">
                    Hi, I&rsquo;m Travis — I make things people use.
                  </motion.p>

                  <motion.div
                    variants={fadeUpVariants}
                    className="space-y-5 text-lg text-muted-foreground"
                  >
                    <p>
                      I hold an MFA in Interactive Media and have spent nearly two
                      decades at the intersection of design and engineering —
                      teaching it at art school, building it at agencies, and
                      scaling it across eCommerce platforms used by millions of
                      engineers worldwide.
                    </p>
                    <p>
                      I&rsquo;ve built design systems, led UX teams, taught
                      front-end development at the postsecondary level, and shipped
                      the code myself. The work in this portfolio is the
                      through-line.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeUpVariants}
                    className="flex flex-row flex-wrap gap-3 pt-2"
                  >
                    <Button asChild variant="outline" className="rounded-full p-3">
                      <Link
                        href="https://github.com/travhall"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiGithub aria-hidden="true" />
                        <span className="sr-only">GitHub (opens in new tab)</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full p-3">
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
                </div>
              </div>

              {/* Skills + Experience */}
              <div className="grid md:grid-cols-2 gap-16 pt-12">

                {/* Skills */}
                <motion.div variants={fadeUpVariants} className="space-y-12">
                  <h2 className="about-subheading">Skills &amp; Expertise</h2>
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

              {/* CTA */}
              <motion.div
                variants={fadeUpVariants}
                className="pt-16 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-border"
              >
                <p className="text-xl text-muted-foreground">
                  If you&rsquo;ve made it this far, the work is probably worth a look.
                </p>
                <Button asChild variant="default" className="group">
                  <Link href="/work">
                    View my work
                    <FiArrowRight
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
