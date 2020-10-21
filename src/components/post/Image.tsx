import { FunctionComponent } from "react";

type Props = {
  path: string;
  title: string;
};

const Image: FunctionComponent<Props> = ({ path, title }) => {
  const r = new RegExp("^(?:[a-z]+:)?//", "i");

  return (
    <img
      src={r.test(path) ? path : require(`../../content/images${path}?webp"`)}
      alt={title}
      title={title}
      className="rounded sm:rounded-md"
    />
  );
};

export default Image;
