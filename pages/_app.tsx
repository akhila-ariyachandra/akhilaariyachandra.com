import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { UniqueIdProvider } from "@/context/UniqueIdContext";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import Layout from "@/components/Layout";

import "@fontsource/sora/400.css";
import "@fontsource/sora/variable.css";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/roboto-slab/variable.css";
import "tailwindcss/tailwind.css";
import "@/styles/global.scss";

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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      defaultTheme="dark"
      themes={["light", "dark"]}
      attribute="class"
      enableSystem={false}
    >
      <UniqueIdProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </UniqueIdProvider>
    </ThemeProvider>
  );
};

export default MyApp;
