import dynamic from "next/dynamic";
import Title from "src/components/code/Title";
import LazyLoad from "react-lazyload";
import Loading from "src/components/code/Loading";
const SyntaxHighlight = dynamic(
  () => import("src/components/code/SyntaxHighlight"),
  { ssr: false }
);

import styles from "src/components/code/Code.module.scss";

const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`);
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {})
  );
};

const Code = ({ children }) => {
  const className = children.props.className || "";
  const [language, { title = `` }] = getParams(className);
  const noOfLines = children.props.children.trim().split(/\r\n|\r|\n/).length;

  return (
    <div className={styles.codeBlock}>
      <Title text={title}>{language}</Title>

      <LazyLoad
        height={`${noOfLines * 1.74 + 2 * 0.984}em`}
        placeholder={<Loading noOfLines={noOfLines} />}
        once
        offset={100}
      >
        <SyntaxHighlight title={title} language={language}>
          {children}
        </SyntaxHighlight>
      </LazyLoad>
    </div>
  );
};

export default Code;
