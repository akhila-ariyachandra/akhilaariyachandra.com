import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Image from "next/image";
import fs from "fs";
import path from "path";
import config from "@/lib/config";
import smartypants from "@silvenon/remark-smartypants";
import a11yEmoji from "@fec/remark-a11y-emoji";
import externalLinks from "remark-external-links";
import slug from "remark-slug";
import matter from "gray-matter";
import coverPic from "@/images/cover-pic.jpg";
import type { NextPage, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

type Props = {
  source: any;
};

const About: NextPage<Props> = ({ source }) => {
  return (
    <Layout>
      <SEO title="About" description="A little bit about myself" />

      <div className="pseudo-full-bleed my-4">
        <Image
          src={coverPic}
          alt={config.title}
          title={config.title}
          className="lg:rounded-lg"
          placeholder="blur"
        />
      </div>

      <div className="prose dark:prose-dark my-4 p-4 max-w-none">
        <MDXRemote
          compiledSource={source.compiledSource}
          scope={source.scope}
        />
      </div>
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  const aboutFile = path.join("content", "about.mdx");
  const fileContents: any = fs.readFileSync(aboutFile, "utf8");
  // Get content
  const { content, data } = matter(fileContents);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [smartypants, a11yEmoji, externalLinks, slug],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
    },
  };
};
