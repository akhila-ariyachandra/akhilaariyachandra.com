import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PostLink from "@/components/PostLink";
import ListContainer from "@/components/ListContainer";
import type { NextPage, GetStaticProps } from "next";
import type { Post } from "@/lib/types";
import { getSortedPostsData } from "@/lib/posts";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getPageHits } from "@/lib/hits";

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
        {allPostsData.map(({ id, date, title, formattedDate }) => (
          <PostLink post={{ id, date, title, formattedDate }} key={id} />
        ))}
      </ListContainer>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();

  const queryClient = new QueryClient();

  // Prefetch page hits
  const promises = allPostsData.map((post) =>
    queryClient.prefetchQuery(["pageHits", post.id], async () => {
      const hits = await getPageHits(post.id);

      return {
        getHits: hits,
      };
    })
  );
  await Promise.all(promises);

  return {
    props: {
      allPostsData,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
