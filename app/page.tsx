import { Hero } from "@/components/layout/hero";
import { CaseStudies } from "@/components/sections/case-studies";
import { getFeaturedCaseStudies } from "@/data/case-studies";

export default function Home() {
  const featuredStudies = getFeaturedCaseStudies();

  return (
    <div>
      <Hero imageDelay={0.4} />
      <CaseStudies studies={featuredStudies} />
    </div>
  );
}
