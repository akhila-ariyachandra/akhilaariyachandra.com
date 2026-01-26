import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { db } from "db";
import { postsTable } from "db/schema";
import { eq } from "drizzle-orm";
import { isbot } from "isbot";
import { cacheTag, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server";
import { Suspense } from "react";

const getViews = async (slug: string) => {
  "use cache";

  cacheTag(`views-${slug}`);

  const result = await db.query.postsTable.findFirst({
    where: eq(postsTable.slug, slug),
  });

  return result?.views ?? 0;
};

type ViewsProps = {
  slug: string;
  increment?: boolean;
};

const Views = async ({ slug, increment = false }: ViewsProps) => {
  const views = await getViews(slug);

  return (
    <>
      <span>{views} views</span>

      <Suspense>
        <ViewsIncrementor slug={slug} increment={increment} />
      </Suspense>
    </>
  );
};

export default Views;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  analytics: true,
});

const ViewsIncrementor = async ({ slug, increment }: ViewsProps) => {
  const headersStore = await headers();
  const isBot = isbot(headersStore.get("user-agent") ?? "");

  if (increment && process.env.NODE_ENV === "production" && !isBot) {
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

      // Check if record exists
      const result = await db.query.postsTable.findFirst({
        where: eq(postsTable.slug, slug),
      });

      if (!result) {
        await db.insert(postsTable).values({
          slug,
          views: 1,
        });
      } else {
        await db
          .update(postsTable)
          .set({
            views: result.views + 1,
          })
          .where(eq(postsTable.slug, slug));
      }

      revalidateTag(`views-${slug}`, "max");
    });
  }

  return null;
};
