"use client";

import ky from "ky";
import { useEffect } from "react";

type IncrementProps = {
  enabled: boolean;
  slug: string;
  action: (slug: string, ip: string) => Promise<void>;
};

const Increment = ({ enabled, slug, action }: IncrementProps) => {
  useEffect(() => {
    const incrementViews = async () => {
      const response = await ky("https://api.ipify.org/?format=json").json<{
        ip: string;
      }>();

      await action(slug, response.ip);
    };

    if (enabled) {
      incrementViews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Increment;
