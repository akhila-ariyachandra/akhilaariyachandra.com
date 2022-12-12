"use client";

import useViews from "@/hooks/useViews.hook";
import { type FC, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const NO_INCREMENT_KEY = "no-increment-key";

interface BlogPostViewsProps {
  slug: string;
}

const BlogPostViews: FC<BlogPostViewsProps> = ({ slug }) => {
  const searchParams = useSearchParams();
  const { count, increment } = useViews(slug);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (searchParams.get("no-increment")) {
      try {
        localStorage.setItem(NO_INCREMENT_KEY, "1");
      } catch {}
    }

    try {
      if (localStorage.getItem(NO_INCREMENT_KEY) !== "1") {
        // Will run twice in development mode due to React Strict mode
        increment();
      }
    } catch {}
  }, [increment, searchParams]);

  return <p>{`${count} views`}</p>;
};

export default BlogPostViews;
