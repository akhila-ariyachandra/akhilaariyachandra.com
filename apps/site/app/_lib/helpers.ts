import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { type } from "arktype";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { client } from "./sanity/client";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

const builder = createImageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

export const getParagraphs = (text: string) => {
  return text.split("\n").map((paragraph) => paragraph.trim());
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
