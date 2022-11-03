import ProgressBar from "@badrap/bar-of-progress";
import Layout from "@/components/Layout";
import Fonts from "@/components/Fonts";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/global.scss";

const progress = new ProgressBar({
  size: 2,
  color: "#10b981",
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="dark"
        themes={["light", "dark"]}
        attribute="class"
        enableSystem={false}
      >
        <Layout>
          <Component {...pageProps} />

          <Analytics />

          <Fonts />
        </Layout>
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
