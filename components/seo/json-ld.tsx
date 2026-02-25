// JSON-LD structured data components for schema.org markup.
// All components are server-safe (no "use client" directive) and render
// a single <script type="application/ld+json"> tag into the document head.

import type { CaseStudy } from "@/types/case-study";

const BASE_URL = "https://travishall.design";

// ── Primitive renderer ───────────────────────────────────────────────────────

function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── WebSite schema ───────────────────────────────────────────────────────────
// Placed in the root layout. Establishes the site identity and enables
// Google's sitelinks search box if search is ever added.

export function WebSiteJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "travishall.design",
        url: BASE_URL,
        description: "Selected design and development work by Travis Hall",
        author: {
          "@type": "Person",
          name: "Travis Hall",
          url: BASE_URL,
        },
      }}
    />
  );
}

// ── Person schema ────────────────────────────────────────────────────────────
// Placed on the About page. Signals professional identity to search engines
// and can surface in Google's knowledge panels.

export function PersonJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Travis Hall",
        url: BASE_URL,
        sameAs: [
          "https://github.com/travhall",
          "https://www.linkedin.com/in/travhall/",
        ],
        jobTitle: "Designer & Engineer",
        description:
          "Designer, engineer, and MFA-holder specializing in inclusive, human-centered digital experiences.",
        knowsAbout: [
          "Design Systems",
          "Front-End Engineering",
          "User Experience Design",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
        ],
      }}
    />
  );
}

// ── CreativeWork + BreadcrumbList schema ─────────────────────────────────────
// Placed on individual case study pages. CreativeWork describes the work
// itself; BreadcrumbList enables Google's breadcrumb rich result.

interface CaseStudyJsonLdProps {
  study: CaseStudy;
}

export function CaseStudyJsonLd({ study }: CaseStudyJsonLdProps) {
  const studyUrl = `${BASE_URL}/work/${study.id}`;
  const imageUrl = `${BASE_URL}${study.coverImage}`;

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          description: study.description,
          url: studyUrl,
          image: imageUrl,
          dateCreated: study.year,
          ...(study.client ? { contributor: { "@type": "Organization", name: study.client } } : {}),
          author: {
            "@type": "Person",
            name: "Travis Hall",
            url: BASE_URL,
          },
          creator: {
            "@type": "Person",
            name: "Travis Hall",
            url: BASE_URL,
          },
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: BASE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Work",
              item: `${BASE_URL}/work`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: study.title,
              item: studyUrl,
            },
          ],
        }}
      />
    </>
  );
}
