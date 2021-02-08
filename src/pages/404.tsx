import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />

      <div className="p-4">
        <h1 className="dark:text-gray-200 text-gray-800 text-3xl font-semibold">
          Not Found
        </h1>

        <p className="font-base dark:text-gray-200 text-gray-800 text-lg">
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
