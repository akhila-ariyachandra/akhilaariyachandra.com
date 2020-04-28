import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const BlogPost = ({ node }) => {
  return (
    <article>
      <header>
        <Link to={node.fields.slug}>
          <h2 className="text-xl sm:text-3xl font-semibold">
            {node.frontmatter.title}
          </h2>
        </Link>
      </header>

      <section>
        <span className="flex items-center text-base sm:text-xl font-normal my-1">
          <small className="flex-1">{node.frontmatter.date}</small>

          <small>{`${node.timeToRead} min read`}</small>
        </span>

        <p className="text-lg sm:text-2xl font-normal">
          {node.frontmatter.description}
        </p>
      </section>
    </article>
  );
};

BlogPost.propTypes = {
  node: PropTypes.object.isRequired,
};

export default BlogPost;
