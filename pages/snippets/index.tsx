import SEO from "@/components/SEO";
import Link from "next/link";
import ListContainer from "@/components/ListContainer";
import type { NextPage, GetStaticProps } from "next";
import type { Snippet } from "@/lib/types";
import { getSortedSnippets } from "@/lib/snippets";

type Props = {
  snippets: Snippet[];
};

const Snippets: NextPage<Props> = ({ snippets }) => {
  return (
    <>
      <SEO
        title="Code Snippets"
        description="A few pieces of code I've found useful"
        image="/snippets-cover.jpg"
      />

      <ListContainer title="Code Snippets">
        {snippets.map((snippet) => (
          <article key={snippet.id} className="space-y-2">
            <Link href={`/snippets/${snippet.id}`}>
              <a className="dark:text-green-600 text-green-700 font-sora text-3xl font-bold">
                {snippet.title}
              </a>
            </Link>

            <p className="dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium">
              {snippet.description}
            </p>
          </article>
        ))}
      </ListContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const snippets = await getSortedSnippets();

  return {
    props: { snippets },
  };
};

export default Snippets;
