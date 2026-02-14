"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top immediately on route change, bypassing animation
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Respect prefers-reduced-motion: pass prevent fn so Lenis stops intercepting scroll
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: !prefersReducedMotion,
        prevent: prefersReducedMotion ? () => true : undefined,
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
