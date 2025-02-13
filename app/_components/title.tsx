import type { CSSProperties, ReactNode } from "react";

type TitleProps = {
  style?: CSSProperties;
  children: ReactNode;
};

const Title = ({ style, children }: TitleProps) => {
  return (
    <h1
      className="font-display mb-4 text-2xl font-bold tracking-tighter text-pretty text-zinc-800 sm:mb-5 sm:text-3xl dark:text-zinc-200"
      style={style}
    >
      {children}
    </h1>
  );
};

export default Title;
