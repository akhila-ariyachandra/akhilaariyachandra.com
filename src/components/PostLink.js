import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const PostLink = ({ node }) => {
  const title = node.frontmatter.title;

  return (
    <article className="p-3 rounded-md shadow-md transition duration-500 transform hover:text-white hover:antialiased hover:scale-105 hover:shadow-xl hover:bg-green-700">
      <header>
        <h3 className="text-2xl font-semibold">
          <Link to={node.fields.slug}>{title}</Link>
        </h3>

        <div className="flex items-center">
          <small className="flex-1 text-base">{node.frontmatter.date}</small>

          <small className="text-base">{`${node.timeToRead} min read`}</small>
        </div>
      </header>

      <section>
        <p className="text-lg font-medium">{node.frontmatter.description}</p>
      </section>
    </article>
  );
};

PostLink.propTypes = {
  node: PropTypes.object.isRequired,
};

export default PostLink;
