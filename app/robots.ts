import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = "https://360ace.net";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
