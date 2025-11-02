import { ViewTransition, type ReactNode } from "react";

const SubtitleBase = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mb-4 text-lg font-medium text-pretty text-zinc-600 sm:mb-5 sm:text-xl dark:text-zinc-400">
      {children}
    </p>
  );
};

const Subtitle = ({
  children,
  transitionName,
}: {
  children: ReactNode;
  transitionName?: string;
}) => {
  if (!transitionName) {
    return <SubtitleBase>{children}</SubtitleBase>;
  }

  return (
    <ViewTransition name={transitionName}>
      <SubtitleBase>{children}</SubtitleBase>
    </ViewTransition>
  );
};

export default Subtitle;
