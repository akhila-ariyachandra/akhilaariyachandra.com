import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "Google-Extended"],
        allow: "/",
        disallow: ["/blog/", "/snippets/"],
      },
    ],
    sitemap: "https://akhilaariyachandra.com/sitemap.xml",
    host: "https://akhilaariyachandra.com",
  };
};

export default robots;
