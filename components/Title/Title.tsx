import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="my-4 font-display text-2xl font-bold text-zinc-800 sm:my-5 sm:text-3xl">
      <Balancer>{children}</Balancer>
    </h1>
  );
};

export default Title;
