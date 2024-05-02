"use client"; // Error components must be Client Components

import Title from "@/_components/title";
import { useEffect } from "react";

const ErrorPage = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Title>Error</Title>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
        Something went wrong. Maybe try refreshing the page?
      </p>
    </div>
  );
};

export default ErrorPage;
