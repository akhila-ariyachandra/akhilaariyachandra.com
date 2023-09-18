import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MDXComponent from "@/components/MDXComponent";
import Title from "@/components/Title";
import { getOgImages } from "@/lib/helpers";

import { allSnippets } from ".contentlayer/generated";

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allSnippets.map((snippet) => ({
    slug: snippet.slug,
  }));
};

type SnippetPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: SnippetPageProps): Promise<Metadata> => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params.slug);

  if (!snippet) {
    notFound();
  }

  return {
    title: `${snippet.title} | Akhila Ariyachandra`,
    description: "A code snippet",
    openGraph: {
      title: `${snippet.title} | Akhila Ariyachandra`,
      description: snippet.description,
      url: `/snippets/${snippet.slug}`,
      type: "article",
      images: getOgImages(snippet.title, "Akhila Ariyachandra", "Code Snippet"),
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

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 sm:mb-5 sm:text-base">
        {snippet.description}
      </p>

      <MDXComponent code={snippet.body.code} />
    </>
  );
};

export default SnippetPage;
