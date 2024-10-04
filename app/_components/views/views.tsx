import { db } from "@/_db/connection";
import { post } from "@/_db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import ViewsIncrementer from "./views-incrementer";

type ViewsProps = {
  slug: string;
  incrementOnMount?: boolean;
};

const Views = ({ slug, incrementOnMount = false }: ViewsProps) => {
  return (
    <>
      <Suspense fallback={<span className="invisible">0 views</span>}>
        <ViewsBase slug={slug} />
      </Suspense>

      {process.env.NEXT_PUBLIC_DISABLE_VIEWS_INCREMENT !== "true" && (
        <ViewsIncrementer slug={slug} incrementOnMount={incrementOnMount} />
      )}
    </>
  );
};

export default Views;

const ViewsBase = async ({ slug }: { slug: string }) => {
  const results = await db.select().from(post).where(eq(post.slug, slug));
  const views = results[0]?.views ?? 0;

  return <span>{views} views</span>;
};
