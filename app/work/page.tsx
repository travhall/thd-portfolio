import { getAllCaseStudies } from "@/data/case-studies";
import { WorkList } from "@/components/sections/work-list";

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return <WorkList studies={studies} />;
}
