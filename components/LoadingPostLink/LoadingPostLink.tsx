import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const LoadingPostLink = () => {
  return (
    <div className="space-y-2">
      <div className="block font-sora text-2xl font-bold text-emerald-700 dark:text-emerald-600 sm:text-3xl">
        <Skeleton />
      </div>

      <div className="font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200 sm:text-lg">
        <span>
          <Skeleton inline width={130} />
        </span>

        <span className="mx-2">&bull;</span>

        <span>
          <Skeleton inline width={30} />
          {` views`}
        </span>
      </div>
    </div>
  );
};

export default LoadingPostLink;
