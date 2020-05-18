import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const ProjectLink = ({ project }) => {
  return (
    <article>
      <OutboundLink
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold">{project.title}</h3>
      </OutboundLink>

      <p className="text-xl sm:text-2xl font-normal mt-1">
        {project.description}
      </p>
    </article>
  );
};

ProjectLink.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectLink;
