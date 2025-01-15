"use client";

import { cn } from "@/lib/utils";
import type { TextSection } from "@/types/case-study";

export function TextBlock({ section }: { section: TextSection }) {
  return (
    <div className="py-12 md:py-16">
      <div
        className={cn(
          "max-w-prose mx-auto px-4",
          section.alignment === "left" && "ml-0 mr-auto",
          section.alignment === "right" && "mr-0 ml-auto",
          section.alignment === "center" && "mx-auto"
        )}
      >
        <div
          className={cn(
            "text-lg text-muted-foreground",
            section.alignment === "left" && "text-left",
            section.alignment === "right" && "text-right",
            section.alignment === "center" && "text-center"
          )}
        >
          {section.content}
        </div>
      </div>
    </div>
  );
}
