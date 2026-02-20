type TextAlignment = "left" | "center" | "right";
type ImagePosition = "left" | "right";

export interface CaseStudyLink {
  href: string;
  label: string;
}

export interface LedeSection {
  type: "lede";
  content: string;
}

export interface TextSection {
  type: "text";
  content: string;
  alignment: TextAlignment;
}

export interface ImageTextSection {
  type: "image-text";
  image: {
    url: string;
    alt: string;
    caption?: string;
  };
  content: string;
  imagePosition: ImagePosition;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  coverImage: string;
  year: string;
  tags: string[];
  client?: string;
  role?: string;
  duration?: string;
  // Optional links surfaced in the lede — e.g. live site, repo, Figma prototype.
  // Only renders if at least one entry is present.
  links?: CaseStudyLink[];
  sections: (LedeSection | TextSection | ImageTextSection)[];
  featured: boolean;
  // Brand colors for the /work panel layout.
  // OKLCH strings — e.g. "oklch(0.88 0.04 196)".
  // Light mode uses brandLight, dark mode uses brandDark.
  // Text color on each panel is determined by the lightness value:
  // L >= 0.55 → dark text, L < 0.55 → light text.
  brandLight?: string;
  brandDark?: string;
}
