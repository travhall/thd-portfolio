import { getAllCaseStudies } from "@/data/case-studies";
import { WorkList } from "@/components/sections/work-list";

export default async function WorkPage() {
  const studies = await getAllCaseStudies();

  return <WorkList studies={studies} />;
}
