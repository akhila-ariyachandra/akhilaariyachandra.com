import a11yEmoji from "@fec/remark-a11y-emoji";
import rehypeCodeTitle from "rehype-code-title";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import externalLinks from "remark-external-links";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import Balancer from "react-wrap-balancer";
import MDXComponent from "@/components/MDXComponent";
import { serialize } from "next-mdx-remote/serialize";
import { getCodeSnippets, getCodeSnippet } from "@/utils/sanity";

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = async () => {
  const codeSnippets = await getCodeSnippets();
  return codeSnippets.map((snippet) => ({
    slug: snippet.slug.current,
  }));
};

interface SnippetsPostPageProps {
  params: {
    slug: string;
  };
}

const SnippetsPostPage = async ({ params }: SnippetsPostPageProps) => {
  const slug = params?.slug.toString();

  const snippet = await getCodeSnippet(slug);

  const mdxSource = await serialize(snippet.content, {
    mdxOptions: {
      remarkPlugins: [smartypants, a11yEmoji, externalLinks, remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeCodeTitle, rehypePrism],
    },
  });

  return (
    <>
      <h1 className="my-8 px-4 text-center font-sora text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
        <Balancer>{snippet.title}</Balancer>
      </h1>

      <p className="my-2 px-4 text-center font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
        {snippet.description}
      </p>

      <MDXComponent source={mdxSource} />
    </>
  );
};

export default SnippetsPostPage;
