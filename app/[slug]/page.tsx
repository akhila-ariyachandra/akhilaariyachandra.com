import { allPosts } from ".contentlayer/generated";
import { notFound, permanentRedirect } from "next/navigation";

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
  permanentRedirect(`/blog/${post.slug}`);
};

export default OldBlogPostPage;
