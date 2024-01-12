"use client";

import { useEffect } from "react";
import { incrementViews } from "./actions";

type ViewsIncrementerProps = {
  slug: string;
  incrementOnMount: boolean;
};

const ViewsIncrementer = ({
  slug,
  incrementOnMount,
}: ViewsIncrementerProps) => {
  useEffect(() => {
    if (incrementOnMount) {
      incrementViews(slug);
    }
  }, [slug, incrementOnMount]);

  return null;
};

export default ViewsIncrementer;
