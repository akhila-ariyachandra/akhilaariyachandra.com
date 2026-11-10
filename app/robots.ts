import { PRODUCTION_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/resume", "/blog/archive/"],
      },
    ],
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
    host: PRODUCTION_URL,
  };
};

export default robots;
