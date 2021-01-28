import useSWR from "swr";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import DashboardItem from "src/components/DashboardItem";
import Link from "next/link";
import type { NextPage, GetStaticProps } from "next";
import {
  getTotalViews,
  getTotalReactions,
  getMostPopularPosts,
} from "src/lib/stats";

const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  totalViews: number;
  totalReactions: number;
  mostPopularPosts: { title: string; slug: string; hits: number }[];
};

const Dashboard: NextPage<Props> = ({
  totalViews,
  totalReactions,
  mostPopularPosts,
}) => {
  const { data } = useSWR("/api/stats", fetcher, {
    initialData: {
      totalViews,
      totalReactions,
      mostPopularPosts,
    },
    revalidateOnMount: true,
  });

  return (
    <Layout>
      <SEO title="Dashboard" />

      <h1 className="mx-4 my-10 text-black dark:text-white text-4xl font-bold">
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
        <h2 className="my-6 text-black dark:text-white text-3xl font-semibold">
          Most Popular Posts
        </h2>

        <div className="grid gap-4 grid-cols-1">
          {data.mostPopularPosts.map((post) => (
            <article
              key={post.slug}
              className="p-2 border-2 border-gray-400 border-opacity-50 rounded-md"
            >
              <Link href={post.slug}>
                <a className="dark:text-green-600 text-green-700 text-2xl font-medium">
                  {post.title}
                </a>
              </Link>

              <p className="mt-2 text-black dark:text-white text-lg font-normal">{`${post.hits} views`}</p>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const [totalViews, totalReactions, mostPopularPosts] = await Promise.all([
    getTotalViews(),
    getTotalReactions(),
    getMostPopularPosts(),
  ]);

  return {
    props: { totalViews, totalReactions, mostPopularPosts },
    revalidate: 3600, // Regenerate every hour
  };
};
