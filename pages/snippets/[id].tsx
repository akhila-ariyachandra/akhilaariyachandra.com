import Comments from "@/components/post/Comments";
import HitCounter from "@/components/post/HitCounter";
import MDXComponent from "@/components/post/MDXComponent";
import Reactions from "@/components/post/Reactions";
import SEO from "@/components/SEO";
import { getPageHitsKey } from "@/lib/constants";
import prisma from "@/prisma";
import type { Snippet } from "contentlayer/generated";
import { allSnippets } from "contentlayer/generated";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

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

      <h1 className="my-8 px-4 text-center font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
        {snippet.title}
      </h1>

      <p className="my-2 px-4 text-center font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200">
        {snippet.description}
      </p>

      <MDXComponent code={snippet.body.code} />

      <HitCounter />

      <Reactions />

      <Comments />
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
  const id = params?.id as string;
  const QUERY_KEY = getPageHitsKey(id);

  const snippet = allSnippets.find((snippet) => snippet.id === id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(QUERY_KEY, async () => {
    const { hits } = await prisma.page.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        hits: true,
      },
    });

    return hits;
  });

  return {
    props: { snippet, dehydratedState: dehydrate(queryClient) },
    revalidate: 3600, // 1 hour
  };
};

export default Snippet;
