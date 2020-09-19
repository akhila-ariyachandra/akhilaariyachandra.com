import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Link } from "gatsby";

const BlogPost = ({ node, pos }) => {
  return (
    <article
      className={`col-span-1 ${
        pos === 0 || pos >= 3 ? "sm:col-span-2" : "sm:col-span-1"
      }`}
    >
      <header>
        {pos <= 2 ? (
          <Img
            fluid={node.frontmatter.banner.childImageSharp.fluid}
            alt={`${node.frontmatter.title} Banner`}
            className="block mx-auto rounded-lg mb-4"
            style={{ maxWidth: 1200 }}
            imgStyle={{ maxWidth: 1200 }}
          />
        ) : null}

        <Link to={node.fields.slug}>
          <h3 className="text-2xl sm:text-3xl font-semibold">
            {node.frontmatter.title}
          </h3>
        </Link>
      </header>

      <section>
        <span className="flex items-center text-base sm:text-lg font-normal my-1 justify-between">
          <p>{node.frontmatter.date}</p>

          <p>{`${node.timeToRead} min read`}</p>
        </span>

        {node.frontmatter.updated ? (
          <p className="text-base sm:text-lg font-normal my-1">{`Last updated on ${node.frontmatter.updated}`}</p>
        ) : null}

        <p className="text-xl sm:text-2xl font-normal">
          {node.frontmatter.description}
        </p>
      </section>
    </article>
  );
};

BlogPost.propTypes = {
  node: PropTypes.object.isRequired,
  pos: PropTypes.number,
};

export default BlogPost;
