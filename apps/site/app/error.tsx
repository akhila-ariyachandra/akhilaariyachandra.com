"use client"; // Error components must be Client Components

import Title from "@/_components/title";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorPage = (props: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <Title>Error</Title>

      <p className="text-sm text-zinc-700 sm:text-base dark:text-zinc-300">
        Something went wrong. Maybe try refreshing the page?
      </p>
    </div>
  );
};

export default ErrorPage;
