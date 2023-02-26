"use client";

import useViews from "@/hooks/useViews.hook";
import { type FC, useEffect } from "react";

interface BlogPostViewsProps {
  slug: string;
}

const BlogPostViews: FC<BlogPostViewsProps> = ({ slug }) => {
  const { count, increment } = useViews(slug);

  useEffect(() => {
    // Will run twice in development mode due to React Strict mode
    increment();
  }, [increment]);

  return <p>{`${count} views`}</p>;
};

export default BlogPostViews;
