import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="rounded-xl border border-[#534AB7]/50 bg-[#1A1730] p-5 shadow-[0_0_20px_rgba(83,74,183,0.2)]">
      <p className="text-xs text-[#9E9BB8]">{new Date(article.date).toLocaleDateString("fr-FR")}</p>
      <h3 className="mt-2 text-lg font-bold text-[#F0EEF8]">{article.title}</h3>
      <p className="mt-3 text-sm text-[#9E9BB8]">{article.summary}</p>
      <Link href={`/ca/${article.slug}`} className="mt-4 inline-block text-sm font-medium text-[#F3B562] hover:underline">
        Lire la suite
      </Link>
    </article>
  );
}
