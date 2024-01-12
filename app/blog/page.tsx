import Title from "@/_components/title";
import Views from "@/_components/views";
import { getOgImage } from "@/_utils/helpers";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { allPosts } from ".contentlayer/generated";

dayjs.extend(advancedFormat);

export const metadata: Metadata = {
  title: "Blog",
  description: "My personal blog",
  openGraph: {
    title: "Blog",
    description: "My personal blog",
    url: "/blog",
    type: "website",
    images: getOgImage("Personal Blog", "Akhila Ariyachandra"),
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
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="font-display text-xl font-medium text-green-700 hover:underline dark:text-green-500 sm:text-2xl"
              >
                <Balancer>{post.title}</Balancer>
              </Link>

              <div className="text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                <time dateTime={dayjs(post.posted).toISOString()}>
                  {`${dayjs(post.posted).format("Do MMMM YYYY")}${
                    post.updated
                      ? ` (Updated on ${dayjs(post.updated).format(
                          "Do MMMM YYYY",
                        )})`
                      : ""
                  }`}
                </time>

                <span className="font-light text-zinc-500 dark:text-zinc-400">
                  {" - "}
                </span>

                <Views slug={post.slug} />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default BlogPage;
