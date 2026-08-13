import Skeleton from "@/_components/skeleton";

const BlogPostLoading = () => {
  return (
    <>
      <Skeleton className="mb-4 h-16 sm:mb-5 sm:h-9" />

      <Skeleton className="mb-4 h-4.5 w-32 sm:mb-5 sm:h-5.25 sm:w-35" />

      <div className="prose prose-sm prose-zinc sm:prose-base dark:prose-invert mb-16 max-w-none">
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
    </>
  );
};

export default BlogPostLoading;
