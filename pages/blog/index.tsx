import dayjs from "dayjs";
import prisma from "@/prisma";
import SEO from "@/components/SEO";
import PostLink from "@/components/PostLink";
import ListContainer from "@/components/ListContainer";
import type { NextPage, GetStaticProps } from "next";
import { useQuery, useQueryClient, QueryClient, dehydrate } from "react-query";
import { allPosts } from ".contentlayer/data";
import { fetcher } from "@/lib/helpers";
import { getPageHitsKey } from "@/lib/constants";

const QUERY_KEY = ["allPageHits"];

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
  const { data } = useQuery<PageHit[]>(QUERY_KEY, () => fetcher("/api/hit"), {
    placeholderData: posts.map((post) => ({
      id: post.id,
      hits: 0,
    })),
    onSuccess: (data) => {
      data.forEach((page) => {
        queryClient.setQueryData(getPageHitsKey(page.id), page.hits);
      });
    },
  });

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

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(QUERY_KEY, async () => {
    const pages = await prisma.page.findMany({
      select: {
        id: true,
        hits: true,
      },
    });

    return pages;
  });

  return {
    props: {
      posts,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600, // 1 hour
  };
};
