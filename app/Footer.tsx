import { sql } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

const getTotal = cache(
  async () => {
    const results = await db
      .select({
        views: sql<number>`SUM(count)`,
      })
      .from(posts);
    const result = results[0];

    return {
      views: result.views,
    };
  },
  ["total", "views"],
  {
    tags: ["total", "views"],
  },
);

const Totals = async () => {
  noStore();

  const total = await getTotal();

  return `(${total?.views} post views)`;
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
