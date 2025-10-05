import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://360ace.net";
  return [
    { url: baseUrl },
    { url: `${baseUrl}/consulting` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/legal/privacy` },
    { url: `${baseUrl}/legal/terms` }
  ];
}
