import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";

import Increment from "./Increment";
import ViewsFetcher from "./ViewsFetcher";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(1, "60s"),
});

type ViewsProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const Views = ({ slug, incrementOnMount = false }: ViewsProps) => {
  const incrementViews = async (slug: string, ip: string) => {
    "use server";

    // Check rate limit
    const limit = await ratelimit.limit(`${ip}-${slug}`);
    if (!limit.success) {
      return;
    }

    // Check record in database
    const results = await db.select().from(posts).where(eq(posts.slug, slug));

    if (results.length === 0) {
      // And create if it doesn't exist
      await db.insert(posts).values({
        slug,
      });
    } else {
      await db
        .update(posts)
        .set({ views: results[0].views + 1 })
        .where(eq(posts.slug, slug));
    }

    // Revalidate
    revalidatePath("/", "layout");
  };

  return (
    <>
      <Suspense fallback={<span>0 views</span>}>
        <span>
          <ViewsFetcher slug={slug} />
          {" views"}
        </span>
      </Suspense>

      <Increment
        slug={slug}
        action={incrementViews}
        enabled={incrementOnMount}
      />
    </>
  );
};

export default Views;
