import React from "react";
import Title from "@/components/Title";

type Props = {
  title: string;
};

const ListContainer: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <React.Fragment>
      <Title title={title} />

      <section className="grid gap-4 grid-cols-1 mx-4">{children}</section>
    </React.Fragment>
  );
};

export default ListContainer;
