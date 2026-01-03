import { AudioLinesIcon } from "@/_components/audio-lines";
import { getNowPlaying } from "@/_lib/spotify";
import { type CSSProperties, Suspense } from "react";
import { ALBUM_ART_DIMENSIONS } from "./constants";
import NowPlayingClient from "./now-playing-client";

const NotPlaying = () => {
  return (
    <>
      <div className="grid size-(--mobile-album-art-dimensions) place-items-center sm:size-(--album-art-dimensions)">
        <AudioLinesIcon className="*:stroke-spotify-green" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium sm:text-xl">Not Playing</p>
      </div>
    </>
  );
};

const NowPlayingServer = async () => {
  const nowPlaying = await getNowPlaying();

  if (typeof nowPlaying === "string") {
    return <NotPlaying />;
  }

  return <NowPlayingClient nowPlaying={nowPlaying} />;
};

const NowPlaying = () => {
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
      <Suspense fallback={<NotPlaying />}>
        <NowPlayingServer />
      </Suspense>
    </div>
  );
};

export default NowPlaying;
