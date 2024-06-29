import { db } from "@/_db/connection";
import { post } from "@/_db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import ViewsIncrementer from "./views-incrementer";

const getCachedViews = cache(
  async (slug: string) => {
    const results = await db.select().from(post).where(eq(post.slug, slug));

    return results[0]?.views ?? 0;
  },
  ["blog-post-views"],
  { tags: ["views"] },
);

type ViewsProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const Views = async ({ slug, incrementOnMount = false }: ViewsProps) => {
  const views = await getCachedViews(slug);

  return (
    <>
      <span>{views} views</span>

      <ViewsIncrementer slug={slug} incrementOnMount={incrementOnMount} />
    </>
  );
};

export default Views;
