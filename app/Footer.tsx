import { sql } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";
import { unstable_cache as cache } from "next/cache";

const getTotals = cache(
  async () => {
    const results = await db
      .select({
        views: sql<number>`SUM(count)`,
        upvotes: sql<number>`SUM(upvotes)`,
      })
      .from(posts);
    const result = results[0];

    return {
      views: result.views,
      upvotes: result.upvotes,
    };
  },
  ["totals", "views", "upvotes"],
  {
    tags: ["totals", "views", "upvotes"],
  },
);

const Totals = async () => {
  const totals = await getTotals();

  return `(${totals?.views} post views, ${totals?.upvotes} upvotes)`;
};

const Footer = () => {
  return (
    <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 dark:text-zinc-300 sm:p-4 sm:text-base">
      © {new Date().getFullYear()},{" "}
      <Link
        href="/"
        className="font-medium text-green-700 hover:underline dark:text-green-500"
      >
        akhilaariyachandra.com
      </Link>{" "}
      <span className="font-light text-zinc-600 dark:text-zinc-400">
        <Suspense fallback="(0 post views, 0 upvotes)">
          <Totals />
        </Suspense>
      </span>
    </footer>
  );
};

export default Footer;
