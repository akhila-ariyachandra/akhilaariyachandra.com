"use client";

import { FC, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

const DNT_KEY = "vercel-analytics-dnt";

export const setStorageSafe = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

export const getStorageSafe = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {}
};

const AnalyticsWrapper: FC = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (searchParams.get("dnt")) {
      setStorageSafe(DNT_KEY, "1");
    }
  }, [searchParams]);

  return (
    <Analytics
      beforeSend={(e) => {
        if (getStorageSafe(DNT_KEY) === "1") {
          return null;
        }

        return e;
      }}
    />
  );
};

export default AnalyticsWrapper;
