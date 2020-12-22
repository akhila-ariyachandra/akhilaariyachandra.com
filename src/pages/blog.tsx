import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import PostLink from "src/components/PostLink";
import type { NextPage, GetStaticProps } from "next";
import type { Post } from "src/lib/types";
import { getSortedPostsData } from "src/lib/posts";

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

      <h1 className="text-4xl font-bold my-10 mx-4 text-black dark:text-white">
        Blog
      </h1>

      <section className="grid grid-cols-1 gap-4 mx-4">
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
