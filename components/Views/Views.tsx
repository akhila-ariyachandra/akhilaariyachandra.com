import ViewsErrorBoundary from "./ViewsErrorBoundary";
import ViewsFetcher from "./ViewsFetcher";
import { Suspense } from "react";

type ViewsProps = {
  slug: string;
};

const Views = ({ slug }: ViewsProps) => {
  return (
    <ViewsErrorBoundary>
      <Suspense fallback={<span>0 views</span>}>
        <ViewsFetcher slug={slug} />
        {" views"}
      </Suspense>
    </ViewsErrorBoundary>
  );
};

export default Views;
