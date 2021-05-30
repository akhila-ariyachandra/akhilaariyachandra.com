import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import DashboardItem from "@/components/dashboard/DashboardItem";
import Link from "next/link";
import Title from "@/components/Title";
import TopTracks from "@/components/TopTracks";
import type { NextPage, GetStaticProps } from "next";
import {
  getMostPopularPosts,
  getTotalViews,
  getTotalReactions,
  getTotalDevViews,
  getTotalDevReactions,
} from "@/lib/dashboard";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { graphQLClient, gql } from "@/lib/api";

const Dashboard: NextPage = () => {
  const {
    data: {
      totalViews,
      totalReactions,
      totalDevViews,
      totalDevReactions,
      mostPopularPosts,
    },
  } = useQuery(
    "dashboard",
    () =>
      graphQLClient.request(gql`
        query Dashboard {
          totalViews
          totalReactions
          totalDevViews
          totalDevReactions
          mostPopularPosts {
            id
            title
            hits
            slug
          }
        }
      `),
    {
      placeholderData: {
        totalViews: 0,
        totalReactions: 0,
        totalDevViews: 0,
        totalDevReactions: 0,
        mostPopularPosts: [],
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
          value={totalViews}
        />

        <DashboardItem
          title="Total Reactions"
          link={{ type: "internal", url: "/blog" }}
          value={totalReactions}
        />

        <DashboardItem
          title="DEV Views"
          link={{ type: "external", url: "https://dev.to/akhilaariyachandra" }}
          value={totalDevViews}
        />

        <DashboardItem
          title="DEV Reactions"
          link={{ type: "external", url: "https://dev.to/akhilaariyachandra" }}
          value={totalDevReactions}
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

      <TopTracks />
    </Layout>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // Prefetch Dashboard data
  await queryClient.prefetchQuery("dashboard", async () => {
    const [
      totalViews,
      totalReactions,
      totalDevViews,
      totalDevReactions,
      mostPopularPosts,
    ] = await Promise.all([
      getTotalViews(),
      getTotalReactions(),
      getTotalDevViews(),
      getTotalDevReactions(),
      getMostPopularPosts(),
    ]);

    return {
      totalViews,
      totalReactions,
      totalDevViews,
      totalDevReactions,
      mostPopularPosts,
    };
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 86400, // Regenerate after 1 day
  };
};
