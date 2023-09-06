"use client";

import type { ReactNode } from "react";
import { Provider } from "react-wrap-balancer";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <Provider>{children}</Provider>;
};

export default Providers;
