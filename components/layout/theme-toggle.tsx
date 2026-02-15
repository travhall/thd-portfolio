"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
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

  if (!mounted) return <div className="h-9" />;

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={handleValueChange}
      size="sm"
      className="gap-1"
    >
      <ToggleGroupItem value="light" aria-label="Light mode">
        <Sun />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <Moon />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="System theme">
        <Monitor />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
