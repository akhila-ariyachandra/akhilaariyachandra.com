import { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { RoughNotationGroup, RoughNotation } from "react-rough-notation";

export const HighlightGroup: FC = ({ children }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
  }, []);

  return <RoughNotationGroup show={highlight}>{children}</RoughNotationGroup>;
};

export const Highlight: FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <RoughNotation
      type="highlight"
      animationDelay={200}
      color={theme === "dark" ? "rgb(6,78,59)" : "rgb(52,211,153)"}
    >
      {children}
    </RoughNotation>
  );
};
