"use client";

import { useState } from "react";
import { FiCopy, FiCheck, FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { siteConfig } from "@/lib/site-config";

const { social } = siteConfig;

interface EmailPopoverProps {
  children: React.ReactNode;
  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  triggerClassName?: string;
  subject?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export function EmailPopover({
  children,
  triggerVariant = "default",
  triggerSize,
  triggerClassName,
  subject = "Hello from your portfolio",
  align = "start",
  side = "bottom",
}: EmailPopoverProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={triggerClassName}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} side={side} className="w-auto p-2">
        <div className="flex flex-row">
          <Button asChild variant="ghost" size="default">
            <a
              href={`mailto:${social.email}?subject=${encodeURIComponent(subject)}`}
            >
              Open in mail app
              <FiSend aria-hidden="true" />
            </a>
          </Button>
          <Button variant="ghost" size="default" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy email"}
            {copied ? (
              <FiCheck aria-hidden="true" />
            ) : (
              <FiCopy aria-hidden="true" />
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
