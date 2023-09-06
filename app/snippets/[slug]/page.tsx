import Title from "@/components/Title";
import MDXComponent from "@/components/MDXComponent";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSnippets } from ".contentlayer/generated";
import { getOgImages } from "@/lib/helpers";

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
      description: "A code snippet",
      url: `https://akhilaariyachandra.com/snippet/${snippet.slug}`,
      type: "article",
      images: getOgImages(snippet.title, "Akhila Ariyachandra", "Code Snippet"),
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

      <p className="text-sm text-zinc-600 sm:text-base">
        {snippet.description}
      </p>

      <MDXComponent code={snippet.body.code} />
    </>
  );
};

export default SnippetPage;
