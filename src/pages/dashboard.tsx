import useSWR from "swr";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import DashboardItem from "src/components/DashboardItem";
import type { NextPage } from "next";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Dashboard: NextPage = () => {
  const totalViews = useSWR("/api/stat/total-views", fetcher, {
    initialData: 0,
    revalidateOnMount: true,
  });
  const totalReactions = useSWR("/api/stat/total-reactions", fetcher, {
    initialData: 0,
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
          value={totalViews.data}
        />

        <DashboardItem
          title="Total Reactions"
          link={{ type: "internal", url: "/blog" }}
          value={totalReactions.data}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
