import React from "react";

type Props = {
  title: string;
};

const ListContainer: React.FunctionComponent<Props> = ({ title, children }) => {
  return (
    <React.Fragment>
      <h1 className="mx-4 my-10 dark:text-gray-200 text-gray-800 text-4xl font-bold">
        {title}
      </h1>

      <section className="grid gap-4 grid-cols-1 mx-4">{children}</section>
    </React.Fragment>
  );
};

export default ListContainer;
