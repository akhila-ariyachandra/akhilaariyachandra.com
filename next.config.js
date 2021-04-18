const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const fs = require("fs");
const path = require("path");

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' utteranc.es;
  iframe-src *.now.sh *.vercel.app;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          runtimeCaching,
          disable: process.env.NODE_ENV === "development",
        },
      },
    ],
  ],
  {
    images: {
      domains: ["i.scdn.co"],
    },
    headers: async () => {
      return [
        {
          source: "/",
          headers: securityHeaders,
        },
        {
          source: "/:path*",
          headers: securityHeaders,
        },
      ];
    },
    rewrites: async () => {
      return [
        {
          source: "/bee.js",
          destination: "https://cdn.splitbee.io/sb.js",
        },
        {
          source: "/_hive/:slug",
          destination: "https://hive.splitbee.io/:slug",
        },
      ];
    },
    redirects: async () => {
      const redirects = [];

      // Move all blog posts under /blog
      const postsDirectory = path.join("content", "posts");
      const fileNames = fs.readdirSync(postsDirectory);
      const routes = fileNames.map((fileName) =>
        fileName.replace(/\.mdx$/, "")
      );

      for (const route of routes) {
        redirects.push({
          source: `/${route}`,
          destination: `/blog/${route}`,
          permanent: true,
        });
      }

      // Fix redirect for DEV post for https://dev.to/akhilaariyachandra/mimic-react-life-cycle-methods-with-hooks-286a
      redirects.push({
        source: `/mimic-react-life-cycles-methods-with-hooks`,
        destination: `/blog/mimic-react-life-cycle-methods-with-hooks`,
        permanent: true,
      });

      return redirects;
    },
    webpack: (config, { dev, isServer }) => {
      // Replace React with Preact only in client production build
      /* if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      } */

      return config;
    },
    future: {
      webpack5: true,
      strictPostcssConfiguration: true,
    },
  }
);
