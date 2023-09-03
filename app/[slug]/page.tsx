import { redirect } from "next/navigation";
import { allPosts } from ".contentlayer/generated";

export const dynamicParams = false;

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
  // Redirect all old blog post links
  redirect(`/blog/${params.slug}`);
};

export default OldBlogPostPage;
