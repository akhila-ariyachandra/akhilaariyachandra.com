import hydrate from "next-mdx-remote/hydrate";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Code from "src/components/code/Code";
import Comment from "src/components/Comment";
import Image from "next/image";
import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Snippet as SnippetType } from "src/lib/types";
import { getAllSnippetIds, getSnippetData } from "src/lib/snippets";

import styles from "src/styles/snippets/snippet.module.scss";

const mdxComponents = {
  pre: (props) => <Code {...props} />,
  Image,
};

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

      <h1 className="pseudo-full-bleed text-4xl text-black dark:text-white font-black text-center px-4 my-8">
        {snippet.title}
      </h1>

      <p className="pseudo-full-bleed text-lg text-black dark:text-white font-medium text-center px-4 my-2">
        {snippet.description}
      </p>

      <div className={`prose dark:prose-dark p-4 ${styles.prose}`}>
        {content}
      </div>

      <Comment />
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
