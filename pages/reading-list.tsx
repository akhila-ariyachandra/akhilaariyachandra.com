import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import axios from "axios";
import cheerio from "cheerio";
import { NextPage, GetStaticProps } from "next";

type Link = {
  url: string;
  icon: string;
  title: string;
  description: string;
};

type Props = {
  linksList: Link[];
};

const ReadingList: NextPage<Props> = ({ linksList }) => {
  return (
    <Layout>
      <SEO
        title="Reading List"
        description="Some links that I've found useful"
      />

      <style jsx>{`
        p {
          color: var(--text);
        }
      `}</style>

      <h1 className="text-4xl sm:text-5xl font-bold my-10 mx-4">
        Reading List
      </h1>

      <div className="grid grid-cols-1 gap-4 pr-4">
        {linksList.map((link) => (
          <article key={link.title} className="col-span-1 space-y-2">
            <div className="flex items-center space-x-4">
              <img
                src={link.icon}
                alt={new URL(link.url).hostname}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.url}
                className="text-xl sm:text-2xl font-semibold flex-1"
              >
                <span>{link.title}</span>
              </a>
            </div>

            <p className="text-base sm:text-lg">{link.description}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default ReadingList;

export const getStaticProps: GetStaticProps = async () => {
  const readingListFile = path.join(
    process.cwd(),
    "src",
    "content",
    "readingList.yaml"
  );
  const file = fs.readFileSync(readingListFile, "utf8");
  const fileContent = yaml.parse(file);

  const LinkList: Link[] = [];

  for (const url of fileContent) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    LinkList.push({
      url,
      icon: `${new URL(url).origin}/${$('link[rel="icon"]')
        .attr("href")
        .replace("/", "")}`,
      title: $("title").text(),
      description: $('meta[name="description"]').attr("content"),
    });
  }

  return { props: { linksList: LinkList } };
};
