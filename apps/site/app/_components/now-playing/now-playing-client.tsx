"use client";

import { AudioLinesIcon } from "@/_components/audio-lines";
import type { NowPlaying } from "@/_lib/helpers";
import Image from "next/image";
import { useEffect, useRef, type ComponentRef } from "react";
import { ALBUM_ART_DIMENSIONS } from "./constants";

const NowPlayingClient = ({ nowPlaying }: { nowPlaying: NowPlaying }) => {
  const visualizerIconRef = useRef<ComponentRef<typeof AudioLinesIcon>>(null);

  const albumArt = nowPlaying.item.album.images.find(
    (image) => image.width >= ALBUM_ART_DIMENSIONS.desktop,
  )?.url;

  useEffect(() => {
    visualizerIconRef.current?.startAnimation();
  }, []);

  return (
    <>
      <a
        href={nowPlaying.item.album.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="relative grid size-(--mobile-album-art-dimensions) place-items-center overflow-hidden rounded-sm sm:size-(--album-art-dimensions)"
      >
        {!!albumArt && (
          <Image
            src={albumArt}
            alt={nowPlaying.item.album.name}
            fill
            className="brightness-50"
            unoptimized
          />
        )}

        <span className="sr-only">{nowPlaying.item.album.name}</span>

        <AudioLinesIcon
          ref={visualizerIconRef}
          className="*:stroke-spotify-green z-10"
        />
      </a>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium sm:text-xl">
          <a
            href={nowPlaying.item.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent dark:text-accent-dark hover:underline"
          >
            {nowPlaying.item.name}
          </a>
        </p>

        <p className="truncate text-sm sm:text-base">
          {nowPlaying.item.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </>
  );
};

export default NowPlayingClient;
