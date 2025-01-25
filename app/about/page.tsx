// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

export default function AboutPage() {
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
          <div className="space-y-10">
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
                About me
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-nohemi text-balance"
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
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-row flex-wrap gap-3"
            >
              <Link href="https://github.com/travhall" title="Go to my GitHub">
                <Button variant="secondary">
                  Check out my code <IoLogoGithub />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/travhall/">
                <Button variant="secondary" title="Let's connect on LinkedIn">
                  Find me on Linkedin <IoLogoLinkedin />
                </Button>
              </Link>
              <Link href="/Travis-Hall_CV.pdf" target="_blank" download>
                <Button
                  variant="secondary"
                  title="Download my education and experience in a PDF"
                >
                  Download my CV <IoDownloadOutline />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                With expertise in both design and development,{" "}
                <span className="line-through decoration-1 text-muted-foreground">
                  coupled with an endless supply of useless trivia about rap
                  music, 90&rsquo;s hoops, and golden era skateboarding,
                </span>{" "}
                I bring a unique perspective.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                I have an MFA in Interactive Media and extensive experience in
                ux/ui design, design systems and front-end development, I
                combine creative vision with technical expertise to build
                engaging digital experiences.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-[1fr_1.5fr] lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8 my-8"
              >
                <h2 className="font-nohemi text-2xl">Skills & Technologies</h2>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <h3 className="text-lg font-medium mb-3 capitalize">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8 my-8"
              >
                <h2 className="font-nohemi text-2xl">Experience</h2>
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.role}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <h3 className="text-lg font-medium">{exp.role}</h3>
                      <p className="text-muted-foreground">
                        {exp.company} • {exp.period}
                      </p>
                      <p className="text-muted-foreground text-balance">
                        {exp.description}
                      </p>
                    </motion.div>
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
