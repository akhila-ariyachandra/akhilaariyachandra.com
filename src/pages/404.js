import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />

      <div>
        <h1 className="text-3xl font-semibold">Not Found</h1>
        <p className="text-lg font-base">
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
