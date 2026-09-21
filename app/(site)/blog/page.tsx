import BlogList from "@/_components/blog/blog-list";
import Title from "@/_components/title";
import { PRODUCTION_URL } from "@/_lib/constants";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import Link from "next/link";

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
      <div className="neobrutalism-container p-3 sm:p-4">
        <Title>Blog</Title>

        <BlogList />

        <p className="mt-6 text-lg sm:text-xl">
          View my old blog posts{" "}
          <Link
            href="/blog/archive"
            className="font-semibold text-accent hover:underline dark:text-accent-dark"
          >
            here
          </Link>
          .
        </p>
      </div>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: PRODUCTION_URL },
          { name: "Blog", item: `${PRODUCTION_URL}/blog` },
        ]}
      />
    </>
  );
};

export default BlogPage;
