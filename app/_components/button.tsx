import { cva, type VariantProps } from "@/_lib/cva.config";
import { cn } from "cn";
import { type ComponentProps } from "react";

export const buttonVariants = cva({
  base: "neobrutalism-container flex cursor-pointer items-center gap-2 bg-green-300 text-base/none font-semibold transition duration-200 ease-out hover:translate-1 hover:shadow-none sm:text-lg/none dark:bg-green-900",
  variants: {
    size: {
      default: "px-2 py-1 sm:px-3 sm:py-2",
      small: "px-0.5 py-0.5 sm:px-1.5 sm:py-1",
      icon: "p-1 text-lg/none sm:p-2 sm:text-xl/none",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const Button = ({
  type = "button",
  className,
  size = "default",
  ...delegated
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ size }), className)}
      {...delegated}
    />
  );
};
