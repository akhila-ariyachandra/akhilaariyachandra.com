import Title from "@/components/mdx/Code/Title";
import SyntaxHighlight from "@/components/mdx/Code/SyntaxHighlight";

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
    <div
      className="rounded-md overflow-hidden my-5"
      style={{ backgroundColor: "rgb(1, 22, 39)" }}
    >
      <Title text={title}>{language}</Title>

      <SyntaxHighlight title={title} language={language}>
        {children}
      </SyntaxHighlight>
    </div>
  );
};

export default Code;
