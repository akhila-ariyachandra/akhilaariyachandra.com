import dayjs from "dayjs";
import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import type { FC } from "react";
import { allPosts } from "contentlayer/generated";

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
