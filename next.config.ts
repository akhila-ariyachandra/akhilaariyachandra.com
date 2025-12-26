import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    turbopackFileSystemCacheForBuild: true,
    staticGenerationRetryCount: 2,
  },
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  redirects: async () => {
    const oldBlogPostRedirects = [
      "client-side-rendering-vs-server-side-rendering",
      "create-a-serverless-api-with-typescript-graphql-and-mongodb",
      "data-structures-stack",
      "dont-sync-state-derive-it",
      "environment-variables-in-next-js",
      "firebase-authentication-react-hook",
      "getting-started-in-react-with-parcel-js",
      "getting-started-in-react-with-webpack",
      "getting-started-with-tailwind-css-in-next-js",
      "making-delayed-network-requests-in-react-with-settimeout-and-useeffect",
      "markdown-cheatsheet",
      "mimic-react-life-cycle-methods-with-hooks",
      "my-two-most-used-ES6-features",
      "note-app-part-1-setup-the-node-api",
      "note-app-part-2-the-react-site",
      "page-loading-progress-bar-in-nextjs",
      "persistent-state-in-react",
      "prettier-config",
      "prisma-development",
      "react-usereducer-with-usecontext",
      "serverless-graphql-api-typescript-prisma-postgressql",
      "serverless-pre-rendering",
      "setup-mongodb-in-nodejs-with-mongoose",
      "setup-redux-in-a-react-app",
      "sleep-in-javascript",
      "understanding-this-in-react",
      "use-hooks-in-react-redux",
      "using-mongodb-in-a-serverless-app",
      "using-planetscale-with-prisma-in-nextjs",
      "using-react-context",
      "utterances-comments-in-react-blog",
    ].map((slug) => ({
      source: `/blog/${slug}`,
      destination: `https://archive.akhilaariyachandra.com/blog/${slug}`,
      permanent: true,
    }));

    // Redirect old snippet pages
    const snippetRedirects = [
      "firebase-authentication-react-hook",
      "prettier-config",
      "prisma-development",
      "serverless-pre-rendering",
      "sleep-in-javascript",
      "using-clsx-or-classnames-with-tailwind-merge",
    ].map((slug) => ({
      source: `/snippets/${slug}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }));

    return [...oldBlogPostRedirects, ...snippetRedirects];
  },
};

export default withContentCollections(nextConfig);
