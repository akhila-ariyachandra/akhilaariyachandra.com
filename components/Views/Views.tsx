import ViewsFetcher from "./ViewsFetcher";

type ViewsProps = {
  slug: string;
};

const Views = ({ slug }: ViewsProps) => {
  return (
    <span>
      <ViewsFetcher slug={slug} />
      {" views"}
    </span>
  );
};

export default Views;
