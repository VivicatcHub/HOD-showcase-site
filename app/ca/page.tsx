import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export default async function CAPage() {
  const articles = await getAllArticles();

  return (
    <section className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold">
          Comptes-rendus des C.A. et des A.G.
        </h1>
        <p className="mt-2 text-[#9E9BB8]">
          Retrouvez les dernières décisions et points clés des réunions.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
