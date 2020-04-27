import React from "react";
import { COLORS } from "../lib/colors";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    rawSetColorMode(initialColorValue);
  }, []);

  const setColorMode = (newValue) => {
    const root = window.document.documentElement;
    // 1. Update React color-mode state
    rawSetColorMode(newValue);
    // 2. Update localStorage
    localStorage.setItem("color-mode", newValue);
    // 3. Update each color
    root.style.setProperty(
      "--color-text",
      newValue === "light" ? COLORS.light.text : COLORS.dark.text
    );
    root.style.setProperty(
      "--color-background",
      newValue === "light" ? COLORS.light.background : COLORS.dark.background
    );
    root.style.setProperty(
      "--color-primary",
      newValue === "light" ? COLORS.light.primary : COLORS.dark.primary
    );
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
