import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import MDXComponent from "@/components/MDXComponent";
import Title from "@/components/Title";
import Views from "@/components/Views";
import { getOgImage } from "@/lib/helpers";

import { allSnippets } from ".contentlayer/generated";

const Upvotes = dynamic(() => import("@/components/Upvotes"));

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
      images: getOgImage(snippet.title, "Akhila Ariyachandra", "Code Snippet"),
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

        <span className="font-light text-zinc-500 dark:text-zinc-400">
          {" - "}
        </span>

        <Views slug={snippet.slug} incrementOnMount />
      </p>

      <MDXComponent code={snippet.body.code} />

      <Upvotes slug={snippet.slug} />
    </>
  );
};

export default SnippetPage;
