import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Views from "@/components/Views";
import Title from "@/components/Title";
import type { Metadata } from "next";
import { allPosts } from ".contentlayer/generated";
import { getOgImages } from "@/lib/helpers";

dayjs.extend(advancedFormat);

export const metadata: Metadata = {
  title: "Blog | Akhila Ariyachandra",
  description: "My personal blog",
  openGraph: {
    title: "Blog | Akhila Ariyachandra",
    description: "My personal blog",
    url: "https://akhilaariyachandra.com/blog",
    type: "website",
    images: getOgImages("Personal Blog", "Akhila Ariyachandra"),
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
                  {dayjs(post.posted).format("Do MMMM YYYY")}
                </time>

                <span className="font-light text-zinc-500 dark:text-zinc-400">
                  {" - "}
                </span>

                <span>
                  <Views slug={post.slug} />
                  {" views"}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default BlogPage;
