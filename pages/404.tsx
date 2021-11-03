import SEO from "@/components/SEO";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <>
      <SEO title="404: Not Found" />

      <div className="p-4">
        <h1 className="dark:text-gray-200 text-gray-800 font-sora text-3xl font-semibold">
          Not Found
        </h1>

        <p className="font-base dark:text-gray-200 text-gray-800 font-roboto-slab text-lg">
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
