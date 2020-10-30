import Title from "src/components/code/Title";
import theme from "prism-react-renderer/themes/nightOwl";
import rangeParser from "parse-numeric-range";
import Highlight, { defaultProps } from "prism-react-renderer";

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

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (i) => lineNumbers.includes(i + 1);
  } else {
    return () => false;
  }
};

const SyntaxHighlight = ({ children }) => {
  const className = children.props.className || "";
  const [language, { title = `` }] = getParams(className);
  const ifTitle = (title || language) && { marginTop: `0px` };
  const metastring = children.props.metastring || "";
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="next-highlight my-4">
          <Title className="code-title" text={title}>
            {language}
          </Title>
          <pre className={className} style={{ ...style, ...ifTitle }}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

const Code = (props) => <SyntaxHighlight {...props} />;

export default Code;
