import config from "@/lib/config";
import DashboardItem from "./dashboard-item";
import Title from "@/components/Title";
import TopTracks from "./top-tracks";
import type { FC } from "react";

export const metadata = {
  title: "Dashboard",
  openGraph: {
    title: "Dashboard",
    url: `${config.siteUrl}/dashboard`,
  },
};

const DashboardPage: FC = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardPage;
