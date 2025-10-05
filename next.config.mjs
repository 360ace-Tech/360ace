import { createSecureHeaders } from "next-secure-headers";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  typedRoutes: true,
  headers: async () => {
    const securityHeaders = createSecureHeaders({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", "https:", "data:"],
          objectSrc: ["'none'"],
          frameAncestors: ["'self'"],
          upgradeInsecureRequests: true,
        },
      },
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
      },
      referrerPolicy: "strict-origin-when-cross-origin",
    });

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  redirects: async () => [
    {
      source: "/consulting/tech",
      destination: "https://360ace.tech",
      permanent: false,
    },
    {
      source: "/consulting/food",
      destination: "https://360ace.food",
      permanent: false,
    },
  ],
};

export default nextConfig;
