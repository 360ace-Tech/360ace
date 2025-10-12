"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { usePreferences } from "./preferences-context";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { reduceMotion } = usePreferences();

  useEffect(() => {
    // Don't initialize smooth scroll when reduced motion is enabled
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
