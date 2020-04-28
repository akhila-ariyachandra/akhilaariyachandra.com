import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";

import "./src/styles/site.css";
import "prism-themes/themes/prism-atom-dark.css";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
