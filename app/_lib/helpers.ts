import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const nowPlayingSchema = z
  .object({
    item: z.object({
      album: z.object({
        external_urls: z.object({ spotify: z.string() }),
        images: z.array(
          z.object({
            url: z.string(),
            height: z.number(),
            width: z.number(),
          }),
        ),
        name: z.string(),
      }),
      artists: z.array(
        z.object({
          name: z.string(),
        }),
      ),
      external_urls: z.object({ spotify: z.string() }),
      name: z.string(),
    }),
  })
  .or(z.string());
export type NowPlaying = Exclude<z.infer<typeof nowPlayingSchema>, string>;
