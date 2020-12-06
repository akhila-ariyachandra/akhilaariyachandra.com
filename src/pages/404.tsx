import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />

      <div className="p-4">
        <h1 className="text-3xl sm:text-4xl font-semibold">Not Found</h1>

        <p className="text-lg sm:text-xl font-base">
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
