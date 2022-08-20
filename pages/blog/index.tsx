import dayjs from "dayjs";
import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import SEO from "@/components/SEO";
import type { GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { allPosts } from "contentlayer/generated";
import { getViews } from "@/lib/server/views";

type BlogProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
  }[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <>
      <SEO
        title="Blog"
        description="A blog about Javascript, React and Web Development"
      />

      <ListContainer title="Blog">
        {posts.map(({ slug, date, title }) => (
          <PostLink slug={slug} title={title} date={date} key={slug} />
        ))}
      </ListContainer>
    </>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
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

  // Prefetch the post views
  const queryClient = new QueryClient();
  const promises = posts.map(({ slug }) => getViews(slug));
  await Promise.all(promises);

  return {
    props: {
      posts,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600,
  };
};
