require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const gatsbyRemarkClasses = {
  "heading[depth=1]": "text-5xl font-bold my-3",
  "heading[depth=2]": "text-4xl font-bold my-3",
  "heading[depth=3]": "text-3xl font-semibold my-3",
  "heading[depth=4]": "text-2xl font-semibold my-3",
  "heading[depth=5]": "text-xl font-medium my-3",
  "heading[depth=6]": "text-lg font-medium my-3",
  paragraph: "text-lg font-normal my-3",
  link: "italic underline text-green-800 my-3",
  blockquote:
    "border-l-4 border-green-600 bg-green-100 rounded-md italic font-medium pl-4 py-1 my-3 mx-0",
  "list[ordered=false]": "list-disc my-3 list-inside",
  "list[ordered=true]": "list-decimal my-3 list-inside pl-0",
  table: "table-auto border-4 border-collapse my-3",
  tableCell: "border p-2",
  break: "my-3",
};

const getClasses = (object) => {
  const classes = [];

  for (const property in object) {
    classes.push(...object[property].split(" "));
  }

  return Array.from(new Set(classes));
};

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
        name: `TailwindCSS`,
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
        name: `ZEIT`,
        background: `#000000`,
        text: `#ffffff`,
        link: `https://zeit.co/home`,
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
    `gatsby-plugin-typescript`,
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
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: gatsbyRemarkClasses,
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
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
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
                allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        tailwind: true, // Enable tailwindcss support
        whitelist: [...getClasses(gatsbyRemarkClasses)],
        ignore: [`prismjs/themes/prism-okaidia.css`],
      },
    },
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
