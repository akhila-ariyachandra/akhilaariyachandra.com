import { eq } from "drizzle-orm";
import { db } from "@/db/connection";
import { posts } from "@/db/schema";

type ViewsFetcherProps = {
  slug: string;
};

const ViewsFetcher = async ({ slug }: ViewsFetcherProps) => {
  const result = await db.select().from(posts).where(eq(posts.slug, slug));

  if (result.length === 0) {
    return 0;
  }

  return result[0].views;
};

export default ViewsFetcher;
