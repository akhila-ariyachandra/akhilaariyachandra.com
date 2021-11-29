import fs from "fs";
import path from "path";
import matter from "gray-matter";
import smartypants from "remark-smartypants";
import a11yEmoji from "@fec/remark-a11y-emoji";
import externalLinks from "remark-external-links";
import slug from "remark-slug";
import type { Snippet } from "@/lib/types";
import { serialize } from "next-mdx-remote/serialize";

const snippetsDirectory = path.join("content", "snippets");

export const getSortedSnippets = async (): Promise<Snippet[]> => {
  // Get file names under /snippets
  const fileNames = fs.readdirSync(snippetsDirectory);

  const allSnippets: Snippet[] = [];

  for (const fileName of fileNames) {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read MDX file as string
    const fullPath = path.join(snippetsDirectory, fileName);
    const source = fs.readFileSync(fullPath, "utf8");

    // Get frontmatter
    const { data } = matter(source);

    // Combine the data with the id
    const snippet: Snippet = {
      id,
      title: data.title,
      description: data.description,
    };

    allSnippets.push(snippet);
  }

  // Sort posts by date
  return allSnippets.sort((a, b) => {
    if (a.title < b.title) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllSnippetIds = () => {
  const fileNames = fs.readdirSync(snippetsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
};

export const getSnippetData = async (id): Promise<Snippet> => {
  const fullPath = path.join(snippetsDirectory, `${id}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  // Get frontmatter and content
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [smartypants, a11yEmoji, externalLinks, slug],
    },
    scope: data,
  });

  const post: Snippet = {
    id,
    title: data.title,
    description: data.description,
    content: mdxSource,
  };

  return post;
};
