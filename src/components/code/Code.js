import Title from "src/components/code/Title";
import SyntaxHighlight from "src/components/code/SyntaxHighlight";
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
