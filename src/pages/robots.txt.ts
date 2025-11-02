import type { APIRoute } from "astro";
import { PRODUCTION_URL } from "../lib/constants";

const robotsTxt = `
User-agent: *
Allow: /

User-agent: CCBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Omgilibot
Disallow: /

User-agent: FacebookBot
Disallow: /

Sitemap: ${PRODUCTION_URL}/sitemap.xml
Host: ${PRODUCTION_URL}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};