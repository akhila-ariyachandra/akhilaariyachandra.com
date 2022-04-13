import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProgressBar from "@badrap/bar-of-progress";
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

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeComplete", progress.finish);
    router.events.on("routeChangeError", progress.finish);

    return () => {
      router.events.off("routeChangeStart", progress.start);
      router.events.off("routeChangeComplete", progress.finish);
      router.events.off("routeChangeError", progress.finish);
    };
  }, [router]);

  return (
    <ThemeProvider
      defaultTheme="dark"
      themes={["light", "dark"]}
      attribute="class"
      enableSystem={false}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
