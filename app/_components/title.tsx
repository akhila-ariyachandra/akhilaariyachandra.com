import type { ReactNode } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";

const TitleBase = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="font-display mb-4 text-2xl font-bold tracking-tighter text-pretty text-zinc-800 sm:mb-5 sm:text-3xl dark:text-zinc-200">
      {children}
    </h1>
  );
};

const Title = ({
  children,
  viewTransitionName,
}: {
  children: ReactNode;
  viewTransitionName?: string;
}) => {
  if (!viewTransitionName) {
    return <TitleBase>{children}</TitleBase>;
  }

  return (
    <ViewTransition name={viewTransitionName}>
      <TitleBase>{children}</TitleBase>
    </ViewTransition>
  );
};

export default Title;
