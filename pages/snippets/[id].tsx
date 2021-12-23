import SEO from "@/components/SEO";
import HitCounter from "@/components/post/HitCounter";
import Reactions from "@/components/post/Reactions";
import MDXComponent from "@/components/post/MDXComponent";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Snippet } from ".contentlayer/types";
import { allSnippets } from ".contentlayer/data";

type Props = {
  snippet: Snippet;
};

const Snippet: NextPage<Props> = ({ snippet }) => {
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

      <MDXComponent code={snippet.body.code} />

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
