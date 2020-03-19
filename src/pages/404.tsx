import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <Layout>
      <SEO title="404 - Page Not Found" description="404 - Page Not Found" />

      <div id="banner">
        <h1>Not Found!!!</h1>

        <p>You reached a route that doesn't exist yet... The sadness... 😢</p>
      </div>

      <style jsx>{`
        #banner {
          padding-top: 10rem;
          padding-bottom: 10rem;
        }
      `}</style>
    </Layout>
  );
};

export default Custom404;
