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
        title: `Sri Lanka COVID-19 Tracker`,
        url: `https://sri-lanka-covid-19.now.sh/`,
        description: `COVID-19 Tracker for Sri Lanka`,
      },
      {
        title: `Blogger (WIP)`,
        url: `https://github.com/akhila-ariyachandra/blogger`,
        description: `A simple blogging site`,
      },
    ],
    donationLink: `https://ko-fi.com/V7V5ZOMO`,
    technologies: [
      {
        name: `JavaScript`,
        background: `#f7df1e`,
        text: `#000000`,
        link: `https://www.javascript.com/`,
      },
      {
        name: `React`,
        background: `#292929`,
        text: `#00d8ff`,
        link: `https://reactjs.org/`,
      },
      {
        name: `GraphQL`,
        background: `#e10098`,
        text: `#ffffff`,
        link: `https://graphql.org/`,
      },
      {
        name: `TypeScript`,
        background: `#294E80`,
        text: `#e7e7e7`,
        link: `https://www.typescriptlang.org/`,
      },
      {
        name: `Next.js`,
        background: `#000000`,
        text: `#ffffff`,
        link: `https://nextjs.org/`,
      },
      {
        name: `Gatsby`,
        background: `#663399`,
        text: `#ffffff`,
        link: `https://www.gatsbyjs.org/`,
      },
      {
        name: `Node.js`,
        background: `#026e00`,
        text: `#ffffff`,
        link: `https://nodejs.org/en/`,
      },
      {
        name: `MongoDB`,
        background: `#589636`,
        text: `#ffffff`,
        link: `https://www.mongodb.com/`,
      },
      {
        name: `JAMStack`,
        background: `#00c7b7`,
        text: `#ffffff`,
        link: `https://jamstack.org/`,
      },
      {
        name: `Serverless`,
        background: `#fd5750`,
        text: `#ffffff`,
        link: `https://serverless.com/`,
      },
      {
        name: `Apollo`,
        background: `#3f20ba`,
        text: `#ffffff`,
        link: `https://www.apollographql.com/`,
      },
      {
        name: `Tailwind CSS`,
        background: `#0694a2`,
        text: `#ffffff`,
        link: `https://tailwindcss.com/`,
      },
      {
        name: `React Native`,
        background: `#292929`,
        text: `#00d8ff`,
        link: `https://reactnative.dev/`,
      },
      {
        name: `Firebase`,
        background: `#fbc02d`,
        text: `#424242`,
        link: `https://firebase.google.com/`,
      },
      {
        name: `Vercel`,
        background: `#000000`,
        text: `#ffffff`,
        link: `https://vercel.com/home`,
      },
      {
        name: `Netlify`,
        background: `#00ad9f`,
        text: `#ffffff`,
        link: `https://www.netlify.com/`,
      },
      {
        name: `Contentful`,
        background: `#2478cc`,
        text: `#ffffff`,
        link: `https://www.contentful.com/`,
      },
    ],
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/career`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
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
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]":
                  "text-3xl sm:text-4xl sm:text-5xl font-bold my-3",
                "heading[depth=2]":
                  "text-2xl sm:text-3xl sm:text-4xl font-bold my-3",
                "heading[depth=3]":
                  "text-xl sm:text-2xl sm:text-3xl font-semibold my-3",
                "heading[depth=4]":
                  "text-lg sm:text-xl sm:text-2xl font-semibold my-3",
                "heading[depth=5]":
                  "text-base sm:text-lg sm:text-xl font-medium my-3",
                "heading[depth=6]":
                  "text-sm sm:text-base sm:text-lg font-medium my-3",
                paragraph: "text-base sm:text-lg font-normal my-3",
                link: "my-3",
                blockquote:
                  "border-l-4 border-green-600 bg-green-100 rounded-md text-black italic font-medium pl-4 py-1 my-3 mx-0",
                "list[ordered=false]": "list-disc my-3 list-inside",
                "list[ordered=true]": "list-decimal my-3 list-inside pl-0",
                table: "table-auto border-4 border-collapse my-3",
                tableCell: "border p-2",
                break: "my-3",
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-137864394-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    {
                      image_link:
                        site.siteMetadata.siteUrl +
                        edge.node.frontmatter.banner.childImageSharp.fixed.src,
                    },
                  ],
                });
              });
            },
            query: `
              {
                allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
                  edges {
                    node {
                      fields {
                        slug
                      }
                      frontmatter {
                        date
                        title
                        description
                        banner {
                          childImageSharp {
                            fixed(width: 1200, height: 630) {
                              src
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Akhila Ariyachandra's Blog RSS`,
          },
        ],
      },
    },
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
    `gatsby-plugin-emotion`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
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
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://akhilaariyachandra.com`,
        stripQueryString: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
