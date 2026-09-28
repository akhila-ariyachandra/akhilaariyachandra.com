import Skeleton from "@/_components/skeleton";
import OutdatedContentBanner from "./outdated-content-banner";

const BlogPostLoadingSkeleton = ({
  archived = false,
}: {
  archived?: boolean;
}) => {
  return (
    <>
      {archived && <OutdatedContentBanner />}

      <article className="neobrutalism-container">
        <div className="space-y-2 border-b-2 border-b-black bg-green-300 p-3 theme-transition sm:space-y-3 sm:p-4 dark:bg-green-900">
          <Skeleton className="h-27 sm:h-20" />

          <Skeleton className="h-6 w-35 sm:h-7 sm:w-40" />
        </div>

        <div className="prose prose-sm mb-16 max-w-none p-3 prose-zinc sm:prose-base sm:p-4 dark:prose-invert">
          <div className="mb-[1.25em] space-y-2">
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-5/6" />
          </div>

          <div className="mb-[1.25em] space-y-2">
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-11/12" />
            <Skeleton className="h-lh w-4/5" />
          </div>

          <div className="mb-[1.25em] space-y-2">
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-2/3" />
          </div>

          <Skeleton className="mb-[1.25em] h-96 w-full" />

          <div className="mb-[1.25em] space-y-2">
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-5/6" />
          </div>

          <div className="mb-[1.25em] space-y-2">
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-11/12" />
            <Skeleton className="h-lh w-4/5" />
          </div>

          <div className="mb-[1.25em] space-y-2">
            <Skeleton className="h-lh w-full" />
            <Skeleton className="h-lh w-2/3" />
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostLoadingSkeleton;
