import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const TechnologyBlock = ({ technology }) => {
  return (
    <OutboundLink
      href={technology.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="p-2 rounded-md shadow-xl"
        style={{ backgroundColor: technology.background }}
      >
        <h3 className="text-xl font-medium" style={{ color: technology.text }}>
          {technology.name}
        </h3>
      </div>
    </OutboundLink>
  );
};

export default TechnologyBlock;
