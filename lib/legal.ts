import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const legalPath = path.join(process.cwd(), "content", "legal");

export async function getLegalDoc(slug: string) {
  try {
    const raw = await fs.readFile(path.join(legalPath, `${slug}.md`), "utf8");
    const { data, content } = matter(raw);

    return {
      title: String(data.title ?? "Statuts"),
      updated: String(data.updated ?? ""),
      content: content.toString(),
    };
  } catch {
    notFound();
  }
}
