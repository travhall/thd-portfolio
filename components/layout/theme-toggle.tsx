"use client";

import * as React from "react";
import {
  IoMoonOutline,
  IoSunnyOutline,
  IoDesktopOutline,
} from "react-icons/io5";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle value change, preventing deselection
  const handleValueChange = (value: string) => {
    if (value) {
      // Only update if a value is provided (prevents deselection)
      setTheme(value);
    }
  };

  if (!mounted) return null;

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={handleValueChange}
      className="gap-1"
    >
      <ToggleGroupItem value="light" aria-label="Light mode">
        <IoSunnyOutline className="h-[1.2rem] w-[1.2rem]" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <IoMoonOutline className="h-[1.2rem] w-[1.2rem]" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="System theme">
        <IoDesktopOutline className="h-[1.2rem] w-[1.2rem]" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
