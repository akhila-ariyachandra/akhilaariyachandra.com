import React from "react";
import PropTypes from "prop-types";
import StyledOutboundLink from "./StyledOutboundLink";
import styled from "styled-components";
import { rhythm } from "../utils/typography";

const StyledArticle = styled.article`
  margin: ${rhythm(1)} 0;
`;

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
