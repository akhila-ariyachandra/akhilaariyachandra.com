import dayjs from "dayjs";
import readingTime from "reading-time";
import a11yEmoji from "@fec/remark-a11y-emoji";
import rehypeCodeTitle from "rehype-code-title";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import externalLinks from "remark-external-links";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import BlogPostViews from "./views";
import MDXComponent from "@/components/MDXComponent";
import { serialize } from "next-mdx-remote/serialize";
import { formatDate } from "@/lib/helpers";
import { getBlogPosts, getBlogPost } from "@/utils/sanity";
import { urlFor } from "@/lib/sanity-client";

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false;

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = async () => {
  const blogPosts = await getBlogPosts();

  return blogPosts.map((post) => ({
    slug: post.slug.current,
  }));
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const slug = params?.slug.toString();

  const post = await getBlogPost(slug);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [smartypants, a11yEmoji, externalLinks, remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeCodeTitle, rehypePrism],
    },
  });

  return (
    <>
      <Image
        src={urlFor(post.banner).url()}
        alt={post.title}
        title={post.title}
        width={1200}
        height={630}
        className="rounded-lg"
        priority
      />

      {post.unsplash?.photographer && post.unsplash?.link ? (
        <p className="my-2 px-4 text-center font-roboto-slab text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base">
          {"Photo by "}
          <a
            href={post.unsplash.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-600"
          >
            {post.unsplash.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="my-4 px-4 text-center font-sora text-3xl font-black text-zinc-800 dark:text-zinc-200 sm:text-4xl">
        <Balancer>{post.title}</Balancer>
      </h1>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center sm:text-lg">
        <p>
          Posted on{" "}
          <time dateTime={dayjs(post.date).toISOString()}>
            {formatDate(post.date)}
          </time>
        </p>

        {post.updated && (
          <>
            <span className="hidden sm:mx-2 sm:block">&bull;</span>
            <p>
              Last updated on{" "}
              <time dateTime={dayjs(post.updated).toISOString()}>
                {formatDate(post.updated)}
              </time>
            </p>
          </>
        )}
      </div>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center sm:text-lg">
        <p>{readingTime(post.content).text}</p>

        <span className="hidden sm:mx-2 sm:block">&bull;</span>

        <BlogPostViews slug={post.slug.current} />
      </div>

      <MDXComponent source={mdxSource} />
    </>
  );
};

export default BlogPostPage;
