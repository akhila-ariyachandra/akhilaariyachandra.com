"use client";

import { type ReactNode, type FC, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="dark"
        themes={["light", "dark"]}
        attribute="class"
        enableSystem={false}
      >
        {children}
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
