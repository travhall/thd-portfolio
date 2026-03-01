"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { FiArrowDown } from "react-icons/fi";

export function RotatingScrollIndicator() {
    const { scrollY } = useScroll();

    // Fade out as the user scrolls away from the top
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
    const y = useTransform(scrollY, [0, 300], [0, 20]);

    return (
        <motion.div
            style={{ opacity, scale, y }}
            className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center pointer-events-none select-none"
        >
            {/* Rotating text ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                        />
                    </defs>
                    <text
                        className="text-[9px] font-bold uppercase tracking-[0.3em] fill-foreground/40"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        <textPath xlinkHref="#circlePath" startOffset="0%">
                            Explore the story • Explore the story •
                        </textPath>
                    </text>
                </svg>
            </motion.div>

            {/* Static center arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FiArrowDown className="w-5 h-5 text-foreground/60" />
                </motion.div>
            </div>
        </motion.div>
    );
}
