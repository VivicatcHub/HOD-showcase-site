import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLegalDoc } from "@/lib/legal";
import styles from "@/components/prose.module.css";

export const metadata: Metadata = {
  title: "Statuts de l'association | Heaven of Dice",
  description:
    "Statuts officiels de l'association Heaven of Dice, régie par la loi du 1er juillet 1901.",
};

export default async function StatutsPage() {
  const doc = await getLegalDoc("statuts");

  return (
    <article className="mx-auto max-w-3xl space-y-6 pb-12">
      <header className="space-y-2 border-b border-[#534AB7]/40 pb-4">
        <h1 className="text-3xl font-bold">{doc.title}</h1>
        {doc.updated ? (
          <p className="text-sm text-[#9E9BB8]">
            Dernière mise à jour :{" "}
            {new Date(doc.updated).toLocaleDateString("fr-FR")}
          </p>
        ) : null}
      </header>
      <section className={styles.document}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
      </section>
    </article>
  );
}
