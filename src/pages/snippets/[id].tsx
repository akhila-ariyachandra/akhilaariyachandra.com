import hydrate from "next-mdx-remote/hydrate";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
const Reactions = dynamic(() => import("@/components/post/Reactions"));
const HitCounter = dynamic(() => import("@/components/post/HitCounter"));
const Comments = dynamic(() => import("@/components/post/Comments"));
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Snippet as SnippetType } from "@/lib/types";
import { getAllSnippetIds, getSnippetData } from "@/lib/snippets";
import { mdxComponents } from "@/lib/mdx";

import styles from "@/styles/snippet.module.scss";

type Props = {
  snippet: SnippetType;
};

const Snippet: NextPage<Props> = ({ snippet }) => {
  const content = hydrate(snippet.content, {
    components: mdxComponents,
  });

  return (
    <Layout>
      <SEO
        title={snippet.title}
        description={snippet.description}
        image="/snippets-cover.jpg"
      />

      <h1 className="pseudo-full-bleed my-8 px-4 text-center dark:text-gray-200 text-gray-800 text-4xl font-black">
        {snippet.title}
      </h1>

      <p className="pseudo-full-bleed my-2 px-4 text-center dark:text-gray-200 text-gray-800 text-lg font-medium">
        {snippet.description}
      </p>

      <div className={`prose dark:prose-dark p-4 ${styles.prose}`}>
        {content}
      </div>

      <HitCounter id={snippet.id} title={snippet.title} />

      <Reactions />

      <Comments />
    </Layout>
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
