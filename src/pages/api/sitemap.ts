import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { client } from "../../util/cms";

let sitemap: string = null;

const getUrlEntry = (slug: string = ""): string => {
  return `<url><loc>https://akhilaariyachandra.com/${slug}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`;
};

const sitemapHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!sitemap) {
      sitemap =
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

      // Index page
      sitemap += getUrlEntry();
      // Blog page
      sitemap += getUrlEntry("blog");
      // About page
      sitemap += getUrlEntry("about");

      // Form URLs for blog posts
      const results = await client.getEntries({
        content_type: "blogPost",
      });
      for (const item of results.items) {
        const blogPost: any = item.fields;

        sitemap += getUrlEntry(blogPost.slug);
      }

      sitemap += "</urlset>";
    }

    res.setHeader("Content-Type", "application/xml");
    return res.send(sitemap);
  } catch (error) {
    console.error(error);
  }
};

export default sitemapHandler;
