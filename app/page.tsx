import { Hero } from "@/components/layout/hero";
import {
  FeaturedProject,
  WorkCta,
} from "@/components/sections/featured-project";
// import { WorkList } from "@/components/sections/work-list";
import { CaseStudies } from "@/components/sections/case-studies";
import { getFeaturedCaseStudies } from "@/data/case-studies";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
};

export default function Home() {
  const featuredStudies = getFeaturedCaseStudies();

  return (
    <div>
      <Hero imageDelay={0.4} />
      {/* Glass veil — frosted layer that scrolls over the pinned hero image */}
      <div
        aria-hidden="true"
        className="relative z-10 min-h-[70vh] backdrop-blur-sm bg-background/10 border-y border-border"
      />
      <CaseStudies studies={featuredStudies} />
      <WorkCta />
    </div>
  );
}
