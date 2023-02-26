import clsx from "classnames";
import type { FC, ReactNode } from "react";
import { FaExclamationCircle, FaLightbulb, FaStickyNote } from "react-icons/fa";

import styles from "./SpecialBlock.module.scss";

interface SpecialBlockProps {
  type?: "warn" | "info";
  children: ReactNode;
}

const SpecialBlock: FC<SpecialBlockProps> = ({ type, children }) => {
  let wrapperClass =
    "text-sm sm:text-base my-4 mx-auto p-4 border-2 rounded-md flex items-start w-full max-w-xl ";
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
      wrapperClass = wrapperClass + "border-emerald-600";
      iconClass = iconClass + "text-emerald-600";
      Icon = FaStickyNote;
  }

  return (
    <div className={clsx(styles.wrapper, wrapperClass)}>
      <Icon className={iconClass} />

      <div className="ml-2 flex-1 font-sora text-sm text-zinc-800 dark:text-zinc-200 sm:text-base">
        {children}
      </div>
    </div>
  );
};

export default SpecialBlock;
