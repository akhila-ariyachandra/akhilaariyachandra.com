import { eq } from "drizzle-orm";
import { db } from "@/db/connection";
import { posts } from "@/db/schema";
import { Suspense } from "react";

type ViewsProps = {
  slug: string;
};

const ViewsFetcher = async ({ slug }: ViewsProps) => {
  const result = await db.select().from(posts).where(eq(posts.slug, slug));

  if (result.length === 0) {
    return 0;
  }

  return result[0].views;
};

const Views = ({ slug }: ViewsProps) => {
  return (
    <Suspense>
      <span>
        <ViewsFetcher slug={slug} />
        {" views"}
      </span>
    </Suspense>
  );
};

export default Views;
