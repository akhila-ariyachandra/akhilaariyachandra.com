import { cn } from "@/_utils/helpers";
import { type ComponentProps } from "react";

const Skeleton = ({ className, ...delegated }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(210_40%_96.1%)] dark:bg-[hsl(223_47%_11%)]",
        className,
      )}
      {...delegated}
    />
  );
};

export default Skeleton;
