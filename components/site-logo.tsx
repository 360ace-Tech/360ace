"use client";

import React, { forwardRef } from "react";

type LogoProps = React.SVGProps<SVGSVGElement> & { text?: string; start?: boolean };

const Logo = forwardRef<SVGSVGElement, LogoProps>(({ text = "360ace Technologies", start = false, ...props }, ref) => {
  const chars = Array.from(text);
  const WRITE_DELAY = 0.08; // faster: seconds between letters
  const WRITE_DUR = 0.2;   // faster: seconds to write each letter
  const FILL_DUR = 0.12;   // faster: seconds to fill
  return (
    <svg ref={ref} viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" className="logo hw-svg" style={{ maxWidth: "520px", width: "60vw", overflow: "visible" }} {...props}>
      <rect x="0" y="0" width="600" height="220" fill="transparent" />
      <text x="300" y="110" textAnchor="middle" dominantBaseline="middle" fontSize="68" style={{ fontFamily: 'var(--font-hand), cursive' }}>
        {chars.map((ch, i) => {
          const writeDelay = i * WRITE_DELAY;
          const fillDelay = writeDelay + WRITE_DUR;
          return (
            <tspan key={i}
              style={start ? { animation: `hw-write ${WRITE_DUR}s ease-out ${writeDelay}s forwards, hw-fill ${FILL_DUR}s ease-out ${fillDelay}s forwards` } : undefined}>
              {ch}
            </tspan>
          );
        })}
      </text>
    </svg>
  );
});

Logo.displayName = "Logo";

export default Logo;
