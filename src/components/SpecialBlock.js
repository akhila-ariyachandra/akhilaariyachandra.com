import React from "react";
import PropTypes from "prop-types";
import { FaExclamationCircle, FaLightbulb } from "react-icons/fa";

const SpecialBlock = ({ children, type }) => {
  let wrapperClass =
    "text-base sm:text-lg my-3 p-4 rounded-md border-l-4 flex items-start ";
  let iconClass = "text-2xl sm:text-3xl ";
  let Icon = null;

  switch (type) {
    case "warn":
      wrapperClass = wrapperClass + "bg-red-200 border-red-600";
      iconClass = iconClass + "text-red-600";
      Icon = FaExclamationCircle;
      break;
    case "info":
      wrapperClass = wrapperClass + "bg-yellow-200 border-yellow-600";
      iconClass = iconClass + "text-yellow-600";
      Icon = FaLightbulb;
      break;
  }

  return (
    <div className={wrapperClass}>
      <Icon className={iconClass} />

      <div className="text-black text-base sm:text-lg flex-1 ml-2 sm:ml-4">
        {children}
      </div>
    </div>
  );
};

SpecialBlock.propTypes = {
  type: PropTypes.oneOf(["warn", "info"]).isRequired,
};

export default SpecialBlock;
