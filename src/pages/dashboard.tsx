import useSWR from "swr";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import DashboardItem from "src/components/DashboardItem";
import type { NextPage, GetStaticProps } from "next";
import { getTotalViews, getTotalReactions } from "src/lib/stats";

const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  totalViews: number;
  totalReactions: number;
};

const Dashboard: NextPage<Props> = ({ totalViews, totalReactions }) => {
  const { data } = useSWR("/api/stats", fetcher, {
    initialData: {
      totalViews,
      totalReactions,
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
    </Layout>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const [totalViews, totalReactions] = await Promise.all([
    getTotalViews(),
    getTotalReactions(),
  ]);

  return {
    props: { totalViews, totalReactions },
    revalidate: 3600, // Regenerate every hour
  };
};
