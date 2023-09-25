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

  // Redirect old blog post URLs as when the site was built with
  // Gatsby, the blog post pages didn't have `/blog` as a prefix
  // in the pathname
  redirect(`/blog/${post.slug}`);
};

export default OldBlogPostPage;
