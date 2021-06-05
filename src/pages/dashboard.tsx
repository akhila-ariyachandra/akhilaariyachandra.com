import config from "@/lib/config";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import DashboardItem from "@/components/dashboard/DashboardItem";
import Link from "next/link";
import Title from "@/components/Title";
import TopTracks from "@/components/TopTracks";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/helpers";

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
    <Layout>
      <SEO title="Dashboard" />

      <Title title="Dashboard" />

      <div className="grid gap-4 grid-cols-1 p-4 sm:grid-cols-2">
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

      <div className="my-4 p-4">
        <h2 className="my-6 dark:text-gray-200 text-gray-800 text-3xl font-semibold">
          Most Popular Posts
        </h2>

        <div className="grid gap-4 grid-cols-1">
          {data.map((post) => (
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
