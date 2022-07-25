import MDXComponent from "@/components/post/MDXComponent";
import SEO from "@/components/SEO";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Snippet } from "contentlayer/generated";
import { allSnippets } from "contentlayer/generated";

type SnippetProps = {
  snippet: Snippet;
};

const Snippet: NextPage<SnippetProps> = ({ snippet }) => {
  return (
    <>
      <SEO
        title={snippet.title}
        description={snippet.description}
        image="/snippets-cover.jpg"
      />

      <h1 className="my-8 px-4 text-center font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
        {snippet.title}
      </h1>

      <p className="my-2 px-4 text-center font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
        {snippet.description}
      </p>

      <MDXComponent code={snippet.body.code} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allSnippets.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug.toString();

  const snippet = allSnippets.find((snippet) => snippet.slug === slug);

  return {
    props: { snippet },
  };
};

export default Snippet;
