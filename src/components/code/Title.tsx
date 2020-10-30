import { FunctionComponent } from "react";

type Props = {
  text: string;
};

const Title: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className="flex justify-between items-center bg-green-300 px-5 py-3 rounded-t-lg">
      <style jsx>{`
        p {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
      `}</style>

      <p className="text-black font-bold">{text}</p>

      {children ? (
        <div className="text-white text-base sm:text-lg bg-green-700 px-2 py-1 rounded">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Title;
