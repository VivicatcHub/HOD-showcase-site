import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/ca",
    "/contact",
    "/events",
    "/ludobible",
    "/statuts",
    "/xp",
  ].map((route) => ({
    url: `${SITE_URL}${route}/`,
    lastModified: new Date(),
  }));

  const articles = await getAllArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/ca/${article.slug}/`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...articleRoutes];
}
