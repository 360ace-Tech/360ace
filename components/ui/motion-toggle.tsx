"use client";

import { Button } from "@/components/ui/button";
import { usePreferences } from "@/components/providers/preferences-context";

export function MotionToggle() {
  const { reduceMotion, toggleReduceMotion } = usePreferences();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-pressed={reduceMotion}
      aria-label="Toggle reduced motion"
      onClick={toggleReduceMotion}
      className="font-medium"
    >
      {reduceMotion ? "Motion off" : "Motion on"}
    </Button>
  );
}
