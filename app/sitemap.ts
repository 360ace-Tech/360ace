import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://360ace.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/tech", "/food", "/services", "/contact", "/work", "/privacy"];
  const lastModified = new Date();
  return routes.map((path) => ({ url: `${siteUrl}${path}`, lastModified }));
}

