import BlogList from "@/_components/blog/blog-list";
import Title from "@/_components/title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archived Blog",
  description: "My old blog posts",
  openGraph: {
    title: "Archived Blog",
    description: "My old blog posts",
    url: "/blog/archive",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const BlogPage = () => {
  return (
    <div className="neobrutalism-container p-3 sm:p-4">
      <Title>Archived Blog</Title>

      <BlogList archived />
    </div>
  );
};

export default BlogPage;
