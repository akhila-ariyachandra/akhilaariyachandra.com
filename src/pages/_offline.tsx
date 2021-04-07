import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import type { NextPage } from "next";

const Offline: NextPage = () => {
  return (
    <Layout>
      <SEO title="Offline" />

      <div className="p-4">
        <h1 className="dark:text-gray-200 text-gray-800 text-3xl font-semibold">
          Offline
        </h1>

        <p className="font-base dark:text-gray-200 text-gray-800 text-lg">
          You just hit a route that doesn&#39;t work offline yet... the sadness.{" "}
          <span role="img" aria-label="Sad Emoji">
            😢
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Offline;
