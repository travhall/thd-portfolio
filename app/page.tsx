import { Hero } from "@/components/layout/hero";
import { CaseStudies } from "@/components/sections/case-studies";
import { getFeaturedCaseStudies } from "@/data/case-studies";

export default async function Home() {
  const featuredStudies = await getFeaturedCaseStudies();

  return (
    <div>
      <Hero />
      <CaseStudies studies={featuredStudies} />
    </div>
  );
}
