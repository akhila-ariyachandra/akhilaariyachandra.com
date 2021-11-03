import config from "@/lib/config";
import SEO from "@/components/SEO";
import DashboardItem from "@/components/dashboard/DashboardItem";
import Link from "next/link";
import Title from "@/components/Title";
import TopTracks from "@/components/TopTracks";
import type { NextPage, GetStaticProps } from "next";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetcher } from "@/lib/helpers";
import {
  getMostPopularPosts,
  getTotalViews,
  getTotalReactions,
  getTotalDevViews,
  getTotalDevReactions,
} from "@/lib/dashboard";

const Divider = () => {
  return <hr className="h-[1px] my-12 bg-gray-200 dark:bg-gray-600" />;
};

type PopularPost = {
  id: string;
  title: string;
  hits: string;
  slug: string;
};

const Dashboard: NextPage = () => {
  const { data } = useQuery<PopularPost[], Error>(
    ["dashboard", "mostPopularPosts"],
    () => fetcher("/api/dashboard/most-popular-posts"),
    { placeholderData: [] }
  );

  return (
    <>
      <SEO title="Dashboard" />

      <Title title="Dashboard" />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <DashboardItem
          title="Total Views"
          link={{ type: "internal", url: "/blog" }}
          queryKey="totalViews"
          url="/api/dashboard/total-views"
        />

        <DashboardItem
          title="Total Reactions"
          link={{ type: "internal", url: "/blog" }}
          queryKey="totalReactions"
          url="/api/dashboard/total-reactions"
        />

        <DashboardItem
          title="Total DEV Views"
          link={{ type: "external", url: config.social.dev }}
          queryKey="totalDevViews"
          url="/api/dashboard/total-dev-views"
        />

        <DashboardItem
          title="Total DEV Reactions"
          link={{ type: "external", url: config.social.dev }}
          queryKey="totalDevReactions"
          url="/api/dashboard/total-dev-reactions"
        />
      </div>

      <Divider />

      <div className="my-10">
        <h2 className="my-6 dark:text-gray-200 text-gray-800 font-sora text-3xl font-semibold">
          Most Popular Posts
        </h2>

        <div className="grid gap-4 grid-cols-1">
          {data.map((post) => (
            <article key={post.id}>
              <Link href={post.slug}>
                <a className="dark:text-green-600 text-green-700 font-sora text-2xl font-medium">
                  {post.title}
                </a>
              </Link>

              <p className="mt-1 dark:text-gray-200 text-gray-800 font-roboto-slab text-lg font-normal">{`${post.hits} views`}</p>
            </article>
          ))}
        </div>
      </div>

      <Divider />

      <TopTracks />
    </>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const prefetchPromises = [];

  prefetchPromises.push(
    queryClient.prefetchQuery(
      ["dashboard", "mostPopularPosts"],
      getMostPopularPosts
    )
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(["dashboard", "totalViews"], getTotalViews)
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(
      ["dashboard", "totalReactions"],
      getTotalReactions
    )
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(["dashboard", "totalDevViews"], getTotalDevViews)
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(
      ["dashboard", "totalDevReactions"],
      getTotalDevReactions
    )
  );

  await Promise.all(prefetchPromises);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 86400,
  };
};
