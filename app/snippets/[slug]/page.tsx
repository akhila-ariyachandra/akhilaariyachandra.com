import Title from "@/components/Title";
import MDXComponent from "@/components/MDXComponent";
import { notFound } from "next/navigation";
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
