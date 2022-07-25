import DashboardItem from "@/components/dashboard/DashboardItem";
import SEO from "@/components/SEO";
import Title from "@/components/Title";
import TopTracks from "@/components/TopTracks";
import config from "@/lib/config";
import { getTotalDevReactions, getTotalDevViews } from "@/lib/dashboard";
import { getTopTracks } from "@/lib/spotify";
import type { Song } from "@/lib/types";
import type { GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

type DashboardProps = {
  tracks: Song[];
};

const Dashboard: NextPage<DashboardProps> = ({ tracks }) => {
  return (
    <>
      <SEO title="Dashboard" />

      <Title title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardItem
          title="DEV Views"
          link={{ type: "external", url: config.social.dev }}
          queryKey="totalDevViews"
          url="/api/dashboard/total-dev-views"
        />

        <DashboardItem
          title="DEV Reactions"
          link={{ type: "external", url: config.social.dev }}
          queryKey="totalDevReactions"
          url="/api/dashboard/total-dev-reactions"
        />
      </div>

      <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />

      <TopTracks tracks={tracks} />
    </>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const prefetchPromises = [];
  prefetchPromises.push(
    queryClient.prefetchQuery(["dashboard", "totalDevViews"], getTotalDevViews)
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(
      ["dashboard", "totalDevReactions"],
      getTotalDevReactions
    )
  );

  await Promise.all(prefetchPromises);

  // Get Spotify top tracks
  const response = await getTopTracks();
  const { items } = response.data;
  const tracks: Song[] = [];
  const length = items.length >= 10 ? 10 : items.length;
  for (let index = 0; index < length; index++) {
    const track = items[index];

    tracks.push({
      name: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      album: track.album.name,
      albumImage: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    });
  }

  return {
    props: { dehydratedState: dehydrate(queryClient), tracks },
    revalidate: 86400,
  };
};
