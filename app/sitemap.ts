import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/contact", "/events", "/ludobible", "/xp"].map(
    (route) => ({
      url: `${SITE_URL}${route}/`,
      lastModified: new Date(),
    }),
  );

  return staticRoutes;
}
