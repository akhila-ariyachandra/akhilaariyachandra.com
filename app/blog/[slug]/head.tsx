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

  return (
    <SEO
      title={post.title}
      description={post.description}
      image={post.banner}
      date={post.date}
      updated={post.updated}
    />
  );
};

export default BlogPostHead;
