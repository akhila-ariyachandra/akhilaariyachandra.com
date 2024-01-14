import { clsx, type ClassValue } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

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

export const getOgImage = (
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

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  };
};
