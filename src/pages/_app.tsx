import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { UuidProvider } from "src/context/UuidContext";

import "src/styles/global.scss";

const progress = new ProgressBar({
  size: 4,
  color: "rgba(5, 150, 105, 1)",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      themes={["light", "dark"]}
      attribute="class"
    >
      <UuidProvider>
        <Toaster position="bottom-right" />

        <Component {...pageProps} />
      </UuidProvider>
    </ThemeProvider>
  );
};

export default MyApp;
