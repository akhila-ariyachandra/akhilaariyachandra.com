import React from "react";
import PropTypes from "prop-types";

const ListContainer = ({ title, children }) => {
  return (
    <div className="space-y-8">
      {title ? (
        <header>
          <h3 className="text-xl sm:text-2xl font-medium">{title}</h3>

          <hr className="border-gray-400 border bg-gray-400 mt-4" />
        </header>
      ) : null}

      {children}
    </div>
  );
};

ListContainer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ListContainer;
