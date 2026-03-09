import { cn } from "@/_lib/helpers";
import { ViewTransition, type ComponentProps, type ReactNode } from "react";

const TitleBase = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "font-display mb-4 text-2xl font-bold tracking-tighter text-pretty text-zinc-800 sm:mb-5 sm:text-3xl dark:text-zinc-200",
        className,
      )}
    >
      {children}
    </h1>
  );
};

const Title = ({
  transitionName,
  ...delegated
}: {
  transitionName?: string;
} & ComponentProps<typeof TitleBase>) => {
  if (!transitionName) {
    return <TitleBase {...delegated} />;
  }

  return (
    <ViewTransition name={transitionName}>
      <TitleBase {...delegated} />
    </ViewTransition>
  );
};

export default Title;
