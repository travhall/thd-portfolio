import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Design system reference for travishall.design — typography, color palette, motion tokens, and component states.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
