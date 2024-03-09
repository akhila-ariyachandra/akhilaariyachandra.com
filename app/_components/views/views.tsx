import { db } from "@/_db/connection";
import { posts } from "@/_db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { Suspense } from "react";
import ViewsIncrementer from "./views-incrementer";

const getCachedViews = cache(
  async (slug: string) => {
    const results = await db.select().from(posts).where(eq(posts.slug, slug));

    return results[0]?.views ?? 0;
  },
  ["views"],
  { tags: ["views"], revalidate: 60 },
);

type ViewsProps = {
  slug: string;
};

const Views = async ({ slug }: ViewsProps) => {
  const views = await getCachedViews(slug);

  return <span>{views} views</span>;
};

type ViewsRootProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const ViewsRoot = ({ slug, incrementOnMount = false }: ViewsRootProps) => {
  return (
    <>
      <Suspense fallback={<span>0 views</span>}>
        <Views slug={slug} />
      </Suspense>

      <ViewsIncrementer slug={slug} incrementOnMount={incrementOnMount} />
    </>
  );
};

export default ViewsRoot;
