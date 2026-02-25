// JSON-LD structured data components for schema.org markup.
// All components are server-safe (no "use client" directive) and render
// a single <script type="application/ld+json"> tag into the document head.

import type { CaseStudy } from "@/types/case-study";
import { siteConfig } from "@/lib/site-config";

const { name, siteName, url, descriptions, social, jobTitle, knowsAbout } = siteConfig;

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
        name: siteName,
        url,
        description: descriptions.site,
        author: {
          "@type": "Person",
          name,
          url,
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
        name,
        url,
        sameAs: [social.github, social.linkedin],
        jobTitle,
        description: descriptions.professional,
        knowsAbout,
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
  const studyUrl = `${url}/work/${study.id}`;
  const imageUrl = `${url}${study.coverImage}`;

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
            name,
            url,
          },
          creator: {
            "@type": "Person",
            name,
            url,
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
              item: url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Work",
              item: `${url}/work`,
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
