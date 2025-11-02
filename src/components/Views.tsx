"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";

type ViewsProps = {
  slug: string;
  increment?: boolean;
};

const Views = ({ slug, increment = false }: ViewsProps) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Fetch current views
    fetch(`/api/views/${slug}`)
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => setViews(0));

    // Increment views if needed
    if (increment) {
      fetch(`/api/views/${slug}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => setViews(data.views))
        .catch(() => {});
    }
  }, [slug, increment]);

  if (views === null) {
    return <span>0 views</span>;
  }

  return <span>{views} views</span>;
};

export default Views;