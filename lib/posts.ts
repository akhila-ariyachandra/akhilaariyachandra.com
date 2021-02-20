import fs from "fs";
import path from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import smartypants from "@silvenon/remark-smartypants";
import a11yEmoji from "@fec/remark-a11y-emoji";
import externalLinks from "remark-external-links";
import slug from "remark-slug";
import SpecialBlock from "@/components/post/SpecialBlock";
import PostImage from "@/components/post/PostImage";
import Code from "@/components/code/Code";
import CodeSandboxWrapper from "@/components/post/CodeSandboxWrapper";
import Iframe from "@/components/post/Iframe";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/helpers";
import { createElement } from "react";

export const mdxComponents = {
  SpecialBlock,
  pre: (props) => createElement(Code, { ...props }),
  PostImage,
  CodeSandboxWrapper,
  Iframe,
};

const postsDirectory = path.join("content", "posts");

export const getSortedPostsData = async (): Promise<Post[]> => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: Post[] = [];

  for (const fileName of fileNames) {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read MDX file as string
    const fullPath = path.join(postsDirectory, fileName);
    const source = fs.readFileSync(fullPath, "utf8");

    // Get frontmatter
    const { data } = matter(source);

    // Combine the data with the id
    const post: Post = {
      id,
      title: data.title,
      date: data.date,
      formattedDate: formatDate(data.date),
      description: data.description,
      banner: data.banner,
    };

    // Check for updated date
    if (data.updated) {
      post.updated = data.updated;
      post.formattedUpdated = formatDate(data.updated);
    }

    // Check for Unsplash photographer credits
    if (data.photographer && data.unsplash_link) {
      post.photographer = data.photographer;
      post.unsplash_link = data.unsplash_link;
    }

    allPostsData.push(post);
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

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

export const getPostData = async (id): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  // Get frontmatter and content
  const { content, data } = matter(source);
  const mdxSource = await renderToString(content, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [smartypants, a11yEmoji, externalLinks, slug],
    },
    scope: data,
  });

  const post: Post = {
    id,
    title: data.title,
    date: data.date,
    formattedDate: formatDate(data.date),
    description: data.description,
    content: mdxSource,
    banner: data.banner,
    sourceCode: data.sourceCode,
  };

  // Check for updated date
  if (data.updated) {
    post.updated = data.updated;
    post.formattedUpdated = formatDate(data.updated);
  }

  // Check for Unsplash photographer credits
  if (data.photographer && data.unsplash_link) {
    post.photographer = data.photographer;
    post.unsplash_link = data.unsplash_link;
  }

  return post;
};
