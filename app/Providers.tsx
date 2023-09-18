"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode, useState } from "react";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";

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
    <QueryClientProvider client={queryClient}>
      <WrapBalancerProvider>{children}</WrapBalancerProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
