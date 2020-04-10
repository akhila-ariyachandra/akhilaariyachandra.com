/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 100, maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <div className="flex items-center my-5">
      <Image
        fluid={data.avatar.childImageSharp.fluid}
        alt={author.name}
        className="mb-0"
        style={{ minWidth: 50, borderRadius: `100%` }}
        imgStyle={{ borderRadius: `50%` }}
      />
      <p className="mb-0 ml-5 text-lg font-normal">
        Written by <strong>{author.name}</strong>
        {author.summary}
      </p>
    </div>
  );
};

export default Bio;
