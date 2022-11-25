import MDXComponent from "@/components/MDXComponent";
import type { FC } from "react";
import { notFound } from "next/navigation";
import { allSnippets } from "contentlayer/generated";

// https://beta.nextjs.org/docs/api-reference/segment-config
// export const dynamicParams = false;

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = async () => {
  return allSnippets.map((snippet) => ({
    slug: snippet.slug,
  }));
};

interface SnippetsPostPageProps {
  params: {
    slug: string;
  };
}

const SnippetsPostPage: FC<SnippetsPostPageProps> = ({ params }) => {
  const slug = params?.slug.toString();

  const snippet = allSnippets.find((snippet) => snippet.slug === slug);

  if (!snippet) {
    notFound();
  }

  return (
    <>
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

export default SnippetsPostPage;
