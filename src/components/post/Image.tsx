import { FunctionComponent } from "react";

type Props = {
  path: string;
  title: string;
};

const Image: FunctionComponent<Props> = ({ path, title }) => {
  return (
    <img
      src={require(`../../content/images${path}?webp"`)}
      alt={title}
      title={title}
      className="rounded sm:rounded-md"
    />
  );
};

export default Image;
