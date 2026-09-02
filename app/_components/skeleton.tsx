import { cn } from "cn";
import type { ComponentProps } from "react";

const Skeleton = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-900",
        className,
      )}
      {...props}
    />
  );
};

export default Skeleton;
