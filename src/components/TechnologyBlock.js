import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const TechnologyBlock = ({ technology }) => {
  return (
    <div
      className="p-2 rounded-md shadow-xl transition duration-500 transform hover:text-white hover:antialiased hover:scale-110 hover:shadow-2xl"
      style={{ backgroundColor: technology.background }}
    >
      <OutboundLink
        href={technology.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-xl font-medium" style={{ color: technology.text }}>
          {technology.name}
        </h3>
      </OutboundLink>
    </div>
  );
};

export default TechnologyBlock;
