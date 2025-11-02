import { defineConfig } from "astro/config";
import react from "@astro/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeExternalLinks } from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      rehypePlugins: [
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [
          rehypePrettyCode,
          {
            theme: "material-theme-ocean",
            filterMetaString: (string: string) =>
              string.replace(/filename="[^"]*"/, ""),
          },
        ],
      ],
    }),
    sitemap(),
  ],
  output: "static",
  site: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://localhost:4321",
  redirects: {
    "/blog/client-side-rendering-vs-server-side-rendering":
      "https://archive.akhilaariyachandra.com/blog/client-side-rendering-vs-server-side-rendering",
    "/blog/create-a-serverless-api-with-typescript-graphql-and-mongodb":
      "https://archive.akhilaariyachandra.com/blog/create-a-serverless-api-with-typescript-graphql-and-mongodb",
    "/blog/data-structures-stack":
      "https://archive.akhilaariyachandra.com/blog/data-structures-stack",
    "/blog/dont-sync-state-derive-it":
      "https://archive.akhilaariyachandra.com/blog/dont-sync-state-derive-it",
    "/blog/environment-variables-in-next-js":
      "https://archive.akhilaariyachandra.com/blog/environment-variables-in-next-js",
    "/blog/firebase-authentication-react-hook":
      "https://archive.akhilaariyachandra.com/blog/firebase-authentication-react-hook",
    "/blog/getting-started-in-react-with-parcel-js":
      "https://archive.akhilaariyachandra.com/blog/getting-started-in-react-with-parcel-js",
    "/blog/getting-started-in-react-with-webpack":
      "https://archive.akhilaariyachandra.com/blog/getting-started-in-react-with-webpack",
    "/blog/getting-started-with-tailwind-css-in-next-js":
      "https://archive.akhilaariyachandra.com/blog/getting-started-with-tailwind-css-in-next-js",
    "/blog/making-delayed-network-requests-in-react-with-settimeout-and-useeffect":
      "https://archive.akhilaariyachandra.com/blog/making-delayed-network-requests-in-react-with-settimeout-and-useeffect",
    "/blog/markdown-cheatsheet":
      "https://archive.akhilaariyachandra.com/blog/markdown-cheatsheet",
    "/blog/mimic-react-life-cycle-methods-with-hooks":
      "https://archive.akhilaariyachandra.com/blog/mimic-react-life-cycle-methods-with-hooks",
    "/blog/my-two-most-used-ES6-features":
      "https://archive.akhilaariyachandra.com/blog/my-two-most-used-ES6-features",
    "/blog/note-app-part-1-setup-the-node-api":
      "https://archive.akhilaariyachandra.com/blog/note-app-part-1-setup-the-node-api",
    "/blog/note-app-part-2-the-react-site":
      "https://archive.akhilaariyachandra.com/blog/note-app-part-2-the-react-site",
    "/blog/page-loading-progress-bar-in-nextjs":
      "https://archive.akhilaariyachandra.com/blog/page-loading-progress-bar-in-nextjs",
    "/blog/persistent-state-in-react":
      "https://archive.akhilaariyachandra.com/blog/persistent-state-in-react",
    "/blog/prettier-config":
      "https://archive.akhilaariyachandra.com/blog/prettier-config",
    "/blog/prisma-development":
      "https://archive.akhilaariyachandra.com/blog/prisma-development",
    "/blog/react-usereducer-with-usecontext":
      "https://archive.akhilaariyachandra.com/blog/react-usereducer-with-usecontext",
    "/blog/serverless-graphql-api-typescript-prisma-postgressql":
      "https://archive.akhilaariyachandra.com/blog/serverless-graphql-api-typescript-prisma-postgressql",
    "/blog/serverless-pre-rendering":
      "https://archive.akhilaariyachandra.com/blog/serverless-pre-rendering",
    "/blog/setup-mongodb-in-nodejs-with-mongoose":
      "https://archive.akhilaariyachandra.com/blog/setup-mongodb-in-nodejs-with-mongoose",
    "/blog/setup-redux-in-a-react-app":
      "https://archive.akhilaariyachandra.com/blog/setup-redux-in-a-react-app",
    "/blog/sleep-in-javascript":
      "https://archive.akhilaariyachandra.com/blog/sleep-in-javascript",
    "/blog/understanding-this-in-react":
      "https://archive.akhilaariyachandra.com/blog/understanding-this-in-react",
    "/blog/use-hooks-in-react-redux":
      "https://archive.akhilaariyachandra.com/blog/use-hooks-in-react-redux",
    "/blog/using-mongodb-in-a-serverless-app":
      "https://archive.akhilaariyachandra.com/blog/using-mongodb-in-a-serverless-app",
    "/blog/using-planetscale-with-prisma-in-nextjs":
      "https://archive.akhilaariyachandra.com/blog/using-planetscale-with-prisma-in-nextjs",
    "/blog/using-react-context":
      "https://archive.akhilaariyachandra.com/blog/using-react-context",
    "/blog/utterances-comments-in-react-blog":
      "https://archive.akhilaariyachandra.com/blog/utterances-comments-in-react-blog",
    "/snippets/firebase-authentication-react-hook": "/blog/firebase-authentication-react-hook",
    "/snippets/prettier-config": "/blog/prettier-config",
    "/snippets/prisma-development": "/blog/prisma-development",
    "/snippets/serverless-pre-rendering": "/blog/serverless-pre-rendering",
    "/snippets/sleep-in-javascript": "/blog/sleep-in-javascript",
    "/snippets/using-clsx-or-classnames-with-tailwind-merge": "/blog/using-clsx-or-classnames-with-tailwind-merge",
  },
});