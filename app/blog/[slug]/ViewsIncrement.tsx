"use client";

import { useEffect } from "react";

type ViewsIncrementProps = {
  slug: string;
};

const ViewsIncrement = ({ slug }: ViewsIncrementProps) => {
  useEffect(() => {
    // Will run twice on mount in development because of
    // React Strict Mode
    fetch(`/api/views/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
  }, [slug]);

  return null;
};

export default ViewsIncrement;
