import { eq } from "drizzle-orm";

import { db } from "@/db/connection";
import { posts } from "@/db/schema";

type ViewsProps = {
  slug: string;
};

const Views = async ({ slug }: ViewsProps) => {
  const result = await db.select().from(posts).where(eq(posts.slug, slug));

  if (result.length === 0) {
    return <span>0 views</span>;
  }

  return <span>{`${result[0].views} views`}</span>;
};

export default Views;
