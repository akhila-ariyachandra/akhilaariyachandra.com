import SEO from "@/components/SEO";
import type { NextPage } from "next";

/**
 * DO NOT USE!!!
 * This is just to store the code until the Global Error Page is supported.
 * https://beta.nextjs.org/docs/app-directory-roadmap
 */
const NotFound: NextPage = () => {
  return (
    <>
      <SEO title="404: Not Found" />

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
    </>
  );
};

export default NotFound;
