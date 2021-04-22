import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PostLink from "@/components/PostLink";
import ListContainer from "@/components/ListContainer";
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

      <ListContainer title="Blog">
        {allPostsData.map(({ id, date, title, formattedDate, hits }) => (
          <PostLink post={{ id, date, title, formattedDate, hits }} key={id} />
        ))}
      </ListContainer>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();

  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
};
