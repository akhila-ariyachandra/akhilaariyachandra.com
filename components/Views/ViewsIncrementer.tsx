"use client";

import ky from "ky";
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
    const increment = async () => {
      const { ip } = await ky
        .get("https://api.ipify.org/?format=json")
        .json<{ ip: string }>();
      await incrementViews(slug, ip);
    };

    if (incrementOnMount) {
      increment();
    }
  }, [slug, incrementOnMount]);

  return null;
};

export default ViewsIncrementer;
