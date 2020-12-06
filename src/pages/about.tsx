import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Image from "next/image";
import fs from "fs";
import path from "path";
import config from "src/config";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { NextPage, GetStaticProps } from "next";

type Props = {
  source: string;
};

const About: NextPage<Props> = ({ source }) => {
  const content = hydrate(source);

  return (
    <Layout>
      <SEO title="About" description="A little bit about myself" />

      <div className="pseudo-full-bleed my-4">
        <Image
          src="/cover-pic.jpg"
          alt={config.title}
          title={config.title}
          className="lg:rounded-lg"
          width={1200}
          height={630}
          priority
        />
      </div>

      <div className="prose sm:prose-xl p-4 my-4">{content}</div>
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  const aboutFile = path.join("content", "about.mdx");
  const fileContents = fs.readFileSync(aboutFile, "utf8");
  const mdxSource = await renderToString(fileContents);

  return {
    props: {
      source: mdxSource,
    },
  };
};
