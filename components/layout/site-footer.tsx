"use client";

import { motion } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/tokens";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Link from "next/link";
import { Button } from "../ui";
import { siteConfig } from "@/lib/site-config";

const { name, social } = siteConfig;

export function Footer() {
  return (
    <motion.footer
      aria-label="Site footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.expo }}
      className="p-4 xl:p-8 xl:py-16 relative"
    >
      <div className="text-sm text-muted-foreground flex flex-col-reverse md:flex-row gap-4 items-center justify-between">

        <p>
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <div className="flex flex-row items-center">
          <Button asChild variant="ghost">
            <Link
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              <span className="sr-only">GitHub (opens in new tab)</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin aria-hidden="true" />
              <span className="sr-only">LinkedIn (opens in new tab)</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <a href={`mailto:${social.email}?subject=Hello%20from%20your%20portfolio`}>
              {social.email} <FiMail aria-hidden="true" />
              <span className="sr-only">(opens in your email client)</span>
            </a>
          </Button>
        </div>

      </div>
    </motion.footer>
  );
}
