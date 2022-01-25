import theme from "prism-react-renderer/themes/nightOwl";
import rangeParser from "parse-numeric-range";
import LazyLoad from "react-lazyload";
import Highlight, { defaultProps } from "prism-react-renderer";
import { FaCog } from "react-icons/fa";

import styles from "@/components/mdx/Code/SyntaxHighlight.module.css";

const LINE_HEIGHT = 1.7142857;

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

  const noOfLines = children.props.children.trim().split(/\r\n|\r|\n/).length;
  const placeholderHeight = `${noOfLines * LINE_HEIGHT + 2 * 0.8571429}em`;

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.props.children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={`${styles.nextHighlight} horizontalScroll`}>
          <LazyLoad
            height={placeholderHeight}
            once
            offset={200}
            throttle={1000}
            placeholder={
              <div
                style={{
                  height: placeholderHeight,
                }}
                className="grid place-items-center"
              >
                <FaCog className="animate-spin text-lg text-gray-100" />
              </div>
            }
          >
            <pre
              className={`${className} ${styles.prismCode} font-sora`}
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
                      <span
                        {...getTokenProps({ token, key })}
                        key={`code-line-${key}`}
                      />
                    ))}
                  </div>
                );
              })}
            </pre>
          </LazyLoad>
        </div>
      )}
    </Highlight>
  );
};

export default SyntaxHighlight;
