import SEO from "@/components/SEO";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <>
      <SEO title="404: Not Found" />

      <div className="p-4">
        <h1 className="font-sora text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Not Found
        </h1>

        <p className="font-base font-roboto-slab text-lg text-gray-800 dark:text-gray-200">
          You just hit a route that doesn&#39;t exist... the sadness.{" "}
          <span role="img" aria-label="Sad Emoji">
            😢
          </span>
        </p>
      </div>
    </>
  );
};

export default NotFound;
