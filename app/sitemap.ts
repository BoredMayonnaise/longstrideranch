import type { MetadataRoute } from "next";
import { allRoutes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: `${site.url}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.href === "/" ? 1 : 0.8,
  }));
}
