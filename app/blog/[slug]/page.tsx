import Image from "next/image";
import BlogPostViews from "./views";
import MDXComponent from "@/components/MDXComponent";
import type { FC } from "react";
import { allPosts } from "contentlayer/generated";
import { formatDate } from "@/lib/helpers";

// https://beta.nextjs.org/docs/api-reference/segment-config
export const dynamicParams = false;

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage: FC<BlogPostPageProps> = ({ params }) => {
  const slug = params?.slug.toString();

  const post = allPosts.find((post) => post.slug === slug);

  return (
    <>
      <Image
        src={post.banner}
        alt={post.title}
        title={post.title}
        width={1200}
        height={630}
        className="rounded-lg"
        priority
        placeholder="blur"
        blurDataURL={post.coverImage.blurhashDataUrl}
      />

      {post.photographer && post.unsplashLink ? (
        <p className="my-2 px-4 text-center font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200">
          {"Photo by "}
          <a
            href={post.unsplashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-600"
          >
            {post.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="my-4 px-4 text-center font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
        {post.title}
      </h1>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center">
        <p>{`Posted on ${formatDate(post.date)}`}</p>

        {post.updated && (
          <>
            <span className="hidden sm:mx-2 sm:block">&bull;</span>
            <p>{`Last updated on ${formatDate(post.updated)}`}</p>
          </>
        )}
      </div>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center">
        <p>{post.readingTime}</p>

        <span className="hidden sm:mx-2 sm:block">&bull;</span>

        <BlogPostViews slug={post.slug} />
      </div>

      <MDXComponent code={post.body.code} />
    </>
  );
};

export default BlogPostPage;
