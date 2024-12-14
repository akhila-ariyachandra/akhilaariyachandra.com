import { db } from "@/_db/connection";
import { post } from "@/_db/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { after } from "next/server";
import { Suspense } from "react";

type ViewsProps = {
  slug: string;
  increment?: boolean;
};

const Views = ({ slug, increment = false }: ViewsProps) => {
  return (
    <Suspense
      fallback={
        <span
          className="invisible"
          style={{
            viewTransitionName: `views-${slug}`,
          }}
        >
          0 views
        </span>
      }
    >
      <ViewsBase slug={slug} increment={increment} />
    </Suspense>
  );
};

export default Views;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  analytics: true,
});

const ViewsBase = async ({ slug, increment }: ViewsProps) => {
  const headersStore = await headers();

  const result = await db.query.post.findFirst({
    where: eq(post.slug, slug),
  });
  const views = result?.views ?? 0;

  if (increment && process.env.NODE_ENV === "production") {
    after(async () => {
      let ip = "";

      const FALLBACK_IP_ADDRESS = "0.0.0.0";
      const forwardedFor = headersStore.get("x-forwarded-for");

      if (forwardedFor) {
        ip = forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
      } else {
        ip = headersStore.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
      }

      const { success } = await ratelimit.limit(`${ip}-${slug}`);

      if (!success) {
        return false;
      }

      // Check if row exists
      const result = await db.query.post.findFirst({
        where: eq(post.slug, slug),
      });
      if (!result) {
        // Create the record
        await db.insert(post).values({
          slug,
          views: 1,
        });
      } else {
        // Update the record
        await db
          .update(post)
          .set({ views: result.views + 1 })
          .where(eq(post.slug, slug));
      }
    });
  }

  return (
    <span
      style={{
        viewTransitionName: `views-${slug}`,
      }}
    >
      {views} views
    </span>
  );
};
