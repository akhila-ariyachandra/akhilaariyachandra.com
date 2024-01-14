import type { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="mb-4 font-display text-2xl font-bold tracking-tighter text-zinc-800 sm:mb-5 sm:text-3xl dark:text-zinc-200">
      <Balancer>{children}</Balancer>
    </h1>
  );
};

export default Title;
