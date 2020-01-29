require(`dotenv`).config({
  path: `.env`
});

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Akhila Ariyachandra`,
    // Default title of the page
    siteTitleAlt: `Akhila Ariyachandra`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Akhila Ariyachandra's Blog`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://akhilaariyachandra.com`,
    // Used for SEO
    siteDescription: `A Blog by Akhila Ariyachandra talking about React, JavaScript & Programming`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `@heshan_1010`
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        // Links displayed in the header on the right side
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/akhila-ariyachandra`
          },
          {
            name: `DEV`,
            url: `https://dev.to/akhilaariyachandra`
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/akhila-ariyachandra/`
          }
        ],
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`
          },
          {
            title: `About`,
            slug: `/about`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: true
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Akhila Ariyachandra's Blog`,
        short_name: `Akhila's Blog`,
        description: `A Blog by Akhila Ariyachandra talking about React, JavaScript & Programming`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: process.env.GOOGLE_PUBLISHER_ID,
        head: true
      }
    },
    `gatsby-plugin-robots-txt`
  ]
};
