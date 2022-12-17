import MDXComponent from "@/components/MDXComponent";
import type { FC } from "react";
import { allSnippets } from "contentlayer/generated";

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

  return (
    <>
      <h1 className="my-8 px-4 text-center font-sora text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
        {snippet.title}
      </h1>

      <p className="my-2 px-4 text-center font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
        {snippet.description}
      </p>

      <MDXComponent code={snippet.body.code} />
    </>
  );
};

export default SnippetsPostPage;
