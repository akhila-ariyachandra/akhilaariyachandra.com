import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaExclamationCircle } from "react-icons/fa";

const DarkToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return (
      <button
        aria-label="Disabled dark mode toggle"
        onClick={() =>
          colorMode === "light" ? setColorMode("dark") : setColorMode("light")
        }
        className="text-xl sm:text-2xl invisible cursor-default focus:outline-none"
        disabled={true}
      >
        <FaExclamationCircle />
      </button>
    );
  }

  return (
    <button
      aria-label={
        colorMode === "light" ? "Enable dark mode" : "Enable light mode"
      }
      onClick={() =>
        colorMode === "light" ? setColorMode("dark") : setColorMode("light")
      }
      className="text-xl sm:text-2xl focus:outline-none"
    >
      {colorMode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default DarkToggle;
