import type { FunctionComponent } from "react";

type Props = {
  text: string;
};

const Title: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className="not-prose flex flex-row items-center justify-between bg-emerald-300 pl-5">
      <p className="min-w-0 truncate font-bold text-gray-800">{text}</p>

      {children ? (
        <div className="flex-shrink-0 bg-emerald-700 px-5 py-2 text-base text-gray-200">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Title;
