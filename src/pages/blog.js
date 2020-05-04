import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ListContainer from "../components/ListContainer";
import BlogPost from "../components/BlogPost";
import { graphql, useStaticQuery } from "gatsby";

const Blog = ({ location }) => {
  const { allMdx } = useStaticQuery(graphql`
    query BlogPageQuery {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              title
              description
              updated(formatString: "MMMM Do, YYYY")
            }
            timeToRead
          }
        }
      }
    }
  `);

  const posts = allMdx.edges;

  return (
    <Layout location={location}>
      <SEO
        title="Blog"
        description="A blog about Javascript, React and Web Development"
      />

      <ListContainer title="Blog">
        {posts.map(({ node }) => (
          <BlogPost key={node.id} node={node} />
        ))}
      </ListContainer>
    </Layout>
  );
};

export default Blog;
