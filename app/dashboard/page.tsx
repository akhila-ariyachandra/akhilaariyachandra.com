import config from "@/lib/config";
import DashboardItem from "./dashboard-item";
import Title from "@/components/Title";
import TopTracks from "./top-tracks";
import type { Song } from "@/lib/types";
import { getTopTracks } from "@/lib/spotify";

const getTopTenTracks = async () => {
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

  return tracks;
};

// https://beta.nextjs.org/docs/api-reference/segment-config
export const revalidate = 86400;

const DashboardPage = async () => {
  const tracks = await getTopTenTracks();

  return (
    <>
      <Title title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardItem
          title="Total Views"
          link={{ type: "internal", url: "/blog" }}
          queryKey="totalViews"
          url="/api/views"
        />

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

export default DashboardPage;
