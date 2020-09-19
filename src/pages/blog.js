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
              banner {
                childImageSharp {
                  fluid(maxWidth: 1200, maxHeight: 600) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map(({ node }, index) => (
            <BlogPost key={node.id} node={node} pos={index} />
          ))}
        </div>
      </ListContainer>
    </Layout>
  );
};

export default Blog;
