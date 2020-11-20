import ProgressBar from "@badrap/bar-of-progress";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { AppProps, NextWebVitalsMetric } from "next/app";
import { ThemeProvider } from "next-themes";
import * as gtag from "src/lib/gtag";

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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
};

export default MyApp;
