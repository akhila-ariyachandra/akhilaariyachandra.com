import { type } from "arktype";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const NowPlaying = type({
  item: {
    album: {
      external_urls: {
        spotify: "string",
      },
      images: type({
        url: "string",
        height: "number",
        width: "number",
      }).array(),
      name: "string",
    },
    artists: type({
      name: "string",
    }).array(),
    external_urls: {
      spotify: "string",
    },
    name: "string",
  },
}).or("string");
export type NowPlaying = Exclude<typeof NowPlaying.infer, string>;
