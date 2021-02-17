import type { FunctionComponent } from "react";

import styles from "@/components/code/Title.module.scss";

type Props = {
  text: string;
};

const Title: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-green-300">
      <p className={styles.codeBlockTitle}>{text}</p>

      {children ? (
        <div className="px-2 py-1 text-gray-200 text-base bg-green-700 rounded">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Title;
