import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const WarningBlock = ({ children }) => {
  return (
    <div className="text-base sm:text-lg my-3 p-4 bg-red-200 rounded-md border-l-4 border-red-600 flex items-start">
      <FaExclamationCircle className="text-2xl sm:text-3xl text-red-600" />

      <p className="text-black text-base sm:text-lg flex-1 ml-2 sm:ml-4">
        {children}
      </p>
    </div>
  );
};

export default WarningBlock;
