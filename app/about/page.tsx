import { AboutContent } from "@/components/sections/about-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Senior Design Manager and UX Design Lead specializing in inclusive, human-centered digital experiences.",
};

export default function AboutPage() {
  return <AboutContent />;
}
