import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <Layout>
      <SEO
        title="About"
        description="My name is Akhila Ariyachandra and I'm a web developer from Sri Lanka."
      />

      <h1>Hi.</h1>

      <p>
        My name is Akhila Ariyachandra and I'm a web developer from Sri Lanka.
      </p>

      <p>
        I discovered my love for JavaScript related development when I had to
        create a Node.js API has part of my final year project at university.
      </p>

      <p>
        I first started learning React through developing a React Native app in
        my first job.
      </p>

      <p>
        Now I'm just trying to continue my pursuit in learning more about
        JavaScript, React and Web Development through things like Next.js,
        Gatsby.js and GraphQL, and share what I've learned.
      </p>
    </Layout>
  );
};

export default Index;
