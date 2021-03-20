import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PostLink from "@/components/PostLink";
import type { NextPage, GetStaticProps } from "next";
import type { Post } from "@/lib/types";
import { getSortedPostsData } from "@/lib/posts";

type Props = {
  allPostsData: Post[];
};

const Blog: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout>
      <SEO
        title="Blog"
        description="A blog about Javascript, React and Web Development"
      />

      <h1 className="mx-4 my-10 dark:text-gray-200 text-gray-800 text-4xl font-bold">
        Blog
      </h1>

      <section className="grid gap-4 grid-cols-1 mx-4">
        {allPostsData.map(({ id, date, title, formattedDate }) => (
          <PostLink post={{ id, date, title, formattedDate }} key={id} />
        ))}
      </section>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};
