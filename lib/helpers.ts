import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getOgImages = (
  title: string,
  subtitle: string,
  content?: string,
) => {
  const url = new URL(`${getBaseURL()}/api/og`);

  url.searchParams.set("random-id", nanoid());
  url.searchParams.set("title", title);
  url.searchParams.set("subtitle", subtitle);

  if (content) {
    url.searchParams.set("content", content);
  }

  const images = [];

  // LinkedIn 1200x627
  const linkedInUrl = new URL(url);
  linkedInUrl.searchParams.set("width", "1200");
  linkedInUrl.searchParams.set("height", "627");
  images.push({
    url: linkedInUrl.toString(),
    width: 1200,
    height: 627,
  });

  // Base/Facebook 1200x630
  const baseUrl = new URL(url);
  baseUrl.searchParams.set("width", "1200");
  baseUrl.searchParams.set("height", "630");
  images.push({
    url: baseUrl.toString(),
    width: 1200,
    height: 630,
  });

  // Twitter 1200x675
  const twitterUrl = new URL(url);
  twitterUrl.searchParams.set("width", "1200");
  twitterUrl.searchParams.set("height", "675");
  images.push({
    url: twitterUrl.toString(),
    width: 1200,
    height: 675,
  });

  return images;
};
