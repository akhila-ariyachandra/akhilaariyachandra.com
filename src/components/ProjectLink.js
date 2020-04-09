import React from "react";
import PropTypes from "prop-types";
import StyledOutboundLink from "./StyledOutboundLink";
import styled from "styled-components";

const StyledArticle = styled.article``;

const ProjectLink = ({ project }) => {
  return (
    <StyledArticle>
      <h3>
        <StyledOutboundLink
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.title}
        </StyledOutboundLink>
      </h3>

      <p>{project.description}</p>
    </StyledArticle>
  );
};

ProjectLink.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectLink;
