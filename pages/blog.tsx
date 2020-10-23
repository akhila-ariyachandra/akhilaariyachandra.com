import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import PostLink from "src/components/PostLink";
import { NextPage, GetStaticProps } from "next";
import { getSortedPostsData } from "src/lib/posts";
import { Post } from "src/lib/types";

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

      <h1 className="text-4xl sm:text-5xl font-bold my-10 mx-4">Blog</h1>

      <section className="grid grid-cols-1 gap-4">
        {allPostsData.map(({ id, date, title, formattedDate }) => (
          <PostLink post={{ id, date, title, formattedDate }} key={id} />
        ))}
      </section>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};
