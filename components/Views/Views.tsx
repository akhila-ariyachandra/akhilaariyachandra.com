import ViewsFetcher from "./ViewsFetcher";
import { Suspense } from "react";

type ViewsProps = {
  slug: string;
};

const Views = ({ slug }: ViewsProps) => {
  return (
    <Suspense fallback={<span>0 views</span>}>
      <span>
        <ViewsFetcher slug={slug} />
        {" views"}
      </span>
    </Suspense>
  );
};

export default Views;
