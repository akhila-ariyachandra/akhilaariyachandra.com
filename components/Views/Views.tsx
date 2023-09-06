import ViewsFetcher from "./ViewsFetcher";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ViewsProps = {
  slug: string;
};

const Views = async ({ slug }: ViewsProps) => {
  return (
    <ErrorBoundary fallback={<>0</>}>
      <Suspense fallback={0}>
        <ViewsFetcher slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Views;
