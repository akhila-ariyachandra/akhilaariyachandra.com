import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://akhilaariyachandra.com/sitemap.xml",
    host: "https://akhilaariyachandra.com",
  };
};

export default robots;
