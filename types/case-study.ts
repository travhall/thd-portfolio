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
}
