import SEO from "@/components/SEO";
import { urlFor } from "@/lib/sanity-client";
import { getBlogPost } from "@/utils/sanity";

interface BlogPostHeadProps {
  params: {
    slug: string;
  };
}

const BlogPostHead = async ({ params }: BlogPostHeadProps) => {
  const slug = params?.slug.toString();

  const post = await getBlogPost(slug);

  if (!post) {
    // Don't render if post doesn't exist
    return null;
  }

  return (
    <SEO
      title={post.title}
      description={post.description}
      image={urlFor(post.banner).url()}
      date={post.date}
      updated={post.updated}
    />
  );
};

export default BlogPostHead;
