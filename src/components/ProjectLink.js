import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const ProjectLink = ({ project }) => {
  return (
    <article className="p-3 rounded-md shadow-md">
      <h3 className="text-2xl font-semibold">
        <OutboundLink
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.title}
        </OutboundLink>
      </h3>

      <p className="text-base">{project.description}</p>
    </article>
  );
};

ProjectLink.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectLink;
