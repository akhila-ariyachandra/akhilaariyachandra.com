import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { rhythm } from "../utils/typography";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />

      <div style={{ margin: `${rhythm(7)} 0` }}>
        <h1>Not Found</h1>
        <p>
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
