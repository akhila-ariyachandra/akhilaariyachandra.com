"use client"; // Error components must be Client Components

import Title from "@/_components/title";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorPage = (props: {
  // eslint-disable-next-line @eslint-react/no-unused-props
  error: Error & { digest?: string };
  // eslint-disable-next-line @eslint-react/no-unused-props
  reset: () => void;
}) => {
  return (
    <div className="neobrutalism-container p-3 sm:p-4">
      <Title>Error</Title>

      <p className="text-base sm:text-lg">
        Something went wrong. Maybe try refreshing the page?
      </p>
    </div>
  );
};

export default ErrorPage;
