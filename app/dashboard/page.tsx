import config from "@/lib/config";
import getQueryClient from "@/lib/getQueryClient";
import DashboardItem from "./dashboard-item";
import Title from "@/components/Title";
import TopTracks from "./top-tracks";
import HydrateWrapper from "@/components/HydrateWrapper";
import { dehydrate } from "@tanstack/react-query";
import { sql } from "drizzle-orm/sql";
import { db, views } from "@/db/schema";
import { getDevTotalViews, getDevTotalReactions } from "@/lib/dev";

export const revalidate = 3600; // 1 hour

export const metadata = {
  title: "Dashboard",
  openGraph: {
    title: "Dashboard",
    url: `${config.siteUrl}/dashboard`,
  },
};

const DashboardPage = async () => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["dashboard", "totalViews", "/views"],
      queryFn: async () => {
        const result = await db
          .select({
            sum: sql<number>`SUM(${views.count})`,
          })
          .from(views);

        let count = 0;
        if (result.length > 0 && result[0].sum) {
          count = result[0].sum;
        }

        return {
          count,
        };
      },
    }),
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["dashboard", "totalDevViews", "/dashboard/total-dev-views"],
      queryFn: async () => {
        const totalViews = await getDevTotalViews();

        return {
          count: totalViews,
        };
      },
    }),
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [
        "dashboard",
        "totalDevReactions",
        "/dashboard/total-dev-reactions",
      ],
      queryFn: async () => {
        const totalReactions = await getDevTotalReactions();

        return {
          count: totalReactions,
        };
      },
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateWrapper state={dehydratedState}>
      <Title title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardItem
          title="Total Views"
          link={{ type: "internal", url: "/blog" }}
          queryKey="totalViews"
          url="/views"
        />

        <DashboardItem
          title="DEV Views"
          link={{ type: "external", url: config.social.dev }}
          queryKey="totalDevViews"
          url="/dashboard/total-dev-views"
        />

        <DashboardItem
          title="DEV Reactions"
          link={{ type: "external", url: config.social.dev }}
          queryKey="totalDevReactions"
          url="/dashboard/total-dev-reactions"
        />
      </div>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <TopTracks />
    </HydrateWrapper>
  );
};

export default DashboardPage;
