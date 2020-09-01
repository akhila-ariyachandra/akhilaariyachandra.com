import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const ListContainer = ({ title, children, subTitle, subTitleLink }) => {
  return (
    <div className="space-y-8">
      {title ? (
        <header>
          <div className="flex flex-row items-center justify-between">
            <span className="text-xl sm:text-2xl font-medium">{title}</span>

            {subTitle && subTitleLink ? (
              <Link
                to={subTitleLink}
                className="text-lg sm:text-xl font-medium"
              >
                {subTitle}
              </Link>
            ) : null}
          </div>

          <hr className="border-gray-400 border bg-gray-400 mt-4" />
        </header>
      ) : null}

      {children}
    </div>
  );
};

ListContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  subTitleLink: PropTypes.string,
};

export default ListContainer;
