import React from "react";
import PropTypes from "prop-types";
import { FaExclamationCircle, FaLightbulb, FaStickyNote } from "react-icons/fa";

const SpecialBlock = ({ children, type }) => {
  let wrapperClass =
    "text-base sm:text-lg my-3 p-4 border-l-4 flex items-start ";
  let iconClass = "text-2xl sm:text-3xl ";
  let Icon = null;

  switch (type) {
    case "warn":
      wrapperClass = wrapperClass + "border-red-600";
      iconClass = iconClass + "text-red-600";
      Icon = FaExclamationCircle;
      break;
    case "info":
      wrapperClass = wrapperClass + "border-yellow-600";
      iconClass = iconClass + "text-yellow-600";
      Icon = FaLightbulb;
      break;
    default:
      wrapperClass = wrapperClass + "border-green-600";
      iconClass = iconClass + "text-green-600";
      Icon = FaStickyNote;
  }

  return (
    <div className={wrapperClass}>
      <Icon className={iconClass} />

      <div className="text-base sm:text-lg flex-1 ml-2 sm:ml-4">{children}</div>
    </div>
  );
};

SpecialBlock.propTypes = {
  type: PropTypes.oneOf(["warn", "info"]),
};

export default SpecialBlock;
