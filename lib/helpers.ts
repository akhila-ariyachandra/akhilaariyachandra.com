import { clsx, type ClassValue } from "clsx";
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

export const getOgImageUrl = (
  title: string,
  subtitle: string,
  content?: string,
) => {
  const url = new URL(`${getBaseURL()}/api/og`);

  url.searchParams.set("title", title);
  url.searchParams.set("subtitle", subtitle);

  if (content) {
    url.searchParams.set("content", content);
  }

  return url.toString();
};
