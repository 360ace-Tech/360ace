"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export function CountUp({ to, from = 0, duration = 1.2, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | undefined;
    const timeout = setTimeout(() => {
      controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setValue(Math.round(v)),
      });
    }, Math.max(0, delay * 1000));

    return () => {
      clearTimeout(timeout);
      controls?.stop();
    };
  }, [to, from, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

