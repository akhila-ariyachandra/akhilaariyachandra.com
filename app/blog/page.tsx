import BreadcrumbStructuredData from "@/_components/structured-data/breadcrumb";
import Title from "@/_components/title";
import Views from "@/_components/views";
import { allPosts } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";

dayjs.extend(advancedFormat);

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

      <ul className="space-y-2 sm:space-y-3">
        {allPosts
          .sort((a, b) => (dayjs(a.posted).isBefore(b.posted) ? 1 : -1))
          .map((post) => (
            <li key={post._meta.path}>
              <Link
                href={`/blog/${post._meta.path}`}
                className="font-display text-accent dark:text-accent-dark text-xl font-medium tracking-tighter text-pretty hover:underline sm:text-2xl"
                style={{
                  viewTransitionName: `title-${post._meta.path}`,
                }}
              >
                {post.title}
              </Link>

              <div className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
                <time
                  dateTime={dayjs(post.posted).toISOString()}
                  style={{
                    viewTransitionName: `date-${post._meta.path}`,
                  }}
                >
                  {`${dayjs(post.posted).format("Do MMMM YYYY")}${
                    post.updated
                      ? ` (Updated on ${dayjs(post.updated).format(
                          "Do MMMM YYYY",
                        )})`
                      : ""
                  }`}
                </time>

                <span
                  className="font-light text-zinc-500 dark:text-zinc-400"
                  style={{
                    viewTransitionName: `separator-${post._meta.path}`,
                  }}
                >
                  {" - "}
                </span>

                <Views slug={post._meta.path} />
              </div>
            </li>
          ))}
      </ul>

      <p className="mt-6 text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
        View my old blog posts{" "}
        <Link
          href="https://archive.akhilaariyachandra.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent dark:text-accent-dark hover:underline"
        >
          here
        </Link>
        .
      </p>

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
