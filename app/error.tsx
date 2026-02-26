"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import { usePageBg } from "@/hooks/use-page-bg";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  // Reset any brand color left over from a previous page.
  usePageBg(null);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-start justify-center p-4 xl:p-8 max-w-8xl mx-auto">
      <p className="hero-label mb-6">Error</p>
      <h1 className="about-heading mb-4">Something went wrong</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-[48ch]">
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      <div className="flex flex-row flex-wrap gap-3">
        <Button variant="default" size="lg" className="group" onClick={reset}>
          <FiRefreshCw aria-hidden="true" />
          Try again
        </Button>
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/">
            <FiArrowLeft
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
