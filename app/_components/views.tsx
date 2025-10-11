import prisma from "@/_lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server";
import { Suspense } from "react";

const getViews = async (slug: string) => {
  "use cache";

  const result = await prisma.post.findFirst({
    where: {
      slug,
    },
  });

  return result?.views ?? 0;
};

type ViewsProps = {
  slug: string;
  increment?: boolean;
};

const Views = ({ slug, increment = false }: ViewsProps) => {
  const views = getViews(slug);

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

      await prisma.post.upsert({
        create: {
          slug,
        },
        update: {
          views: {
            increment: 1,
          },
        },
        where: {
          slug,
        },
      });

      revalidatePath("/blog", "layout");
    });
  }

  return null;
};
