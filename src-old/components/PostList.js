import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";
import { formatTags } from "../utils/helpers";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => {
        const title = post.title || post.slug;
        return (
          <article key={post.slug} style={{ margin: `${rhythm(2)} 0` }}>
            <header style={{ marginBottom: rhythm(0.75) }}>
              <Link to={`/${post.slug}`}>
                <h3>{title}</h3>
              </Link>

              <div style={{ display: "flex" }}>
                <small style={{ flex: 1 }}>{post.date}</small>

                <small>{`${post.content.childMarkdownRemark.timeToRead} min read`}</small>
              </div>

              <small>{formatTags(post.tags)}</small>
            </header>

            <section>
              <p>{post.description}</p>
            </section>
          </article>
        );
      })}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
