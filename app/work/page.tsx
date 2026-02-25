import { getAllCaseStudies } from "@/data/case-studies";
import { WorkList } from "@/components/sections/work-list";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

const { name, siteName, url, descriptions, ogImage } = siteConfig;

export const metadata: Metadata = {
  title: "Case Studies",
  description: descriptions.work,
  alternates: {
    canonical: `${url}/work`,
  },
  openGraph: {
    title: `Case Studies | ${siteName}`,
    description: descriptions.work,
    url: `${url}/work`,
    images: [
      {
        url: ogImage.default,
        width: ogImage.width,
        height: ogImage.height,
        alt: `Case studies by ${name} — design systems, e-commerce, and front-end engineering`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Case Studies | ${siteName}`,
    description: descriptions.work,
    images: [ogImage.default],
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
