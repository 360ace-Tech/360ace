"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePreferences } from "@/components/providers/preferences-context";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
};

export function CountUp({ to, from = 0, duration = 1.2, delay = 0, className, once = true }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(from);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const { reduceMotion } = usePreferences();

  useEffect(() => {
    if (!isInView) return;

    let controls: ReturnType<typeof animate> | undefined;
    const animDuration = reduceMotion ? 0.3 : duration;
    const animDelay = reduceMotion ? 0 : delay;

    const timeout = setTimeout(() => {
      controls = animate(from, to, {
        duration: animDuration,
        ease: "easeOut",
        onUpdate: (v) => setValue(Math.round(v)),
      });
    }, Math.max(0, animDelay * 1000));

    return () => {
      clearTimeout(timeout);
      controls?.stop();
    };
  }, [isInView, to, from, duration, delay, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

