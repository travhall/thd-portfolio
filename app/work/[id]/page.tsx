import { getCaseStudy, getAllCaseStudies } from "@/data/case-studies";
import { CaseStudyContent } from "@/components/case-study/case-study-content";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({
    id: study.id,
  }));
}

export default async function CaseStudy({
  params,
}: {
  params: { id: string };
}) {
  const study = await getCaseStudy(params.id);

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
