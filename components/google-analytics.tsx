"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const ALLOWED_DOMAINS = [
  "360ace.net",
  "www.360ace.net",
];

export default function GoogleAnalytics() {
  const [isAllowedDomain, setIsAllowedDomain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const allowed = ALLOWED_DOMAINS.includes(hostname);
      setIsAllowedDomain(allowed);

      if (!allowed) {
        console.log(
          `[Analytics] Skipping Google Analytics on domain: ${hostname}`
        );
      }
    }
  }, []);

  if (!GA_MEASUREMENT_ID) {
    console.warn("[Analytics] Google Analytics ID not configured");
    return null;
  }

  if (!isAllowedDomain) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
