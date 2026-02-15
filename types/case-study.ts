export type TextAlignment = "left" | "center" | "right";
export type ImagePosition = "left" | "right";

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
  sections: (TextSection | ImageTextSection)[];
  nextProject?: string;
  prevProject?: string;
  featured: boolean;
}
