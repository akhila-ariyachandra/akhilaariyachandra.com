import { Suspense } from "react";

import ViewsFetcher from "./ViewsFetcher";

type NewViewsProps = {
  slug: string;
};

const NewViews = ({ slug }: NewViewsProps) => {
  return (
    <Suspense fallback={<span>0 views</span>}>
      <span>
        <ViewsFetcher slug={slug} />
        {" views"}
      </span>
    </Suspense>
  );
};

export default NewViews;
