/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  const result = await graphql(
    `
      {
        allContentfulBlogPost(sort: { order: DESC, fields: date }) {
          nodes {
            slug
            title
          }
          edges {
            previous {
              slug
              title
            }
            next {
              slug
              title
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulBlogPost.nodes;

  posts.forEach((post, index) => {
    createPage({
      path: post.slug,
      component: blogPost,
      context: {
        slug: post.slug,
        previous: result.data.allContentfulBlogPost.edges[index].previous,
        next: result.data.allContentfulBlogPost.edges[index].next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.__typename === `ContentfulBlogPost`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
