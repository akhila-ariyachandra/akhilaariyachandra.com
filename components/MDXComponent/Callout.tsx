import type { ReactNode } from "react";
import { cn } from "@/lib/helpers";
import { IoWarning, IoInformationCircle, IoPencil } from "react-icons/io5";

import styles from "./Callout.module.css";

type CalloutProps = {
  type?: "warn" | "info" | "default";
  children: ReactNode;
};

const Callout = ({ type = "default", children }: CalloutProps) => {
  return (
    <div
      className={cn(
        "not-prose my-4 flex flex-row items-center gap-3 rounded p-3 sm:my-5 sm:gap-4 sm:rounded-md sm:p-4", // Base styles
        styles.wrapper, // CSS Module
        type === "warn" && "bg-red-200", // Warning
        type === "info" && "bg-yellow-200", // Info
        type === "default" && "bg-zinc-200", // Default
      )}
    >
      <div
        className={cn(
          "shrink-0 text-xl sm:text-2xl", // Base styles
          type === "warn" && "text-red-600", // Warning
          type === "info" && "text-yellow-600", // Info
          type === "default" && "text-zinc-600", // Default // Info
        )}
      >
        {type === "warn" && <IoWarning />}
        {type === "info" && <IoInformationCircle />}
        {type === "default" && <IoPencil />}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Callout;
