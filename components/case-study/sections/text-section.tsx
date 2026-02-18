import { cn } from "@/lib/utils";
import type { TextSection } from "@/types/case-study";

export function TextBlock({ section }: { section: TextSection }) {
  return (
    <div
      className={cn(
        "max-w-prose text-lg text-muted-foreground",
        section.alignment === "left" && "mr-auto text-left",
        section.alignment === "right" && "ml-auto text-right",
        section.alignment === "center" && "mx-auto text-center",
      )}
    >
      {section.content}
    </div>
  );
}
