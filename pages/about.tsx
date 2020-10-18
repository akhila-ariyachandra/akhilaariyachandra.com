import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Markdown from "markdown-to-jsx";
import fs from "fs";
import path from "path";
import config from "src/config";
import { NextPage, GetStaticProps } from "next";

type Props = {
  content: string;
};

const About: NextPage<Props> = ({ content }) => {
  return (
    <Layout>
      <SEO title="About" description="A little bit about myself" />

      <h1 className="text-4xl sm:text-5xl font-bold my-10 mx-4">About Me</h1>

      <img
        src={require("images/cover-pic.jpg?webp")}
        alt={config.title}
        title={config.title}
        className="pseudo-full-bleed lg:rounded-lg"
      />

      <div className="my-4">
        <Markdown children={content} className="prose sm:prose-xl p-4" />
      </div>
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  const aboutFile = path.join(process.cwd(), "src", "content", "about.md");
  const fileContents = fs.readFileSync(aboutFile, "utf8");

  return {
    props: {
      content: fileContents,
    },
  };
};
