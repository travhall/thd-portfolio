import { getCaseStudy, getAllCaseStudies, getAdjacentCaseStudies } from "@/data/case-studies";
import { CaseStudyContent } from "@/components/case-study/case-study-content";
import { CaseStudyJsonLd } from "@/components/seo/json-ld";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

const { name, siteName, url } = siteConfig;

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({
    slug: study.id,
  }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const study = getCaseStudy(params.slug);

  if (!study) return {};

  return {
    title: study.title,
    description: study.description,
    alternates: {
      canonical: `${url}/work/${study.id}`,
    },
    openGraph: {
      title: `${study.title} | ${siteName}`,
      description: study.description,
      url: `${url}/work/${study.id}`,
      type: "article",
      images: [
        {
          url: study.coverImage,
          width: 1200,
          height: 630,
          alt: `${study.title} — case study by ${name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${study.title} | ${siteName}`,
      description: study.description,
      images: [study.coverImage],
    },
  };
}

export default async function CaseStudy(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const study = getCaseStudy(params.slug);

  if (!study) {
    notFound();
  }

  const { prevStudy, nextStudy } = getAdjacentCaseStudies(params.slug);

  return (
    <PageTransition>
      <CaseStudyJsonLd study={study} />
      <CaseStudyContent
        study={study}
        prevStudy={prevStudy}
        nextStudy={nextStudy}
      />
    </PageTransition>
  );
}
