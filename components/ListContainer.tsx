import Title from "@/components/Title";
import type { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const ListContainer: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Title title={title} />

      <section className="flex flex-col gap-6">{children}</section>
    </>
  );
};

export default ListContainer;
