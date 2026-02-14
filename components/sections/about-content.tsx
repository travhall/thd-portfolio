"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOTION_TOKENS } from "@/lib/tokens";
import {
  IoDownloadOutline,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/page-transition";

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
  return (
    <PageTransition>
      <div className="min-h-screen bg-background p-4 xl:p-8 max-w-8xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: MOTION_TOKENS.duration.stagger,
              },
            },
          }}
        >
          <div className="space-y-10">
            <div className="overflow-hidden my-3">
              <motion.h1
                variants={{
                  hidden: { y: "100%" },
                  visible: {
                    y: 0,
                    transition: {
                      duration: MOTION_TOKENS.duration.base,
                      ease: MOTION_TOKENS.ease.expo,
                    },
                  },
                }}
                className="hero-label pb-2"
              >
                About me
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.2 }}
              className="about-heading"
            >
              Hi I&rsquo;m Travis, and I make things people use. In other words,
              I specialize in creating inclusive, human-centered digital
              experiences.{" "}
              <span className="text-muted-foreground">
                But something tells me you&rsquo;re not here to read a bunch of
                industry jargon, now are you?
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.3 }}
              className="flex flex-row flex-wrap gap-3"
            >
              <Link href="https://github.com/travhall" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-full">
                  Check out my code <IoLogoGithub className="ml-2" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/travhall/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-full">
                  Find me on LinkedIn <IoLogoLinkedin className="ml-2" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>
              </Link>
              <Link href="/Travis-Hall_CV.pdf" target="_blank" rel="noopener noreferrer" download>
                <Button variant="secondary" className="rounded-full">
                  Download my CV <IoDownloadOutline className="ml-2" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.3 }}
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.4 }}
                className="space-y-12"
              >
                <h2 className="about-subheading">Skills & Technologies</h2>
                <div className="space-y-10">
                  {Object.entries(skills).map(([category, items], index) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-foreground/5 text-foreground hover:bg-foreground/10 border-none px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_TOKENS.duration.base, delay: 0.5 }}
                className="space-y-12"
              >
                <h2 className="about-subheading">Experience</h2>
                <div className="space-y-12">
                  {experiences.map((exp) => (
                    <div key={exp.role} className="space-y-3 group">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold leading-tight">{exp.role}</h3>
                      </div>
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
