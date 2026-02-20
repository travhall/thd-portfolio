"use client";

// ---------------------------------------------------------------------------
// usePageBg(color)
//
// Declares a background color for the current page by writing directly to
// --page-bg on <html>. The CSS transition on body handles the visible blend.
//
// Pass null to reset to the theme default (use this on neutral pages like
// home and about so they actively clear any brand color from a prior page).
//
// Design principle: every page declares what it wants on MOUNT. There is no
// cleanup on unmount — with App Router the incoming page always mounts before
// the outgoing page unmounts, so cleanup would fire after the new page has
// already established its own color, causing a visible flash. Instead, each
// page is responsible for its own color declaration.
// ---------------------------------------------------------------------------

import { useEffect } from "react";
import { usePageBgContext } from "@/components/layout/page-bg-provider";

export function usePageBg(color: string | null) {
  const { setPageBg } = usePageBgContext();

  useEffect(() => {
    setPageBg(color);
    // No cleanup: the next page declares its color on mount.
    // Neutral pages (home, about) pass null and actively reset on mount.
  // Re-run when color changes (e.g. user switches dark/light mode)
  }, [color, setPageBg]);
}
