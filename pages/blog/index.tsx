import dayjs from "dayjs";
import SEO from "@/components/SEO";
import PostLink from "@/components/PostLink";
import ListContainer from "@/components/ListContainer";
import type { NextPage, GetStaticProps } from "next";
import { useQuery, useQueryClient } from "react-query";
import { allPosts } from ".contentlayer/data";
import { fetcher } from "@/lib/helpers";
import { PAGE_HITS_KEY } from "@/lib/constants";

type Props = {
  posts: {
    id: string;
    title: string;
    date: string;
  }[];
};

type PageHit = {
  id: string;
  hits: number;
};

const Blog: NextPage<Props> = ({ posts }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery<PageHit[]>(
    ["allPageHits"],
    () => fetcher("/api/hit"),
    {
      placeholderData: posts.map((post) => ({
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
        {posts.map(({ id, date, title }) => (
          <PostLink
            post={{ id, date, title }}
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
  const posts = allPosts
    .map((post) => ({
      id: post.id,
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
