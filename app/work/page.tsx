import { getAllCaseStudies } from "@/data/case-studies";
import { WorkList } from "@/components/sections/work-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Case studies in design systems, e-commerce, and front-end engineering by Travis Hall.",
  alternates: {
    canonical: "https://travishall.design/work",
  },
  openGraph: {
    title: "Case Studies | travishall.design",
    description: "Case studies in design systems, e-commerce, and front-end engineering by Travis Hall.",
    url: "https://travishall.design/work",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Case studies by Travis Hall — design systems, e-commerce, and front-end engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | travishall.design",
    description: "Case studies in design systems, e-commerce, and front-end engineering by Travis Hall.",
    images: ["/images/og-default.jpg"],
  },
};

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return (
    <>
      <WorkList studies={studies} />
      <div className="h-dvh"></div>
    </>
  );
}
