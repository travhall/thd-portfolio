"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOTION_TOKENS } from "@/lib/tokens";
import { Download, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/page-transition";

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

const skills = {
  design: [
    "Design Systems",
    "User Experience Design",
    "User Interface Development",
    "Wireframing & Prototyping",
    "User Research & Testing",
    "Information Architecture",
  ],
  development: [
    "HTML/CSS/JavaScript",
    "React & Next.js",
    "Node.js",
    "Tailwind CSS",
    "Vue & Nuxt",
    "GraphQL",
  ],
  other: [
    "Product Strategy",
    "Agile Development Methodology",
    "Design Leadership",
    "Teaching",
  ],
};

const experiences = [
  {
    role: "Senior Design Manager, UX Design Lead",
    company: "Arrow Digital: Arrow Electronics, Inc.",
    period: "January 2016 - Present",
    description:
      "Lead UX design initiatives for Arrow Electronics' eCommerce platforms, establishing and optimizing UX processes while delivering comprehensive design systems.",
  },
  {
    role: "Senior Front End Developer",
    company: "ideapark (now Ingredient/wgdt)",
    period: "September 2013 - January 2015",
    description:
      "Led front-end development projects for clients like Target and Betty Crocker, delivering standards-compliant code for websites and email campaigns.",
  },
  {
    role: "Front End Developer",
    company: "The Lacek Group",
    period: "September 2010 - February 2013",
    description:
      "Created responsive microsites and dynamic email campaigns for loyalty marketing efforts, pioneering the agency's inaugural responsive website.",
  },
];

export function AboutContent() {
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
      <div className="min-h-screen p-4 xl:p-8 max-w-8xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="space-y-10">
            <div className="flex items-baseline gap-3 my-3">
              <div className="overflow-hidden">
                <motion.h1
                  variants={labelVariants}
                  className="hero-label pb-2 inline-block"
                >
                  About
                </motion.h1>
              </div>
              <div className="overflow-hidden">
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
            </div>

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
              <Link href="https://github.com/travhall" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="rounded-full">
                  Check out my code <Github aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/travhall/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="rounded-full">
                  Find me on LinkedIn <Linkedin aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>
              </Link>
              <Link href="/Travis-Hall_CV.pdf" target="_blank" rel="noopener noreferrer" download>
                <Button variant="ghost" className="rounded-full">
                  Download my CV <Download aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
              <motion.div
                variants={fadeUpVariants}
                className="col-span-1 lg:col-span-2 space-y-6 text-lg text-muted-foreground"
              >
                <p>
                  With expertise in both design and development,{" "}
                  <span className="line-through decoration-1 text-muted-foreground/50">
                    coupled with an endless supply of useless trivia about rap
                    music, 90&rsquo;s hoops, and golden era skateboarding,
                  </span>{" "}
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
              <motion.div variants={fadeUpVariants} className="space-y-12">
                <h2 className="about-subheading">Skills & Technologies</h2>
                <div className="space-y-10">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge key={skill} variant="outline" className="skill-badge">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="space-y-12">
                <h2 className="about-subheading">Experience</h2>
                <div className="space-y-12">
                  {experiences.map((exp) => (
                    <div key={exp.role} className="space-y-3">
                      <h3 className="text-xl font-semibold leading-tight">{exp.role}</h3>
                      <p className="text-sm font-medium text-primary uppercase tracking-wider">
                        {exp.company} &bull; {exp.period}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
