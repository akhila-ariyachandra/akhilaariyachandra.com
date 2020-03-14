require("dotenv").config();
const fs = require("fs");
const { createClient } = require("contentful");

// Generate sitemap.xml
(async function() {
  const getUrlEntry = (slug = "") => {
    return `<url><loc>https://akhilaariyachandra.com/${slug}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`;
  };

  let sitemap =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

  // Index page
  sitemap += getUrlEntry();
  // Blog page
  sitemap += getUrlEntry("blog");
  // About page
  sitemap += getUrlEntry("about");

  // Get blog posts from CMS
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const results = await client.getEntries({
    content_type: "blogPost",
  });

  for (let item of results.items) {
    const blogPost = item.fields;

    sitemap += getUrlEntry(blogPost.slug);
  }

  sitemap += "</urlset>";

  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
