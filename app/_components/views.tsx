import { db } from "@/_db/connection";
import { post } from "@/_db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

type ViewsProps = {
  slug: string;
  increment?: boolean;
};

const Views = ({ slug, increment = false }: ViewsProps) => {
  return (
    <Suspense fallback={<span className="invisible">0 views</span>}>
      <ViewsBase slug={slug} increment={increment} />
    </Suspense>
  );
};

export default Views;

const ViewsBase = async ({ slug }: ViewsProps) => {
  const results = await db.select().from(post).where(eq(post.slug, slug));
  const views = results[0]?.views ?? 0;

  return <span>{views} views</span>;
};
