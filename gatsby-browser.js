import React from "react";
import { ThemeProvider } from "./src/context/ThemeContext";

import "./src/styles/site.css";
import "prismjs/themes/prism.css";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
