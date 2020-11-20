import { FunctionComponent, Fragment } from "react";
import { FaCog } from "react-icons/fa";

import styles from "src/components/code/Loading.module.scss";

type Props = {
  noOfLines?: number;
};

const Loading: FunctionComponent<Props> = ({ noOfLines = 1 }) => {
  return (
    <Fragment>
      <style jsx>{`
        div {
          height: ${noOfLines * 1.74}em;
        }
      `}</style>

      <div className={styles.loadingContainer}>
        <FaCog className="text-white animate-spin" />
      </div>
    </Fragment>
  );
};

export default Loading;
