import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "src/lib/types";
import { formatDate } from "src/lib/helpers";

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

export const getSortedPostsData = (): Post[] => {
  // Get file names under /src/posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: Post[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      formattedDate: formatDate(matterResult.data.date),
      description: matterResult.data.description,
      banner: matterResult.data.banner,
    };
  });

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
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id and contentHtml
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    formattedDate: formatDate(matterResult.data.date),
    description: matterResult.data.description,
    content: matterResult.content,
    banner: matterResult.data.banner,
  };
};
