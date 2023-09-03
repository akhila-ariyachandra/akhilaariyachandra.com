import type { ReactNode } from "react";

interface SpecialBlockProps {
  type?: "warn" | "info";
  children: ReactNode;
}

const SpecialBlock = ({ type, children }: SpecialBlockProps) => {
  return (
    <div className="not-prose">
      <div>{type}</div>

      <div>{children}</div>
    </div>
  );
};

export default SpecialBlock;
