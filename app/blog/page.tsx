import dayjs from "dayjs";
import config from "@/lib/config";
import getQueryClient from "@/lib/getQueryClient";
import ListContainer from "@/components/ListContainer";
import PostLink from "@/components/PostLink";
import HydrateWrapper from "@/components/HydrateWrapper";
import { dehydrate } from "@tanstack/react-query";
import { allPosts } from "contentlayer/generated";
import { db, views } from "@/db/schema";

export const revalidate = 3600; // 1 hour

export const metadata = {
  title: "Blog",
  description: "A blog about Javascript, React and Web Development",
  openGraph: {
    title: "Blog",
    description: "A blog about Javascript, React and Web Development",
    url: `${config.siteUrl}/blog`,
  },
};

const BlogPage = async () => {
  const queryClient = getQueryClient();

  const result = await db.select().from(views);

  for (let i = 0; i < result.length; i++) {
    await queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["views", result[i].slug],
      queryFn: () => result[i],
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateWrapper state={dehydratedState}>
      <ListContainer title="Blog">
        {allPosts
          .sort((current, next) =>
            dayjs(current.posted).isAfter(next.posted) ? -1 : 1
          )
          .map(({ slug, posted, title }) => (
            <PostLink slug={slug} title={title} date={posted} key={slug} />
          ))}
      </ListContainer>
    </HydrateWrapper>
  );
};

export default BlogPage;
