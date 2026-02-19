import { getAllCaseStudies } from "@/data/case-studies";
import { WorkList } from "@/components/sections/work-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in design systems, e-commerce, and front-end engineering by Travis Hall.",
  openGraph: {
    title: "Work | travishall.design",
    description: "Case studies in design systems, e-commerce, and front-end engineering by Travis Hall.",
    images: ["/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.jpg"],
  },
};

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return <WorkList studies={studies} />;
}
