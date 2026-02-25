import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Style Guide",
  description: siteConfig.descriptions.styleGuide,
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
