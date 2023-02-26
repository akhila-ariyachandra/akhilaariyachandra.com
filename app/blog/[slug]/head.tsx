import config from "@/lib/config";
import SEO from "@/components/SEO";
import type { FC } from "react";
import { allPosts } from "contentlayer/generated";

interface BlogPostHeadProps {
  params: {
    slug: string;
  };
}

const BlogPostHead: FC<BlogPostHeadProps> = ({ params }) => {
  const slug = params?.slug.toString();

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    // Don't render if post doesn't exist
    return null;
  }

  return (
    <SEO
      title={post.title}
      description={post.description}
      image={`${config.siteUrl}${post.banner}`}
      date={post.posted}
      updated={post.updated}
    />
  );
};

export default BlogPostHead;
