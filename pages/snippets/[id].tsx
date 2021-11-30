import SEO from "@/components/SEO";
import HitCounter from "@/components/post/HitCounter";
import Reactions from "@/components/post/Reactions";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Snippet } from ".contentlayer/types";
import { mdxComponents } from "@/lib/mdx";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allSnippets } from ".contentlayer/data";

import styles from "@/styles/snippet.module.scss";

type Props = {
  snippet: Snippet;
};

const Snippet: NextPage<Props> = ({ snippet }) => {
  const Component = useMDXComponent(snippet.body.code);

  return (
    <>
      <SEO
        title={snippet.title}
        description={snippet.description}
        image="/snippets-cover.jpg"
      />

      <h1 className="my-8 px-4 text-center dark:text-gray-200 text-gray-800 font-sora text-4xl font-black">
        {snippet.title}
      </h1>

      <p className="my-2 px-4 text-center dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-medium">
        {snippet.description}
      </p>

      <div className={`prose dark:prose-dark my-6 ${styles.prose} max-w-none`}>
        <Component components={mdxComponents} />
      </div>

      <HitCounter />

      <Reactions />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allSnippets.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const snippet = allSnippets.find((snippet) => snippet.id === params?.id);

  return {
    props: { snippet },
  };
};

export default Snippet;
