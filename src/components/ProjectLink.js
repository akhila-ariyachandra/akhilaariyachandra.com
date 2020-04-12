import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const ProjectLink = ({ project }) => {
  return (
    <article className="p-3 rounded-md shadow-md bg-white transition duration-500 transform hover:scale-105 hover:shadow-xl">
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
