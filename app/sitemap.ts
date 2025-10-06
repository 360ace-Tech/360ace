import type { MetadataRoute } from "next";
import site from "@/content/site.json" assert { type: "json" };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.baseUrl}/consulting`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.baseUrl}/legal/privacy`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${site.baseUrl}/legal/terms`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
