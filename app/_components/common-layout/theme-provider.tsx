"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

const ThemeProvider = ({
  children,
  scriptProps,
  ...props
}: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      {...props}
      // React 19 warns about <script> in client components; keep JS on the
      // server (FOUC prevention) and switch to a non-executable type on the client.
      // https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
      scriptProps={{
        ...scriptProps,
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
      }}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
