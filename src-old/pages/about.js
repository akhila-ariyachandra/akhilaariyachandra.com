import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

const About = ({ location }) => {
  const description =
    "My name is Akhila Ariyachandra and I'm a web developer from Sri Lanka.";

  return (
    <Layout location={location} title="About">
      <SEO title="About" description={description} />

      <div style={{ padding: `${rhythm(2)} 0` }}>
        <h1>Hi.</h1>

        <p>{description}</p>

        <p>
          I discovered my love for JavaScript related development when I had to
          create a Node.js API has part of my final year project at university.
        </p>

        <p>
          I first started learning React through developing a React Native app
          in my first job.
        </p>

        <p>
          Now I'm just trying to continue my pursuit in learning more about
          JavaScript, React and Web Development through things like Next.js,
          Gatsby.js and GraphQL, and share what I've learned.
        </p>
      </div>
    </Layout>
  );
};

export default About;
