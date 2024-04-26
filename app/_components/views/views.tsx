import { db } from "@/_db/connection";
import { post } from "@/_db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import ViewsIncrementer from "./views-incrementer";

type ViewsProps = {
  slug: string;
};

const Views = async ({ slug }: ViewsProps) => {
  const results = await db.select().from(post).where(eq(post.slug, slug));
  const views = results[0]?.views ?? 0;

  return <span>{views} views</span>;
};

type ViewsRootProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const ViewsRoot = ({ slug, incrementOnMount = false }: ViewsRootProps) => {
  return (
    <>
      <Suspense fallback={<span className="invisible">0 views</span>}>
        <Views slug={slug} />
      </Suspense>

      <ViewsIncrementer slug={slug} incrementOnMount={incrementOnMount} />
    </>
  );
};

export default ViewsRoot;
