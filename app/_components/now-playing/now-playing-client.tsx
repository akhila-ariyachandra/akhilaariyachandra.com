"use client";

import { AudioLinesIcon } from "@/_components/audio-lines";
import type { RecentTracksType } from "@/_lib/types";
import Image from "next/image";
import { useEffect, useRef, type ComponentRef } from "react";

const NowPlayingClient = ({
  nowPlaying,
}: {
  nowPlaying: RecentTracksType["recenttracks"]["track"][number];
}) => {
  const visualizerIconRef = useRef<ComponentRef<typeof AudioLinesIcon>>(null);

  const albumArt = nowPlaying.image.find(
    (image) => image.size === "extralarge",
  )?.["#text"];

  useEffect(() => {
    visualizerIconRef.current?.startAnimation();
  }, []);

  return (
    <>
      <a
        href={nowPlaying.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative grid size-(--mobile-album-art-dimensions) place-items-center overflow-hidden rounded-sm sm:size-(--album-art-dimensions)"
      >
        {!!albumArt && (
          <Image
            src={albumArt}
            alt={nowPlaying.artist["#text"]}
            fill
            className="brightness-50"
            unoptimized
          />
        )}

        <span className="sr-only">{nowPlaying.artist["#text"]}</span>

        <AudioLinesIcon
          ref={visualizerIconRef}
          className="*:stroke-last-fm-red z-10"
        />
      </a>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium sm:text-xl">
          <a
            href={nowPlaying.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            {nowPlaying.name}
          </a>
        </p>

        <p className="truncate text-sm sm:text-base">
          {nowPlaying.artist["#text"]}
        </p>
      </div>
    </>
  );
};

export default NowPlayingClient;
