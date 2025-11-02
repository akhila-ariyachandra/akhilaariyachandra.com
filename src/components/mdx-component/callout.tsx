import { cn } from "../../../lib/helpers";
import { type ReactNode } from "react";

const Callout = ({
  type = "default",
  children,
}: {
  type?: "default" | "info" | "warn";
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "not-prose my-4 border-l-4 p-3 sm:my-5 sm:p-4",
        {
          "border-zinc-600 dark:border-zinc-400": type === "default",
          "border-yellow-600 dark:border-yellow-400": type === "info",
          "border-red-600 dark:border-red-400": type === "warn",
        },
        "[&_a]:text-accent dark:[&_a]:text-accent-dark [&_a]:no-underline [&_a:hover]:underline",
        "[&_code]:font-display [&_code]:font-semibold before:[&_code]:content-['`'] after:[&_code]:content-['`']",
      )}
    >
      {children}
    </div>
  );
};

export default Callout;
