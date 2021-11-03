import type { FunctionComponent } from "react";
import { FaExclamationCircle, FaLightbulb, FaStickyNote } from "react-icons/fa";

type Props = {
  type?: "warn" | "info";
};

const SpecialBlock: FunctionComponent<Props> = ({ children, type }) => {
  let wrapperClass =
    "text-base my-4 mx-auto p-4 border-2 rounded-md flex items-start w-full max-w-xl ";
  let iconClass = "text-2xl ";
  let Icon = null;

  switch (type) {
    case "warn":
      wrapperClass = wrapperClass + "border-red-600";
      iconClass = iconClass + "text-red-600";
      Icon = FaExclamationCircle;
      break;
    case "info":
      wrapperClass = wrapperClass + "border-yellow-400";
      iconClass = iconClass + "text-yellow-400";
      Icon = FaLightbulb;
      break;
    default:
      wrapperClass = wrapperClass + "border-green-600";
      iconClass = iconClass + "text-green-600";
      Icon = FaStickyNote;
  }

  return (
    <div className={wrapperClass}>
      <Icon className={iconClass} />

      <div className="flex-1 ml-2 dark:text-gray-200 text-gray-800 font-sora text-base">
        {children}
      </div>
    </div>
  );
};

export default SpecialBlock;
