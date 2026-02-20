"use client";

// ---------------------------------------------------------------------------
// PageBgProvider
//
// Owns the --page-bg CSS custom property on <html>. Any component can call
// useSetPageBg(color) to declare a brand color for the current page, or
// useSetPageBg(null) / letting the component unmount to return to the default
// theme background. The CSS transition on body handles all blending.
//
// The CSS variable approach means:
//   • No React re-render on every color change (direct DOM write)
//   • Works across page navigations without state serialization
//   • The body transition does all the visual work
// ---------------------------------------------------------------------------

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";

const PAGE_BG_VAR = "--page-bg";
const DEFAULT_BG  = "var(--color-background)";

interface PageBgContextValue {
  setPageBg: (color: string | null) => void;
  isDark: boolean;
}

const PageBgContext = createContext<PageBgContextValue>({
  setPageBg: () => {},
  isDark: false,
});

export function usePageBgContext() {
  return useContext(PageBgContext);
}

export function PageBgProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // Track theme for consumers that need to pick brandDark vs brandLight
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    // Enable the background transition after mount so the initial paint never
    // animates — the class is absent during SSR and the first client render,
    // meaning no flash-of-transition on page load.
    document.documentElement.classList.add("page-bg-transition");
    return () => observer.disconnect();
  }, []);

  // When theme flips, update --page-bg to the new default only if it is
  // currently holding the default (i.e. not overridden by a brand color).
  useEffect(() => {
    const current = document.documentElement.style.getPropertyValue(PAGE_BG_VAR).trim();
    if (!current || current === DEFAULT_BG) {
      document.documentElement.style.setProperty(PAGE_BG_VAR, DEFAULT_BG);
    }
  }, [isDark]);

  const setPageBg = useCallback((color: string | null) => {
    document.documentElement.style.setProperty(
      PAGE_BG_VAR,
      color ?? DEFAULT_BG
    );
  }, []);

  return (
    <PageBgContext.Provider value={{ setPageBg, isDark }}>
      {children}
    </PageBgContext.Provider>
  );
}
