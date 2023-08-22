"use client";

import dynamic from "next/dynamic";
import { type ReactNode, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import { SessionProvider } from "next-auth/react";

const Toaster = dynamic(() =>
  import("react-hot-toast").then((mod) => mod.Toaster)
);

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <ThemeProvider
            defaultTheme="dark"
            themes={["light", "dark"]}
            attribute="class"
            enableSystem={false}
          >
            <BalancerProvider>
              {children}

              <Toaster position="bottom-center" reverseOrder={false} />
            </BalancerProvider>
          </ThemeProvider>
        </ReactQueryStreamedHydration>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
