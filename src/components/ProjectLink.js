import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const ProjectLink = ({ project }) => {
  return (
    <article
      className="rounded-md transition duration-500 transform hover:scale-105 p-3 grid grid-cols-1 gap-1"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      <OutboundLink
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-2xl font-semibold">{project.title}</h3>

        <p className="text-base">{project.description}</p>
      </OutboundLink>
    </article>
  );
};

ProjectLink.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectLink;
