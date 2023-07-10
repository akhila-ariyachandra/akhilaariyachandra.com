interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <h1 className="my-10 font-display text-3xl font-bold text-zinc-800 dark:text-zinc-200 sm:text-4xl">
      {title}
    </h1>
  );
};

export default Title;
