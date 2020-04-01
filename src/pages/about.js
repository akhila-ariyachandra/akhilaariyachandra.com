import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { rhythm } from "../utils/typography";

const About = () => {
  return (
    <Layout>
      <SEO title="About" description="A little bit about myself" />

      <div style={{ marginTop: rhythm(3), marginBottom: rhythm(3) }}>
        <h1>Hi.</h1>

        <p>
          My name is Akhila Ariyachandra and I'm a web developer from Sri Lanka.
        </p>

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
