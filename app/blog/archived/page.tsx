import PostsList from "@/_components/posts-list";
import Title from "@/_components/title";
import { allPosts } from "content-collections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archived Posts",
  description: "Some of my older posts",
  openGraph: {
    title: "Archived Posts",
    description: "My personal blog",
    url: "/blog/archived",
    type: "website",
  },
  alternates: {
    canonical: "/blog/archived",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const ArchivedPostsPage = () => {
  return (
    <>
      <Title
        style={{
          viewTransitionName: "archived-posts",
        }}
      >
        Archived Posts
      </Title>

      <PostsList posts={allPosts.filter((post) => post.archived)} />
    </>
  );
};

export default ArchivedPostsPage;
