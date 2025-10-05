/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion"
    ]
  },
  redirects: async () => [
    {
      source: "/consulting/tech",
      destination: "https://360ace.tech",
      permanent: false
    },
    {
      source: "/consulting/food",
      destination: "https://360ace.food",
      permanent: false
    }
  ]
};

export default nextConfig;
