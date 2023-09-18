"use client";

import { type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ViewsErrorBoundaryProps = {
  children: ReactNode;
};

const ViewsErrorBoundary = ({ children }: ViewsErrorBoundaryProps) => {
  return (
    <ErrorBoundary fallback={<span>Error fetching views</span>}>
      {children}
    </ErrorBoundary>
  );
};

export default ViewsErrorBoundary;
