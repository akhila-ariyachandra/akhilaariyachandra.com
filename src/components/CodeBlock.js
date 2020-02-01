import React from "react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark"
import shell from "react-syntax-highlighter/dist/cjs/languages/prism/bash"
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json"
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import PropTypes from "prop-types"

SyntaxHighlighter.registerLanguage("shell", shell)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("scss", scss)
SyntaxHighlighter.registerLanguage("typescript", typescript)

const CodeBlock = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  )
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
}

CodeBlock.defaultProps = {
  language: null,
}

export default CodeBlock
