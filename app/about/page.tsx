"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
      <div className="min-h-screen bg-background">
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-16 md:grid-cols-[1fr_1.5fr] items-start"
          >
            <div className="space-y-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/profile-img.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-nohemi text-2xl font-bold">Contact</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>hello@travishall.design</p>
                  <p>715.456.5159</p>
                  <p>www.travishall.design</p>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              <div className="space-y-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-nohemi text-4xl sm:text-5xl font-bold"
                >
                  About Me
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-muted-foreground"
                >
                  Results-driven designer and developer with expertise in
                  crafting user-centered interfaces for eCommerce platforms and
                  marketing initiatives. With an MFA in Interactive Media and
                  extensive experience in design systems and front-end
                  development, I combine creative vision with technical
                  expertise to build engaging digital experiences.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8"
              >
                <h2 className="font-nohemi text-2xl font-bold">
                  Skills & Technologies
                </h2>
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
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-8"
              >
                <h2 className="font-nohemi text-2xl font-bold">Experience</h2>
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
                      <p className="text-muted-foreground">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
