import Title from "@/components/Title";
import type { FC, ReactNode } from "react";

interface ListContainerProps {
  title: string;
  children: ReactNode;
}

const ListContainer: FC<ListContainerProps> = ({ title, children }) => {
  return (
    <>
      <Title title={title} />

      <section className="flex flex-col gap-6">{children}</section>
    </>
  );
};

export default ListContainer;
