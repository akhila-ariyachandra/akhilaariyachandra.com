import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import DashboardItem from "@/components/dashboard/DashboardItem";
import Link from "next/link";
import Image from "next/image";
import Title from "@/components/Title";
import type { NextPage, GetStaticProps } from "next";
import {
  getMostPopularPosts,
  getTotalViews,
  getTotalReactions,
  getTotalDevViews,
  getTotalDevReactions,
} from "@/lib/stats";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  mostPopularPosts: { title: string; slug: string; hits: number; id: string }[];
};

const Dashboard: NextPage<Props> = ({ mostPopularPosts }) => {
  const { data } = useQuery(
    "topTracks",
    () => fetcher("/api/spotify/top-tracks"),
    {
      placeholderData: {
        tracks: [],
      },
    }
  );

  return (
    <Layout>
      <SEO title="Dashboard" />

      <Title title="Dashboard" />

      <div className="grid gap-4 grid-cols-1 p-4 sm:grid-cols-2">
        <DashboardItem
          title="Total Views"
          link={{ type: "internal", url: "/blog" }}
          url="/api/stats/total-views"
        />

        <DashboardItem
          title="Total Reactions"
          link={{ type: "internal", url: "/blog" }}
          url="/api/stats/total-reactions"
        />

        <DashboardItem
          title="DEV Views"
          link={{ type: "external", url: "https://dev.to/akhilaariyachandra" }}
          url="/api/stats/dev-total-views"
        />

        <DashboardItem
          title="DEV Reactions"
          link={{ type: "external", url: "https://dev.to/akhilaariyachandra" }}
          url="/api/stats/dev-total-reactions"
        />
      </div>

      <div className="my-4 p-4">
        <h2 className="my-6 dark:text-gray-200 text-gray-800 text-3xl font-semibold">
          Most Popular Posts
        </h2>

        <div className="grid gap-4 grid-cols-1">
          {mostPopularPosts.map((post) => (
            <article key={post.id}>
              <Link href={post.slug}>
                <a className="dark:text-green-600 text-green-700 text-2xl font-medium">
                  {post.title}
                </a>
              </Link>

              <p className="mt-1 dark:text-gray-200 text-gray-800 text-lg font-normal">{`${post.hits} views`}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="my-4 p-4">
        <h2 className="mt-6 dark:text-gray-200 text-gray-800 text-3xl font-semibold">
          Top Tracks
        </h2>

        <p className="mb-10 mt-4 dark:text-gray-300 text-gray-500 text-lg">
          Interested to know what I'm listening to? Here are my top tracks in
          Spotify updated daily.
        </p>

        <div className="flex flex-col divide-gray-200 dark:divide-gray-600 divide-y space-y-3">
          {data.tracks.map((track, index) => (
            <div
              key={index}
              className="flex flex-row items-center pt-3 space-x-6"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden">
                <Image
                  src={track.image}
                  width={640}
                  height={640}
                  alt={track.albumTitle}
                  title={track.albumTitle}
                />
              </div>

              <div className="truncate">
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-green-600 text-green-700 text-lg font-medium truncate"
                >
                  {track.title}
                </a>

                <p className="dark:text-gray-300 text-gray-500 truncate">
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const mostPopularPosts = await getMostPopularPosts();

  const queryClient = new QueryClient();

  // Prefetch Dashboard item data
  await Promise.all([
    queryClient.prefetchQuery(
      ["dashboardItem", "/api/stats/total-views"],
      getTotalViews
    ),
    queryClient.prefetchQuery(
      ["dashboardItem", "/api/stats/total-reactions"],
      getTotalReactions
    ),
    queryClient.prefetchQuery(
      ["dashboardItem", "/api/stats/dev-total-views"],
      getTotalDevViews
    ),
    queryClient.prefetchQuery(
      ["dashboardItem", "/api/stats/dev-total-reactions"],
      getTotalDevReactions
    ),
  ]);

  return {
    props: { mostPopularPosts, dehydratedState: dehydrate(queryClient) },
    revalidate: 600, // Regenerate after 10 mins
  };
};
