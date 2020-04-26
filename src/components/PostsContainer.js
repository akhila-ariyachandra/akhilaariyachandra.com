import React from "react";
import PropTypes from "prop-types";
import BlogPost from "./BlogPost";

const PostsContainer = ({ title, posts }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {title ? (
        <React.Fragment>
          <h3 className="text-lg sm:text-2xl font-medium">{title}</h3>

          <hr className="border-gray-400 border bg-gray-400"/>
        </React.Fragment>
      ) : null}

      {posts.map(({ node }) => (
        <BlogPost key={node.id} node={node} />
      ))}
    </div>
  );
};

PostsContainer.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsContainer;
