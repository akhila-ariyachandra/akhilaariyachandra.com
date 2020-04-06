require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Akhila Ariyachandra`,
    author: {
      name: `Akhila Ariyachandra`,
      summary: `, Web Developer with a passion for JavaScript and React`,
    },
    description: `Web Developer with a passion for JavaScript and React`,
    siteUrl: `https://akhilaariyachandra.com/`,
    social: {
      twitter: `heshan_1010`,
    },
    projects: [
      {
        title: "Sri Lanka COVID-19 Tracker",
        url: "https://sri-lanka-covid-19.now.sh/",
        description: "COVID-19 Tracker for Sri Lanka",
      },
      {
        title: "Blogger (WIP)",
        url: "https://github.com/akhila-ariyachandra/blogger",
        description: "A simple blogging site",
      },
    ],
    donationLink: `https://ko-fi.com/V7V5ZOMO`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Akhila Ariyachandra`,
        short_name: `Akhila Ariyachandra`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00c853`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    /* {
      resolve: `@isamrish/gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: process.env.GOOGLE_AD_CLIENT,
      },
    },  */
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.GATSBY_DISQUS_NAME,
      },
    },
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-preact`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-zeit-now`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
};
