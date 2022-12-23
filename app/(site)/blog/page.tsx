import dayjs from "dayjs";
import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import type { FC } from "react";
import { allPosts } from "contentlayer/generated";

const BlogPage: FC = () => {
  const posts = allPosts
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
    }))
    .sort((first, second) => {
      if (dayjs(first.date).isBefore(dayjs(second.date))) {
        return 1;
      } else {
        return -1;
      }
    });

  return (
    <ListContainer title="Blog">
      {posts.map(({ slug, date, title }) => (
        <PostLink slug={slug} title={title} date={date} key={slug} />
      ))}
    </ListContainer>
  );
};

export default BlogPage;
