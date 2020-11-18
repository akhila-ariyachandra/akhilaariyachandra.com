import theme from "prism-react-renderer/themes/nightOwl";
import rangeParser from "parse-numeric-range";
import Highlight, { defaultProps } from "prism-react-renderer";

import styles from "src/components/code/SyntaxHighlight.module.scss";

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

const SyntaxHighlight = ({ children, title, language }) => {
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
        <div className={styles.nextHighlight}>
          <pre
            className={`${className} ${styles.prismCode}`}
            style={{ ...style, ...ifTitle }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} ${styles.highlightLine}`;
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

export default SyntaxHighlight;
