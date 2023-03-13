"use client";

import type { ReactNode, FC } from "react";
import { Hydrate, type DehydratedState } from "@tanstack/react-query";

interface HydrateWrapperProps {
  state: DehydratedState;
  children: ReactNode;
}

/**
 * A client component wrapper for the `Hydrate` component in `react-query`
 * so that it can be used in server components.
 * https://tanstack.com/query/v4/docs/react/reference/hydration
 */
const HydrateWrapper: FC<HydrateWrapperProps> = ({ state, children }) => {
  return <Hydrate state={state}>{children}</Hydrate>;
};

export default HydrateWrapper;
