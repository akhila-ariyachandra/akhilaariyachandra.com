import type { FunctionComponent } from "react";

type Props = {
  text: string;
};

const Title: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className="flex flex-row items-center justify-between pl-5 bg-emerald-300 not-prose">
      <p className="text-gray-800 font-bold min-w-0 truncate">{text}</p>

      {children ? (
        <div className="flex-shrink-0 px-5 py-2 text-gray-200 text-base bg-emerald-700">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Title;
