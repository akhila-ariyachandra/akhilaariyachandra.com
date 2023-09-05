import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Title from "@/components/Title";
import Views from "@/components/Views";
import MDXComponent from "@/components/MDXComponent";
import ViewsIncrement from "./ViewsIncrement";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from ".contentlayer/generated";

dayjs.extend(advancedFormat);

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title} | Akhila Ariyachandra`,
    description: "A post on my blog",
    openGraph: {
      title: `${post.title} | Akhila Ariyachandra`,
      description: "A post on my blog",
      url: `https://akhilaariyachandra.com/blog/${post.slug}`,
      type: "article",
    },
  };
};

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Title>{post.title}</Title>

      <div className="text-sm text-zinc-600 sm:text-base">
        <time dateTime={dayjs(post.posted).toISOString()}>
          {dayjs(post.posted).format("Do MMMM YYYY")}
        </time>

        <span className="font-light text-zinc-500">{" - "}</span>

        <span>
          <Views slug={post.slug} />
          {" views"}
        </span>
      </div>

      <ViewsIncrement slug={params.slug} />

      <MDXComponent code={post.body.code} />
    </>
  );
};

export default BlogPostPage;
