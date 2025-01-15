"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/page-transition";

const skills = {
  design: [
    "UI/UX Design",
    "Design Systems",
    "Prototyping",
    "User Research",
    "Figma",
    "Adobe Creative Suite",
  ],
  development: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "GraphQL",
  ],
  other: [
    "Project Management",
    "Team Leadership",
    "Agile Methodologies",
    "Technical Writing",
  ],
};

const experiences = [
  {
    role: "Senior Product Designer",
    company: "Tech Company",
    period: "2020 - Present",
    description:
      "Leading design initiatives for enterprise software solutions.",
  },
  {
    role: "UI/UX Designer",
    company: "Design Agency",
    period: "2018 - 2020",
    description:
      "Crafted digital experiences for various clients across industries.",
  },
  {
    role: "Frontend Developer",
    company: "Startup",
    period: "2016 - 2018",
    description: "Built and maintained responsive web applications.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-16 md:grid-cols-[1fr_1.5fr] items-start"
          >
            <div className="space-y-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-nohemi text-2xl font-bold">Contact</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>hello@example.com</p>
                  <p>@username</p>
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
                  A designer and developer focused on creating thoughtful
                  digital experiences. With over 8 years of experience in the
                  industry, I combine design thinking with technical expertise
                  to build solutions that are both beautiful and functional.
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
