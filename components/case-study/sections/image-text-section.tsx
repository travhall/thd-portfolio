"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ImageTextSection } from "@/types/case-study";

export function ImageTextBlock({ section }: { section: ImageTextSection }) {
  return (
    <div
      className={cn(
        "grid gap-8 items-center md:grid-cols-2",
        section.imagePosition === "right" && "md:grid-cols-[1fr_1.2fr]",
        section.imagePosition === "left" && "md:grid-cols-[1.2fr_1fr]",
      )}
    >
      <div
        className={cn(
          "relative aspect-4/3 rounded-sm overflow-hidden",
          section.imagePosition === "right" ? "md:order-2" : "md:order-1",
        )}
      >
        <Image
          src={section.image.url}
          alt={section.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {section.image.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2">
            <p className="text-sm text-center">{section.image.caption}</p>
          </div>
        )}
      </div>

      <div className={section.imagePosition === "right" ? "md:order-1" : "md:order-2"}>
        <p className="text-lg text-muted-foreground">{section.content}</p>
      </div>
    </div>
  );
}
