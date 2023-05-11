"use client";

import ky from "ky";
import Image from "next/image";
import type { FC } from "react";
import type { Song } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { FaSpotify } from "react-icons/fa";

const NowPlaying: FC = () => {
  const { data } = useQuery({
    queryKey: ["spotify", "nowPlaying"],
    queryFn: () =>
      ky.get("/spotify/now-playing", { cache: "no-store" }).json<Song>(),
  });

  return (
    <div className="flex w-full flex-row-reverse items-center space-x-0 text-base antialiased sm:flex-row sm:space-x-3 sm:text-lg">
      <div className="relative grid h-[48px] w-[48px] flex-shrink-0 place-items-center">
        {data?.albumImage ? (
          <Image
            src={data.albumImage}
            alt={data.album}
            title={data.album}
            width={48}
            height={48}
            className="rounded"
          />
        ) : (
          <FaSpotify color="#1DB954" />
        )}

        {data?.isPlaying && (
          <span
            className="absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full"
            style={{ backgroundColor: "#1DB954" }}
          />
        )}
      </div>

      <div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
        {data?.songUrl ? (
          <a
            className="max-w-max truncate font-sora font-medium text-emerald-900 dark:text-zinc-100"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.name}
          </a>
        ) : (
          <p className="font-sora font-medium text-zinc-800 dark:text-zinc-200">
            Not Playing
          </p>
        )}
        <span className="mx-2 hidden font-sora text-zinc-600 dark:text-zinc-300 sm:block">
          {" – "}
        </span>
        <p className="max-w-max truncate font-sora text-zinc-700 dark:text-zinc-300">
          {data?.artist ?? "Spotify"}
        </p>
      </div>
    </div>
  );
};

export default NowPlaying;
