import { notFound, redirect } from "next/navigation";
import { allPosts } from ".contentlayer/generated";

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

type OldBlogPostPageProps = {
  params: {
    slug: string;
  };
};

const OldBlogPostPage = ({ params }: OldBlogPostPageProps) => {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Redirect all old blog post links
  redirect(`/blog/${params.slug}`);
};

export default OldBlogPostPage;
