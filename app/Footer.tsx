"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import type { PostsTotalResponse } from "@/lib/types";

const Footer = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts");

      if (!response.ok) {
        throw new Error("Error fetching post totals");
      }

      return (await response.json()) as PostsTotalResponse;
    },
    placeholderData: {
      views: 0,
      upvotes: 0,
    },
  });

  return (
    <footer className="container mt-auto max-w-4xl p-3 text-sm text-zinc-700 dark:text-zinc-300 sm:p-4 sm:text-base">
      © {new Date().getFullYear()},{" "}
      <Link
        href="/"
        className="font-medium text-green-700 hover:underline dark:text-green-500"
      >
        akhilaariyachandra.com
      </Link>{" "}
      <span className="font-light text-zinc-600 dark:text-zinc-400">{`(${data?.views} post views, ${data?.upvotes} upvotes)`}</span>
    </footer>
  );
};

export default Footer;
