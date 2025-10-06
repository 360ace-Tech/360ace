import type { MetadataRoute } from "next";
import site from "@/content/site.json" assert { type: "json" };

export default function robots(): MetadataRoute.Robots {
  const host = site.baseUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
