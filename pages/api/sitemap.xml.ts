import { getBlogPosts, getCodeSnippets } from "@/utils/sanity";
import type { NextApiHandler } from "next";

const SitemapHandler: NextApiHandler = async (req, res) => {
  const blogPosts = await getBlogPosts();
  const codeSnippets = await getCodeSnippets();

  // Function to generate url entry
  const getEntry = (route = "") => {
    return `
        <url>
            <loc>https://akhilaariyachandra.com/${route}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
        </url>
        `;
  };

  const routes = [
    "",
    "blog",
    "snippets",
    "dashboard",
    ...blogPosts.map((post) => `blog/${post.slug.current}`),
    ...codeSnippets.map((snippet) => `snippets/${snippet.slug.current}`),
  ];

  let content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  routes.forEach((route) => {
    content += getEntry(route);
  });
  content += `</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(content);
};

export default SitemapHandler;
