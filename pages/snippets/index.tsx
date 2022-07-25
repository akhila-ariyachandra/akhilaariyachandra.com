import Link from "next/link";
import ListContainer from "@/components/ListContainer";
import SEO from "@/components/SEO";
import type { GetStaticProps, NextPage } from "next";
import { allSnippets } from "contentlayer/generated";

type SnippetsProps = {
  snippets: {
    slug: string;
    title: string;
    description: string;
  }[];
};

const Snippets: NextPage<SnippetsProps> = ({ snippets }) => {
  return (
    <>
      <SEO
        title="Code Snippets"
        description="A few pieces of code I've found useful"
        image="/snippets-cover.jpg"
      />

      <ListContainer title="Code Snippets">
        {snippets.map((snippet) => (
          <article key={snippet.slug} className="space-y-2">
            <Link href={`/snippets/${snippet.slug}`}>
              <a className="font-sora text-3xl font-bold text-emerald-700 dark:text-emerald-600">
                {snippet.title}
              </a>
            </Link>

            <p className="font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
              {snippet.description}
            </p>
          </article>
        ))}
      </ListContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const snippets = allSnippets.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
  }));

  return {
    props: { snippets },
  };
};

export default Snippets;
