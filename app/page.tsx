import { Hero } from "@/components/layout/hero";
import { CaseStudies } from "@/components/sections/case-studies";
import { getFeaturedCaseStudies } from "@/data/case-studies";

export default function Home() {
  const featuredStudies = getFeaturedCaseStudies();

  return (
    <div>
      <Hero />
      <CaseStudies studies={featuredStudies} />
    </div>
  );
}
