"use client";

import { motion } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/tokens";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Link from "next/link";
import { Button } from "../ui";

export function Footer() {
  return (
    <motion.footer
      aria-label="Site footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: MOTION_TOKENS.duration.slow, ease: MOTION_TOKENS.ease.expo }}
      className="p-4 xl:p-8 relative"
    >
      <div className="text-sm text-muted-foreground flex flex-col-reverse md:flex-row gap-4 items-center justify-between">

        <p>
          &copy; {new Date().getFullYear()} Travis Hall. All rights reserved.
        </p>

        <div className="flex flex-row items-center">
          <Button asChild variant="ghost">
            <Link
              href="https://github.com/travhall"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              <span className="sr-only">GitHub (opens in new tab)</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link
              href="https://www.linkedin.com/in/travhall/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin aria-hidden="true" />
              <span className="sr-only">LinkedIn (opens in new tab)</span>
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <a href="mailto:hello@travishall.design?subject=Hello%20from%20your%20portfolio">
              hello@travishall.design <FiMail aria-hidden="true" />
              <span className="sr-only">(opens in your email client)</span>
            </a>
          </Button>
        </div>

      </div>
    </motion.footer>
  );
}
