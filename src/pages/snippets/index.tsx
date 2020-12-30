import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Link from "next/link";
import type { NextPage, GetStaticProps } from "next";
import type { Snippet } from "src/lib/types";
import { getSortedSnippets } from "src/lib/snippets";

type Props = {
  snippets: Snippet[];
};

const Snippets: NextPage<Props> = ({ snippets }) => {
  return (
    <Layout>
      <SEO
        title="Code Snippets"
        description="A few pieces of code I've found useful"
        image="/snippets-cover.jpg"
      />

      <h1 className="mx-4 my-10 text-black dark:text-white text-4xl font-bold">
        Code Snippets
      </h1>

      <section className="p-4 space-y-4">
        {snippets.map((snippet) => (
          <article key={snippet.id}>
            <Link href={`/snippets/${snippet.id}`}>
              <a className="dark:text-green-600 text-green-700 text-3xl font-bold">
                {snippet.title}
              </a>
            </Link>

            <p className="text-black dark:text-white text-lg font-medium">
              {snippet.description}
            </p>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const snippets = await getSortedSnippets();

  return {
    props: { snippets },
  };
};

export default Snippets;
