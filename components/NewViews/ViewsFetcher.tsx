import { eq } from "drizzle-orm";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";

type ViewsFetcherProps = {
  slug: string;
};

const ViewsFetcher = async ({ slug }: ViewsFetcherProps) => {
  const results = await db.select().from(posts).where(eq(posts.slug, slug));

  if (results.length === 0) {
    return <>0</>;
  } else {
    return <>{results[0].views}</>;
  }
};

export default ViewsFetcher;
