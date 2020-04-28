import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />

      <div className="my-48 sm:my-56">
        <h1 className="text-2xl sm:text-4xl font-semibold">Not Found</h1>
        <p className="text-base sm:text-xl font-base">
          You just hit a route that doesn&#39;t exist... the sadness.{" "}
          <span role="img" aria-label="Sad Emoji">
            😢
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
