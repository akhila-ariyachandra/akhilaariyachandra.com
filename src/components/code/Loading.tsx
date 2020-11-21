import { FunctionComponent } from "react";
import { FaCog } from "react-icons/fa";

type Props = {
  height: number | string;
};

const Loading: FunctionComponent<Props> = ({ height }) => {
  return (
    <div className="flex justify-center items-center" style={{ height }}>
      <FaCog className="text-white animate-spin" />
    </div>
  );
};

export default Loading;
