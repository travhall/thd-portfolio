import { AboutContent } from "@/components/sections/about-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "I'm Travis — I make things people use. Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
};

export default function AboutPage() {
  return <AboutContent />;
}
