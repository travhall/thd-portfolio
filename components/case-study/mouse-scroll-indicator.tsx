"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";
import React, { useEffect, useState } from "react";

export function MouseScrollIndicator() {
    const { scrollY } = useScroll();
    const [hasMoved, setHasMoved] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Velocity tracking for the "stretch" effect
    const velocityX = useVelocity(mouseX);
    const velocityY = useVelocity(mouseY);
    const velocity = useTransform([velocityX, velocityY], ([vx, vy]: number[]) =>
        Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2))
    );

    // Smooth springs for following the mouse with a slight lag
    // Using a more "elastic" config for a premium feel
    const springConfig = { damping: 25, stiffness: 120 };
    const scrollXSpring = useSpring(mouseX, springConfig);
    const scrollYSpring = useSpring(mouseY, springConfig);

    // Visual transforms
    const opacity = useTransform(scrollY, [0, 300], [hasMoved ? 1 : 0, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    // Stretch the pill based on velocity
    const stretchX = useTransform(velocity, [0, 1000, 3000], [1, 1.1, 1.3]);
    const rotate = useTransform(velocityX, [-3000, 3000], [-8, 8]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!hasMoved) setHasMoved(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, hasMoved]);

    return (
        <motion.div
            style={{
                position: "fixed",
                left: scrollXSpring,
                top: scrollYSpring,
                opacity,
                scale,
                translateX: "-50%",
                translateY: "-50%",
                rotate,
            }}
            className="z-50 hidden md:flex pointer-events-none select-none"
        >
            <motion.div
                style={{ scaleX: stretchX }}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-foreground/10 bg-background/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
            >
                {/* Leading dot */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                />

                <span
                    className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/80"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Scroll
                </span>
            </motion.div>

            {/* Subtle trail/shadow effect (optional, keeping it clean for now) */}
        </motion.div>
    );
}
