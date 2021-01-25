import useSWR from "swr";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import type { NextPage } from "next";
import { useSpring, animated } from "react-spring";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Stats: NextPage = () => {
  const totalViews = useSWR("/api/stat/total-views", fetcher, {
    initialData: 0,
    revalidateOnMount: true,
  });
  const totalReactions = useSWR("/api/stat/total-reactions", fetcher, {
    initialData: 0,
    revalidateOnMount: true,
  });

  const totalViewsProps = useSpring({
    number: totalViews.data,
    from: { number: 0 },
  });
  const totalReactionsProps = useSpring({
    number: totalReactions.data,
    from: { number: 0 },
  });

  return (
    <Layout>
      <SEO title="Stats" />

      <h1 className="mx-4 my-10 text-black dark:text-white text-4xl font-bold">
        Stats
      </h1>

      <div className="grid gap-4 grid-cols-1 p-4 sm:grid-cols-2">
        <div className="p-2 bg-gray-400 bg-opacity-25 rounded-md">
          <h2 className="text-black dark:text-white text-3xl font-medium">
            Total Views
          </h2>

          <animated.span className="text-black dark:text-white text-2xl font-normal">
            {totalViewsProps.number.interpolate((val: number) =>
              Math.floor(val)
            )}
          </animated.span>
        </div>

        <div className="p-2 bg-gray-400 bg-opacity-25 rounded-md">
          <h2 className="text-black dark:text-white text-3xl font-medium">
            Total Reactions
          </h2>

          <animated.span className="text-black dark:text-white text-2xl font-normal">
            {totalReactionsProps.number.interpolate((val: number) =>
              Math.floor(val)
            )}
          </animated.span>
        </div>
      </div>
    </Layout>
  );
};

export default Stats;
