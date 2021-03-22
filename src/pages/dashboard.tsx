import useSWR from "swr";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import DashboardItem from "@/components/DashboardItem";
import Link from "next/link";
import Image from "next/image";
import type { NextPage, GetStaticProps } from "next";
import { getMostPopularPosts } from "@/lib/stats";

const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  mostPopularPosts: { title: string; slug: string; hits: number }[];
};

const Dashboard: NextPage<Props> = ({ mostPopularPosts }) => {
  const { data } = useSWR("/api/stats", fetcher, {
    initialData: {
      totalViews: 0,
      totalReactions: 0,
    },
    revalidateOnMount: true,
  });
  const { data: tracksData } = useSWR("/api/spotify/top-tracks", fetcher);

  return (
    <Layout>
      <SEO title="Dashboard" />

      <h1 className="mx-4 my-10 dark:text-gray-200 text-gray-800 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-4 grid-cols-1 p-4 sm:grid-cols-2">
        <DashboardItem
          title="Total Views"
          link={{ type: "internal", url: "/blog" }}
          value={data.totalViews}
        />

        <DashboardItem
          title="Total Reactions"
          link={{ type: "internal", url: "/blog" }}
          value={data.totalReactions}
        />
      </div>

      <div className="my-4 p-4">
        <h2 className="my-6 dark:text-gray-200 text-gray-800 text-3xl font-semibold">
          Most Popular Posts
        </h2>

        <div className="grid gap-4 grid-cols-1">
          {mostPopularPosts.map((post) => (
            <article key={post.slug}>
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
          {tracksData?.tracks?.map((track, index) => (
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
                  className="dark:text-gray-100 text-gray-900 text-lg font-medium truncate"
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

  return {
    props: { mostPopularPosts },
    revalidate: 600, // Regenerate after 10 mins
  };
};
