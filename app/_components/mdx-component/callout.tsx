import { compose, cva } from "@/_lib/cva.config";
import type { VariantProps } from "cva";
import { CircleAlert, Info, Pencil } from "lucide-react";
import type { ReactNode } from "react";

const root = cva({
  base: "not-prose my-4 flex flex-row items-center gap-3 rounded-sm p-3 sm:my-5 sm:gap-4 sm:rounded-md sm:p-4 callout",
  variants: {
    type: {
      default: "bg-zinc-200 dark:bg-zinc-800",
      info: "bg-yellow-200 dark:bg-yellow-800",
      warn: "bg-red-200 dark:bg-red-800",
    },
  },
  defaultVariants: {
    type: "default",
  },
});
const icon = cva({
  base: "shrink-0",
  variants: {
    type: {
      default: "text-zinc-600 dark:text-zinc-400",
      info: "text-yellow-600 dark:text-yellow-400",
      warn: "text-red-600 dark:text-red-400",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const callout = compose(root, icon);

type CalloutProps = {
  children: ReactNode;
} & VariantProps<typeof callout>;

const Callout = ({ type = "default", children }: CalloutProps) => {
  let Icon = Pencil;
  if (type === "warn") {
    Icon = CircleAlert;
  } else if (type === "info") {
    Icon = Info;
  }

  return (
    <div className={root({ type })}>
      <div className={icon({ type })}>
        <Icon className="size-5 sm:size-6" />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Callout;
