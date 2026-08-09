import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const getParagraphs = (text: string) => {
  return text.split("\n").map((paragraph) => paragraph.trim());
};
