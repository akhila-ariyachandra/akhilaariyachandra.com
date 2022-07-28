import Layout from "@/components/Layout";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/global.scss";
import "@fontsource/roboto-slab/400.css";
import "@fontsource/roboto-slab/variable.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/variable.css";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

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
