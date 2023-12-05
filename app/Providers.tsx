"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";
import { PHProvider } from "./posthog";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
          },
        },
      }),
  );

  return (
    <PHProvider>
      <QueryClientProvider client={queryClient}>
        <WrapBalancerProvider>{children}</WrapBalancerProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </PHProvider>
  );
};

export default Providers;
