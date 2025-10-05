"use client";

import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/components/providers/preferences-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePreferences();

  const Icon = theme === "dark" ? Sun : MoonStar;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
