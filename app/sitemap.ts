import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://together.kaizosha.org/",
      lastModified: new Date("2026-08-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://together.kaizosha.org/privacy",
      lastModified: new Date("2026-08-18"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
