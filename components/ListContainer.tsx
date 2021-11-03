import React from "react";
import Title from "@/components/Title";

type Props = {
  title: string;
};

const ListContainer: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <React.Fragment>
      <Title title={title} />

      <section className="flex flex-col gap-6">{children}</section>
    </React.Fragment>
  );
};

export default ListContainer;
