import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />

      <div className="p-4">
        <h1 className="text-3xl text-black dark:text-white font-semibold">
          Not Found
        </h1>

        <p className="text-lg text-black dark:text-white font-base">
          You just hit a route that doesn&#39;t exist... the sadness.{" "}
          <span role="img" aria-label="Sad Emoji">
            😢
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
