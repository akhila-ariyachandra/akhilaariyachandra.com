const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const dayjs = require("dayjs");
const minifyXML = require("minify-xml").minify;
const { Feed } = require("feed");
const { PrismaClient } = require("@prisma/client");

// Generate sitemap.xml
(() => {
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

  // Read all the blog posts first
  const postsDirectory = path.join("content", "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const routes = fileNames.map(
    (fileName) => `blog/${fileName.replace(/\.mdx$/, "")}`
  );

  // Read all snippets
  const snippetDirectory = path.join("content", "snippets");
  const snippetFileNames = fs.readdirSync(snippetDirectory);
  for (const fileName of snippetFileNames) {
    routes.push(`snippets/${fileName.replace(/\.mdx$/, "")}`);
  }

  // Add remaining pages
  routes.push("");
  routes.push("blog");
  routes.push("career");
  routes.push("snippets");
  routes.push("dashboard");

  // Generate file content
  let content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  routes.forEach((route) => {
    content += getEntry(route);
  });
  content += `</urlset>`;

  // Write to /public/sitemap.xml
  const sitemapFile = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(sitemapFile, minifyXML(content));

  return console.log("> Generated sitemap.xml");
})();

// Generate RSS Feed
(async () => {
  const feed = new Feed({
    title: "Akhila Ariyachandra's Blog RSS",
    description: "The RSS feed for my blog",
    id: "https://akhilaariyachandra.com/",
    link: "https://akhilaariyachandra.com/",
    image: "https://akhilaariyachandra.com/cover-pic.jpg",
    favicon: "https://akhilaariyachandra.com/favicon-32x32.png",
    copyright: `All rights reserved ${new Date().getFullYear()}, Akhila Ariyachandra`,
    author: {
      name: "Akhila Ariyachandra",
      link: "https://akhilaariyachandra.com/",
    },
  });

  // Add posts
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  for (const fileName of fileNames) {
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const source = fs.readFileSync(fullPath, "utf8");

    // Get frontmatter
    const { data } = matter(source);

    feed.addItem({
      title: data.title,
      id: `https://akhilaariyachandra.com/blog/${id}`,
      link: `https://akhilaariyachandra.com/blog/${id}`,
      description: data.description,
      date: dayjs(data.date).toDate(),
      image: `https://akhilaariyachandra.com${data.banner}`,
    });
  }

  // Generate XML content
  const content = feed.rss2();

  // Write to /public/rss.xml
  const rssFile = path.join(process.cwd(), "public", "rss.xml");
  fs.writeFileSync(rssFile, minifyXML(content));

  return console.log("> Generated rss.xml");
})();
