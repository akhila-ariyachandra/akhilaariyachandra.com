import Link from "next/link";
import ListContainer from "@/components/ListContainer";
import type { FC } from "react";
import { allSnippets } from "contentlayer/generated";

const SnippetsPage: FC = () => {
  const snippets = allSnippets.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
  }));

  return (
    <ListContainer title="Code Snippets">
      {snippets.map((snippet) => (
        <article key={snippet.slug} className="space-y-2">
          <Link
            href={`/snippets/${snippet.slug}`}
            className="font-sora text-3xl font-bold text-emerald-700 dark:text-emerald-600"
          >
            {snippet.title}
          </Link>

          <p className="font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
            {snippet.description}
          </p>
        </article>
      ))}
    </ListContainer>
  );
};

export default SnippetsPage;
