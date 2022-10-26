import ProgressBar from "@badrap/bar-of-progress";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/global.scss";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/roboto-slab/variable.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/variable.css";

const progress = new ProgressBar({
  size: 2,
  color: "#10b981",
  className: "bar-of-progress",
  delay: 100,
});

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState: ReturnType<typeof dehydrate>;
  };
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
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

            <Analytics />
          </Layout>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
