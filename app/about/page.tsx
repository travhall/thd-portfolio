import { AboutContent } from "@/components/sections/about-content";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

const { name, siteName, url, descriptions, ogImage } = siteConfig;

export const metadata: Metadata = {
  title: "About",
  description: descriptions.personal,
  alternates: {
    canonical: `${url}/about`,
  },
  openGraph: {
    title: `About | ${siteName}`,
    description: descriptions.personal,
    url: `${url}/about`,
    type: "profile",
    images: [
      {
        url: ogImage.default,
        width: ogImage.width,
        height: ogImage.height,
        alt: `${name} — designer and engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteName}`,
    description: descriptions.personal,
    images: [ogImage.default],
  },
};

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd />
      <AboutContent />
    </>
  );
}
