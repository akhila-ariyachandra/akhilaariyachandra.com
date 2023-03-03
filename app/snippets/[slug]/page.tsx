import config from "@/lib/config";
import Balancer from "react-wrap-balancer";
import MDXComponent from "@/components/MDXComponent";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSnippets } from "contentlayer/generated";

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allSnippets.map((snippet) => ({
    slug: snippet.slug,
  }));
};

interface SnippetsPostPageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: SnippetsPostPageProps) => {
  const slug = params?.slug.toString();

  const snippet = allSnippets.find((snippet) => snippet.slug === slug);

  if (!snippet) {
    notFound();
  }

  return {
    title: snippet.title,
    description: snippet.description,
    openGraph: {
      title: snippet.title,
      description: snippet.description,
      url: `${config.siteUrl}/snippets/${snippet.slug}`,
      images: [
        {
          url: `${config.siteUrl}/snippets-cover.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
  } satisfies Metadata;
};

const SnippetsPostPage = async ({ params }: SnippetsPostPageProps) => {
  const slug = params?.slug.toString();

  const snippet = allSnippets.find((snippet) => snippet.slug === slug);

  if (!snippet) {
    // Redirect to 404 if post doesn't exist
    notFound();
  }

  return (
    <>
      <h1 className="my-8 px-4 text-center font-sora text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
        <Balancer>{snippet.title}</Balancer>
      </h1>

      <p className="my-2 px-4 text-center font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
        {snippet.description}
      </p>

      <MDXComponent code={snippet.body.code} />
    </>
  );
};

export default SnippetsPostPage;
