import { getCaseStudy, getAllCaseStudies } from "@/data/case-studies";
import { CaseStudyContent } from "@/components/case-study/case-study-content";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
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
  const study = await getCaseStudy(params.slug);

  if (!study) return {};

  return {
    title: study.title,
    description: study.description,
    openGraph: {
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
  const study = await getCaseStudy(params.slug);

  if (!study) {
    notFound();
  }

  // Get previous and next studies
  const prevStudy = study.prevProject
    ? await getCaseStudy(study.prevProject)
    : undefined;
  const nextStudy = study.nextProject
    ? await getCaseStudy(study.nextProject)
    : undefined;

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
