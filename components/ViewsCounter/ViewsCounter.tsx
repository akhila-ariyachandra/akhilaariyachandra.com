import ViewsFetcher from "./ViewsFetcher";
import { Suspense } from "react";

type ViewsCounterProps = {
  slug: string;
};

const ViewsCounter = ({ slug }: ViewsCounterProps) => {
  return (
    <Suspense fallback={<>0</>}>
      <ViewsFetcher slug={slug} />
    </Suspense>
  );
};

export default ViewsCounter;
