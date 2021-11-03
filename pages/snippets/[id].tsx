import dynamic from "next/dynamic";
import SEO from "@/components/SEO";
const Reactions = dynamic(() => import("@/components/post/Reactions"));
const HitCounter = dynamic(() => import("@/components/post/HitCounter"));
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Snippet as SnippetType } from "@/lib/types";
import { getAllSnippetIds, getSnippetData } from "@/lib/snippets";
import { mdxComponents } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote";

import styles from "@/styles/snippet.module.scss";

type Props = {
  snippet: SnippetType;
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

      <div className={`prose dark:prose-dark my-6 ${styles.prose} max-w-none`}>
        <MDXRemote {...snippet.content} components={mdxComponents} />
      </div>

      <HitCounter />

      <Reactions />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllSnippetIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string;
  const snippet = await getSnippetData(id);

  return {
    props: { snippet },
  };
};

export default Snippet;
