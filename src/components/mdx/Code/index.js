import dynamic from "next/dynamic";
import Title from "@/components/mdx/Code/Title";
const SyntaxHighlight = dynamic(
  () => import("@/components/mdx/Code/SyntaxHighlight"),
  {
    loading: () => (
      <div className="grid place-items-center h-12">
        <FaCog className="text-gray-100 text-lg animate-spin" />
      </div>
    ),
  }
);
import { FaCog } from "react-icons/fa";

import styles from "@/components/mdx/Code/Code.module.scss";

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

  return (
    <div className={styles.codeBlock}>
      <Title text={title}>{language}</Title>

      <SyntaxHighlight title={title} language={language}>
        {children}
      </SyntaxHighlight>
    </div>
  );
};

export default Code;
