import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author: string;
};

const contentPath = path.join(process.cwd(), "content", "ca");

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(contentPath);

  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(contentPath, file), "utf8");
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.md$/, ""),
          title: String(data.title ?? "Compte-rendu sans titre"),
          date: String(data.date ?? "1970-01-01"),
          summary: String(data.summary ?? ""),
          author: String(data.author ?? "Bureau HOD"),
        };
      }),
  );

  return articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getArticleBySlug(slug: string) {
  try {
    const raw = await fs.readFile(path.join(contentPath, `${slug}.md`), "utf8");
    const { data, content } = matter(raw);
    const processedContent = await remark().use(html).process(content);

    return {
      slug,
      title: String(data.title ?? "Compte-rendu"),
      date: String(data.date ?? "1970-01-01"),
      summary: String(data.summary ?? ""),
      author: String(data.author ?? "Bureau HOD"),
      contentHtml: processedContent.toString(),
    };
  } catch {
    notFound();
  }
}
