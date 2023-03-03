import dayjs from "dayjs";
import config from "@/lib/config";
import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import type { FC } from "react";
import { allPosts } from "contentlayer/generated";

export const metadata = {
  title: "Blog",
  description: "A blog about Javascript, React and Web Development",
  openGraph: {
    title: "Blog",
    description: "A blog about Javascript, React and Web Development",
    url: `${config.siteUrl}/blog`,
  },
};

const BlogPage: FC = () => {
  return (
    <ListContainer title="Blog">
      {allPosts
        .sort((current, next) =>
          dayjs(current.posted).isAfter(next.posted) ? -1 : 1
        )
        .map(({ slug, posted, title }) => (
          <PostLink slug={slug} title={title} date={posted} key={slug} />
        ))}
    </ListContainer>
  );
};

export default BlogPage;
