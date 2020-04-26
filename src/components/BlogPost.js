import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const StyledWrapper = styled.div`
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 1.6em;
    margin: 0.5em 0;
  }

  p,
  span {
    font-family: "Roboto", sans-serif;
  }

  span {
    display: flex;

    small:first-child {
      flex: 1;
    }
  }
`;

const BlogPost = ({ node }) => {
  return (
    <StyledWrapper>
      <Link to={node.fields.slug}>
        <h2>{node.frontmatter.title}</h2>
      </Link>

      <span>
        <small>{node.frontmatter.date}</small>

        <small>{`${node.timeToRead} min read`}</small>
      </span>

      <p>{node.frontmatter.description}</p>
    </StyledWrapper>
  );
};

BlogPost.propTypes = {
  node: PropTypes.object.isRequired,
};

export default BlogPost;
