import PostsList from "@/_components/posts-list";
import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import Title from "@/_components/title";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Blog",
  description: "My personal blog",
  openGraph: {
    title: "Blog",
    description: "My personal blog",
    url: "/blog",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

const BlogPage = () => {
  return (
    <>
      <Title>Blog</Title>

      <PostsList posts={allPosts.filter((post) => !post.archived)} />

      <Link
        href="/blog/archived"
        className="float-right mt-4 text-base text-green-700 hover:underline sm:mt-5 sm:text-lg dark:text-green-500"
        style={{
          viewTransitionName: "archived-posts",
        }}
      >
        Archived Posts
      </Link>

      <BreadcrumbStructuredData
        items={[
          { name: "Home", route: "/" },
          { name: "Blog", route: "/blog" },
        ]}
      />
    </>
  );
};

export default BlogPage;
