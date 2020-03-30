import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";

const PostLink = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug;
  return (
    <article key={node.fields.slug}>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
            {title}
          </Link>
        </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <small style={{ flex: 1 }}>{node.frontmatter.date}</small>
          <small>{`${node.timeToRead} min read`}</small>
        </div>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </section>
    </article>
  );
};

PostLink.propTypes = {
  node: PropTypes.object.isRequired,
};

export default PostLink;
