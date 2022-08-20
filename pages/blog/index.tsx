import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import SEO from "@/components/SEO";
import { allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import type { GetStaticProps, NextPage } from "next";

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

  return {
    props: {
      posts,
    },
  };
};
