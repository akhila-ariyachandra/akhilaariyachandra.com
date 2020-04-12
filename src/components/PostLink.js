import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Link } from "gatsby";

const PostLink = ({ node }) => {
  const title = node.frontmatter.title;
  const banner = node.frontmatter.banner;

  return (
    <article className="rounded-md shadow-md bg-white transition duration-500 transform hover:scale-105 hover:shadow-xl overflow-hidden">
      <Link to={node.fields.slug}>
        <header>
          <Img
            fluid={banner.childImageSharp.fluid}
            alt={title}
            style={{ maxWidth: 600 }}
            imgStyle={{ maxWidth: 600 }}
          />
        </header>

        <section className="p-3 grid grid-cols-1 gap-1">
          <h3 className="text-2xl font-semibold">{title}</h3>

          <div className="flex items-center">
            <small className="flex-1 text-base">{node.frontmatter.date}</small>

            <small className="text-base">{`${node.timeToRead} min read`}</small>
          </div>

          <p className="text-lg font-medium">{node.frontmatter.description}</p>
        </section>
      </Link>
    </article>
  );
};

PostLink.propTypes = {
  node: PropTypes.object.isRequired,
};

export default PostLink;
