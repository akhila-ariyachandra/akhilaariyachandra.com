import config from "@/lib/config";
import DashboardItem from "./DashboardItem";
import TotalViews from "./TotalViews";
import Title from "@/components/Title";
import TopTracks from "./top-tracks";

interface DEVArticle {
  page_views_count: number;
  public_reactions_count: number;
}

export const metadata = {
  title: `Dashboard | ${config.title}`,
  openGraph: {
    title: "Dashboard",
    url: `${config.siteUrl}/dashboard`,
  },
};

const DashboardPage = async () => {
  const response = await fetch("https://dev.to/api/articles/me/published", {
    headers: {
      "api-key": process.env.DEV_API_KEY as string,
    },
    next: {
      revalidate: 86400,
    },
  });
  const data = (await response.json()) as DEVArticle[];

  const totalViews = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.page_views_count,
    0
  );
  const totalReactions = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.public_reactions_count,
    0
  );

  return (
    <>
      <Title title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TotalViews />

        <DashboardItem
          title="DEV Views"
          link={{ type: "external", url: config.social.dev }}
          value={totalViews}
        />

        <DashboardItem
          title="DEV Reactions"
          link={{ type: "external", url: config.social.dev }}
          value={totalReactions}
        />
      </div>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <TopTracks />
    </>
  );
};

export default DashboardPage;
