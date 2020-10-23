const fs = require("fs");
const path = require("path");

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
  const postsDirectory = path.join(process.cwd(), "src", "content", "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const routes = fileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  // Add remaining pages
  routes.push("");
  routes.push("blog");
  routes.push("career");
  routes.push("about");

  // Generate file content
  let content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  routes.forEach((route) => {
    content += getEntry(route);
  });
  content += `</urlset>`;

  // Write to /public/sitemap.xml
  const sitemapFile = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(sitemapFile, content);

  console.log("> Generated sitemap.xml");
})();
