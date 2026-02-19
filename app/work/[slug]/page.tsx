import { getCaseStudy, getAllCaseStudies, getAdjacentCaseStudies } from "@/data/case-studies";
import { CaseStudyContent } from "@/components/case-study/case-study-content";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";
import type { Metadata } from "next";

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
    openGraph: {
      title: study.title,
      description: study.description,
      images: [study.coverImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: study.title,
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
      <CaseStudyContent
        study={study}
        prevStudy={prevStudy}
        nextStudy={nextStudy}
      />
    </PageTransition>
  );
}
