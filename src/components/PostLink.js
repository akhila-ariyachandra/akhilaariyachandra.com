import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PostLink = ({ node }) => {
  const title = node.frontmatter.title;

  return (
    <Link to={node.fields.slug}>
      <article
        className="rounded-md transition duration-500 transform hover:scale-105 p-3 grid grid-cols-1 gap-1"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <h3 className="text-2xl font-semibold">{title}</h3>

        <div className="flex items-center">
          <small className="flex-1 text-base">{node.frontmatter.date}</small>

          <small className="text-base">{`${node.timeToRead} min read`}</small>
        </div>

        <p className="text-lg font-medium">{node.frontmatter.description}</p>
      </article>
    </Link>
  );
};

PostLink.propTypes = {
  node: PropTypes.object.isRequired,
};

export default PostLink;
