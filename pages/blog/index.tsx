import SEO from "@/components/SEO";
import PostLink from "@/components/PostLink";
import ListContainer from "@/components/ListContainer";
import type { NextPage, GetStaticProps } from "next";
import type { Post } from "@/lib/types";
import { useQuery, useQueryClient } from "react-query";
import { getSortedPostsData } from "@/lib/posts";
import { fetcher } from "@/lib/helpers";
import { PAGE_HITS_KEY } from "@/lib/constants";

type Props = {
  allPostsData: Post[];
};

type PageHit = {
  id: string;
  hits: number;
};

const Blog: NextPage<Props> = ({ allPostsData }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery<PageHit[]>(
    ["allPageHits"],
    () => fetcher("/api/hit"),
    {
      placeholderData: allPostsData.map((post) => ({
        id: post.id,
        hits: 0,
      })),
      onSuccess: (data) => {
        data.forEach((page) => {
          queryClient.setQueryData(PAGE_HITS_KEY(page.id), page.hits);
        });
      },
    }
  );

  return (
    <>
      <SEO
        title="Blog"
        description="A blog about Javascript, React and Web Development"
      />

      <ListContainer title="Blog">
        {allPostsData.map(({ id, date, title, formattedDate }) => (
          <PostLink
            post={{ id, date, title, formattedDate }}
            hits={data?.find((hit) => hit.id === id)?.hits ?? 0}
            key={id}
          />
        ))}
      </ListContainer>
    </>
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
