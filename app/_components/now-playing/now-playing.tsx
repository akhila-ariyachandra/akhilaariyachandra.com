import { AudioLinesIcon } from "@/_components/audio-lines";
import { getRecentTracks } from "@/_lib/last-fm";
import { type CSSProperties, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ALBUM_ART_DIMENSIONS } from "./constants";
import NowPlayingClient from "./now-playing-client";

const NotPlaying = () => {
  return (
    <>
      <div className="grid size-(--mobile-album-art-dimensions) place-items-center sm:size-(--album-art-dimensions)">
        <AudioLinesIcon className="*:stroke-last-fm-red" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium sm:text-xl">Not Playing</p>
      </div>
    </>
  );
};

const NowPlayingServer = async () => {
  const recentTracks = await getRecentTracks();
  const nowPlaying = recentTracks.find((track) => track["@attr"]?.nowplaying);

  if (!nowPlaying) {
    return <NotPlaying />;
  }

  return <NowPlayingClient nowPlaying={nowPlaying} />;
};

const NowPlaying = async () => {
  return (
    <div
      className="flex items-center gap-4"
      style={
        {
          "--album-art-dimensions": `${ALBUM_ART_DIMENSIONS.desktop.toString()}px`,
          "--mobile-album-art-dimensions": `${ALBUM_ART_DIMENSIONS.mobile.toString()}px`,
        } as CSSProperties
      }
    >
      <ErrorBoundary fallback={<NotPlaying />}>
        <Suspense fallback={<NotPlaying />}>
          <NowPlayingServer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default NowPlaying;
