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
      github: `https://github.com/akhila-ariyachandra`,
      dev: `https://dev.to/akhilaariyachandra`,
      linkedin: `https://www.linkedin.com/in/akhila-ariyachandra/`,
      twitter: `https://twitter.com/heshan_1010`,
    },
    projects: [
      {
        title: `Sri Lanka COVID-19 Tracker`,
        url: `https://sri-lanka-covid-19.now.sh/`,
        description: `COVID-19 Tracker for Sri Lanka`,
      },
      /* {
        title: `Blogger`,
        url: `https://github.com/akhila-ariyachandra/blogger`,
        description: `A simple blogging site`,
      }, */
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
                "heading[depth=1]": "text-4xl sm:text-5xl font-bold my-3",
                "heading[depth=2]": "text-3xl sm:text-4xl font-bold my-3",
                "heading[depth=3]": "text-2xl sm:text-3xl font-semibold my-3",
                "heading[depth=4]": "text-xl sm:text-2xl font-semibold my-3",
                "heading[depth=5]": "text-lg sm:text-xl font-medium my-3",
                "heading[depth=6]": "text-base sm:text-lg font-medium my-3",
                paragraph: "text-base sm:text-lg font-normal my-3",
                link: "my-3",
                blockquote:
                  "border-l-4 border-green-600 font-normal text-base sm:text-lg px-4 py-1 my-3 mx-0",
                "list[ordered=false]":
                  "list-disc my-3 list-inside text-base sm:text-lg",
                "list[ordered=true]":
                  "list-decimal my-3 list-inside pl-0 text-base sm:text-lg",
                table: "table-auto border-4 border-collapse my-3",
                tableCell: "border p-2 text-base sm:text-lg",
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
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
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
        theme_color: `#38a169`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
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
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-zeit-now`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://akhilaariyachandra.com`,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-web-monetization`,
      options: {
        paymentPointer: process.env.GATSBY_ILP_PAYMENT_POINTER,
      },
    },
    /* {
      resolve: `gatsby-plugin-adsense`,
      options: {
        googleAdClientId: process.env.GATSBY_ADSENSE_CLIENT_ID,
      },
    } */,
    `gatsby-plugin-preact`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
