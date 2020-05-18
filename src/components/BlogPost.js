import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const BlogPost = ({ node }) => {
  return (
    <article>
      <header>
        <Link to={node.fields.slug}>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {node.frontmatter.title}
          </h2>
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
};

export default BlogPost;
