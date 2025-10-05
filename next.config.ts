import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
