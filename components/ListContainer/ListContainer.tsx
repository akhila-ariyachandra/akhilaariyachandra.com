import Title from "@/components/Title";
import type { ReactNode } from "react";

interface ListContainerProps {
  title: string;
  children: ReactNode;
}

const ListContainer = ({ title, children }: ListContainerProps) => {
  return (
    <>
      <Title title={title} />

      <section className="flex flex-col gap-6">{children}</section>
    </>
  );
};

export default ListContainer;
