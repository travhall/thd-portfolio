"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { IoArrowDownCircleOutline } from "react-icons/io5";

export function Hero() {
  const { scrollY } = useScroll();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform values for zoom-out/recede effect
  // const scale = useTransform(scrollY, [0, 900], [1, 0.6]);
  const y = useTransform(scrollY, [0, 400], [0, 8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  // Separate blur overlay opacity transform
  const blurOpacity = useTransform(scrollY, [500, 800], [0, 1]);

  // Determine if we should show the dark image
  const shouldShowDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <>
      <div className="p-4 xl:p-8">
        <div className="overflow-hidden my-3">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-nohemi text-sm font-medium text-balance"
          >
            travishall.design
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl p-4 md:p-6 lg:p-8 mt-[48vh] mb-[24vh] lg:my-[24vh]"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-3xl lg:text-4xl text-balance mt-1"
        >
          Creating thoughtful digital experiences through design &amp; code
        </motion.p>
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-row items-center gap-1 text-xl lg:text-2xl mt-4 cursor-pointer"
          onClick={() => {
            const workElement = document.getElementById("work");
            if (workElement) {
              workElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <IoArrowDownCircleOutline className="mt-1" />
        </motion.div> */}
      </motion.div>
      {/* Hero Blur Block */}
      <motion.div
        className="absolute backdrop-blur-lg h-full w-full top-0 left-0 z-10 bg-primary mix-blend-screen dark:mix-blend-multiply pointer-events-none"
        style={{ opacity: blurOpacity }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ y }}
        className="sticky top-2 z-0 aspect-[3/4] md:aspect-video sm:w-[96vw] md:w-[84vw] lg:w-[72vw] xl:w-[64vw] flex items-end m-4"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 rounded border-2 border-border overflow-hidden">
          {mounted && (
            <Image
              src={
                shouldShowDark
                  ? "/images/hero-dark.jpg"
                  : "/images/hero-light.jpg"
              }
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </motion.div>
    </>
  );
}
