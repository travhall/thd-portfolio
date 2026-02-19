"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Reactive media query — responds to OS setting changes mid-session.
// useSyncExternalStore is SSR-safe: the server snapshot always returns false,
// and the client subscribes to the MediaQueryList for live updates.
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false, // server snapshot
  );
}

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
  const prefersReducedMotion = usePrefersReducedMotion();

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
