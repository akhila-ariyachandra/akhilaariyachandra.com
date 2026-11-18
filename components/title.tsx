import { type ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="mb-4 text-2xl font-bold text-balance sm:mb-5 sm:text-3xl">
      {children}
    </h1>
  );
};

export default Title;
