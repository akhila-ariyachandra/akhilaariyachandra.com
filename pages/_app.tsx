import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "src/styles/index.scss";

const progress = new ProgressBar({
  size: 4,
  color: "var(--primary)",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
