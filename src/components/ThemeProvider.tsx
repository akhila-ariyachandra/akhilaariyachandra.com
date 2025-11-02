"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class">
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;