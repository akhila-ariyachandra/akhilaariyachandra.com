import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" description="A little bit about myself" />

      <div className="w-full">
        <h1 className="text-4xl font-semibold">Hi.</h1>

        <p className="text-lg font-normal my-3">
          My name is Akhila Ariyachandra and I'm a web developer from Sri Lanka.
        </p>

        <p className="text-lg font-normal my-3">
          I discovered my love for JavaScript related development when I had to
          create a Node.js API has part of my final year project at university.
        </p>

        <p className="text-lg font-normal my-3">
          I first started learning React through developing a React Native app
          in my first job.
        </p>

        <p className="text-lg font-normal my-3">
          Now I'm just trying to continue my pursuit in learning more about
          JavaScript, React and Web Development through things like Next.js,
          Gatsby.js and GraphQL, and share what I've learned.
        </p>
      </div>
    </Layout>
  );
};

export default About;
