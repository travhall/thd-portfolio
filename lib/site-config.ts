// ── Site Configuration ────────────────────────────────────────────────────────
// Single source of truth for identity, contact, and metadata values.
// Import from here; never hardcode these strings in pages or components.

export const siteConfig = {
  // ── Identity
  name: "Travis Hall",
  siteName: "travishall.design",
  url: "https://travishall.design",
  jobTitle: "Designer & Engineer",

  // ── Descriptions (keyed by context)
  descriptions: {
    /** Root layout default + WebSite JSON-LD */
    site: "Selected design and development work by Travis Hall",
    /** About page meta + Person JSON-LD */
    personal:
      "I'm Travis — I make things people use. Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
    /** Person JSON-LD description field */
    professional:
      "Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
    /** /work page meta */
    work: "Case studies in design systems, e-commerce, and front-end engineering by Travis Hall.",
    /** /style-guide page meta */
    styleGuide:
      "Design system reference for travishall.design — typography, color palette, motion tokens, and component states.",
  },

  // ── Contact & Social
  social: {
    github: "https://github.com/travhall",
    linkedin: "https://www.linkedin.com/in/travhall/",
    email: "hello@travishall.design",
  },

  // ── Default OG image
  ogImage: {
    default: "/images/og-default.jpg",
    width: 1200,
    height: 630,
  },

  // ── Schema.org knowsAbout (Person JSON-LD)
  knowsAbout: [
    "Design Systems",
    "Front-End Engineering",
    "User Experience Design",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ],
} as const;
