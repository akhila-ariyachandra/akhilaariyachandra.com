import type { FunctionComponent } from "react";

import styles from "src/components/code/Title.module.scss";

type Props = {
  text: string;
};

const Title: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className="flex justify-between items-center bg-green-300 px-5 py-3">
      <p className={styles.codeBlockTitle}>{text}</p>

      {children ? (
        <div className="text-white text-base sm:text-lg bg-green-700 px-2 py-1 rounded">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Title;
