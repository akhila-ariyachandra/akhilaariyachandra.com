import config from "@/lib/config";
import SEO from "@/components/SEO";
import DashboardItem from "@/components/dashboard/DashboardItem";
import Link from "next/link";
import Title from "@/components/Title";
import TopTracks from "@/components/TopTracks";
import type { NextPage, GetStaticProps } from "next";
import type { Song } from "@/lib/types";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { fetcher } from "@/lib/helpers";
import {
  getMostPopularPosts,
  getTotalViews,
  getTotalReactions,
  getTotalDevViews,
  getTotalDevReactions,
} from "@/lib/dashboard";
import { getTopTracks } from "@/lib/spotify";

const Divider = () => {
  return <hr className="my-12 h-[1px] bg-zinc-200 dark:bg-zinc-600" />;
};

type PopularPost = {
  id: string;
  title: string;
  hits: string;
  slug: string;
};

type Props = {
  tracks: Song[];
};

const Dashboard: NextPage<Props> = ({ tracks }) => {
  const { data } = useQuery<PopularPost[], Error>(
    ["dashboard", "mostPopularPosts"],
    () => fetcher("/api/dashboard/most-popular-posts"),
    { placeholderData: [] }
  );

  return (
    <>
      <SEO title="Dashboard" />

      <Title title="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardItem
          title="Views"
          link={{ type: "internal", url: "/blog" }}
          queryKey="totalViews"
          url="/api/dashboard/total-views"
        />

        <DashboardItem
          title="Reactions"
          link={{ type: "internal", url: "/blog" }}
          queryKey="totalReactions"
          url="/api/dashboard/total-reactions"
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

      <Divider />

      <div className="my-10">
        <h2 className="my-6 font-sora text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
          Most Popular Posts
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {data.map((post) => (
            <article key={post.id}>
              <Link href={post.slug}>
                <a className="font-sora text-2xl font-medium text-emerald-700 dark:text-emerald-600">
                  {post.title}
                </a>
              </Link>

              <p className="mt-1 font-roboto-slab text-lg font-normal text-zinc-800 dark:text-zinc-200">{`${post.hits} views`}</p>
            </article>
          ))}
        </div>
      </div>

      <Divider />

      <TopTracks tracks={tracks} />
    </>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const prefetchPromises = [];

  prefetchPromises.push(
    queryClient.prefetchQuery(
      ["dashboard", "mostPopularPosts"],
      getMostPopularPosts
    )
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(["dashboard", "totalViews"], getTotalViews)
  );
  prefetchPromises.push(
    queryClient.prefetchQuery(
      ["dashboard", "totalReactions"],
      getTotalReactions
    )
  );
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
