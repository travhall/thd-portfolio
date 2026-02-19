import type { CaseStudy } from "@/types/case-study";

type MetaEntry = {
  label: string;
  value: string;
};

interface CaseStudyMetaProps {
  study: CaseStudy;
}

export function CaseStudyMeta({ study }: CaseStudyMetaProps) {
  // Collect only the fields that are actually populated for this study.
  // Order reflects the natural reading sequence: when → who → what → how long.
  const entries: MetaEntry[] = [
    study.year     && { label: "Year",     value: study.year },
    study.client   && { label: "Client",   value: study.client },
    study.role     && { label: "Role",     value: study.role },
    study.duration && { label: "Duration", value: study.duration },
  ].filter(Boolean) as MetaEntry[];

  // Nothing to show — render nothing rather than an empty container.
  if (entries.length === 0) return null;

  return (
    <dl
      className="mx-auto max-w-md grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-x-8 gap-y-6 self-start"
      aria-label="Project details"
    >
      {entries.map(({ label, value }) => (
        <div key={label} className="space-y-1">
          <dt className="case-section-label">{label}</dt>
          <dd className="text-sm text-foreground leading-snug">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
