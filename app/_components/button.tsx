import { cva, type VariantProps } from "@/_lib/cva.config";
import { cn } from "cn";
import { type ComponentProps } from "react";

export const buttonVariants = cva({
  base: "flex cursor-pointer items-center gap-2 neobrutalism-container bg-green-300 font-semibold ring-offset-white transition duration-200 ease-out hover:translate-1 hover:shadow-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-green-900 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    size: {
      default: "px-2 py-1 text-base/none sm:px-3 sm:py-2 sm:text-lg/none",
      small: "px-0.5 py-0.5 text-sm/none sm:px-1.5 sm:py-1 sm:text-base/none",
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
