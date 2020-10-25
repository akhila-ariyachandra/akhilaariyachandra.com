import vsDark from "prism-react-renderer/themes/vsDark";
import rangeParser from "parse-numeric-range";
import Highlight, { defaultProps } from "prism-react-renderer";

const calculateLinesToHighlight = (meta) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const CodeBlock = ({ children, className, metastring }) => {
  if (!className) {
    return <code>{children}</code>;
  }

  const language = className.replace(/language-/, "");
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({ line, key: index });
            if (shouldHighlightLine(index)) {
              lineProps.className = `${lineProps.className} highlight-line`;
            }
            return (
              <div key={index} {...lineProps}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
