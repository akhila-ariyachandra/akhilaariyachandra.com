import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaExclamationCircle } from "react-icons/fa";

const DarkToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return (
      <button
        aria-label="Dark Mode toggle"
        onClick={() =>
          colorMode === "light" ? setColorMode("dark") : setColorMode("light")
        }
        className="text-xl sm:text-2xl invisible cursor-default"
        disabled={true}
      >
        <FaExclamationCircle />
      </button>
    );
  }

  return (
    <button
      aria-label="Dark Mode toggle"
      onClick={() =>
        colorMode === "light" ? setColorMode("dark") : setColorMode("light")
      }
      className="text-xl sm:text-2xl"
    >
      {colorMode === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkToggle;
