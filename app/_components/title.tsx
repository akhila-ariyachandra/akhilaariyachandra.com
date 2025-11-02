import { type ReactNode, ViewTransition } from "react";

const TitleBase = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="font-display mb-2 text-2xl font-bold tracking-tighter text-pretty text-zinc-800 sm:mb-3 sm:text-3xl dark:text-zinc-200">
      {children}
    </h1>
  );
};

const Title = ({
  children,
  transitionName,
}: {
  children: ReactNode;
  transitionName?: string;
}) => {
  if (!transitionName) {
    return <TitleBase>{children}</TitleBase>;
  }

  return (
    <ViewTransition name={transitionName}>
      <TitleBase>{children}</TitleBase>
    </ViewTransition>
  );
};

export default Title;
