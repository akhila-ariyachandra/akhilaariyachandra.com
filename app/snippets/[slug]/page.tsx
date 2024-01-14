import { allSnippets } from ".contentlayer/generated";
import MDXComponent from "@/_components/mdx-component";
import Title from "@/_components/title";
import Views from "@/_components/views";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SnippetPageProps } from "./types";

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allSnippets.map((snippet) => ({
    slug: snippet.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: SnippetPageProps): Promise<Metadata> => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params.slug);

  if (!snippet) {
    notFound();
  }

  return {
    title: snippet.title,
    description: "A code snippet",
    openGraph: {
      title: snippet.title,
      description: snippet.description,
      url: `/snippets/${snippet.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `/snippets/${snippet.slug}`,
    },
  };
};

const SnippetPage = ({ params }: SnippetPageProps) => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params.slug);

  if (!snippet) {
    notFound();
  }

  return (
    <>
      <Title>{snippet.title}</Title>

      <p className="mb-4 text-sm text-zinc-600 sm:mb-5 sm:text-base dark:text-zinc-400">
        {snippet.description}

        <span className="font-light text-zinc-500 dark:text-zinc-400">
          {" - "}
        </span>

        <Views slug={snippet.slug} incrementOnMount />
      </p>

      <MDXComponent code={snippet.body.code} />
    </>
  );
};

export default SnippetPage;
