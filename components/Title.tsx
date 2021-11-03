import React from "react";

type Props = {
  title: string;
};

const Title: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <h1 className="my-10 dark:text-gray-200 text-gray-800 font-sora text-4xl font-bold">
      {title}
    </h1>
  );
};

export default Title;
