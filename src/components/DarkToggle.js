import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaExclamationCircle } from "react-icons/fa";

const DarkToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  return (
    <button
      aria-label="Dark Mode toggle"
      onClick={() =>
        colorMode === "light" ? setColorMode("dark") : setColorMode("light")
      }
      className="text-xl sm:text-2xl leading-5 sm:leading-6"
      disabled={!colorMode}
    >
      {!colorMode ? (
        <FaExclamationCircle className="text-gray-500" />
      ) : colorMode === "light" ? (
        <FaSun />
      ) : (
        <FaMoon />
      )}
    </button>
  );
};

export default DarkToggle;
