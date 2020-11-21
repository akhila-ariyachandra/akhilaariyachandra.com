import dynamic from "next/dynamic";
import useMedia from "use-media";
import Title from "src/components/code/Title";
import LazyLoad from "react-lazyload";
import Loading from "src/components/code/Loading";
const SyntaxHighlight = dynamic(() =>
  import("src/components/code/SyntaxHighlight")
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
  const isWide = useMedia({ minWidth: "640px" });

  const className = children.props.className || "";
  const [language, { title = `` }] = getParams(className);
  const noOfLines = children.props.children.trim().split(/\r\n|\r|\n/).length;
  const height = `calc(${noOfLines * (isWide ? 1.8 : 1.75)} + ${
    2 * (isWide ? 1.111 : 0.857)
  }em)`;

  return (
    <div className={styles.codeBlock}>
      <Title text={title}>{language}</Title>

      <LazyLoad
        style={{ height }}
        placeholder={<Loading noOfLines={noOfLines} height={height} />}
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
