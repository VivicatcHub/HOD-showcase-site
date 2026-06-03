import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: `${article.title} | Heaven of Dice`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <article className="mx-auto max-w-3xl space-y-6 pb-12">
      <header className="space-y-2 border-b border-[#534AB7]/40 pb-4">
        <p className="text-sm text-[#9E9BB8]">{new Date(article.date).toLocaleDateString("fr-FR")} · {article.author}</p>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-[#9E9BB8]">{article.summary}</p>
      </header>
      <div className="prose prose-invert max-w-none prose-headings:text-[#F0EEF8] prose-p:text-[#D6D3EA]" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </article>
  );
}
