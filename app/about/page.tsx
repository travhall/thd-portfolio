import { AboutContent } from "@/components/sections/about-content";
import { PersonJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "I'm Travis — I make things people use. Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
  alternates: {
    canonical: "https://travishall.design/about",
  },
  openGraph: {
    title: "About | travishall.design",
    description: "I'm Travis — I make things people use. Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
    url: "https://travishall.design/about",
    type: "profile",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Travis Hall — designer and engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | travishall.design",
    description: "I'm Travis — I make things people use. Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
    images: ["/images/og-default.jpg"],
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
