import { Hero } from "@/components/layout/hero";
import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";

export default function Home() {
  return (
    <div>
      <Hero />
      <CaseStudies />
      <About />
    </div>
  );
}
