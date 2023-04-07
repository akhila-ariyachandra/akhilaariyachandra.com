import type { FC } from "react";

export const metadata = {
  title: "404: Not Found",
};

const NotFound: FC = () => {
  return (
    <div className="p-4">
      <h1 className="font-sora text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
        Not Found
      </h1>

      <p className="font-base font-roboto-slab text-lg text-zinc-800 dark:text-zinc-200">
        You just hit a route that doesn&#39;t exist... the sadness.{" "}
        <span role="img" aria-label="Sad Emoji">
          😢
        </span>
      </p>
    </div>
  );
};

export default NotFound;
