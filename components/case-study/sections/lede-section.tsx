import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { LedeSection, CaseStudyLink } from "@/types/case-study";

interface LedeBlockProps {
  section: LedeSection;
  links?: CaseStudyLink[];
}

export function LedeBlock({ section, links }: LedeBlockProps) {
  const hasLinks = links && links.length > 0;

  return (
    <div className="max-w-3xl space-y-8">
      {/* Opening paragraph — bordered left accent, upsized, lighter weight */}
      <p className="border-l-2 border-border pl-6 xl:pl-8 text-lg font-light leading-relaxed text-muted-foreground text-balance">
        {section.content}
      </p>

      {/* Optional links — only renders when at least one link is present */}
      {hasLinks && (
        <ul className="flex flex-wrap gap-x-6 gap-y-2 pl-8" aria-label="Project links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {label}
                <FiArrowUpRight
                  className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
