import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/share", "/gallery", "/rules"];
  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }));
}
