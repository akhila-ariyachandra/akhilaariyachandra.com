import faunadb from "faunadb";
import Layout from "src/components/Layout";
import SEO from "src/components/SEO";
import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import { getSortedPostsData } from "src/lib/posts";

type Props = {
  postViews: [
    {
      title: string;
      slug: string;
      hits: number;
    }
  ];
};

const Views: NextPage<Props> = ({ postViews }) => {
  return (
    <Layout>
      <SEO title="Views" skipIndex />

      <div className="p-4">
        <h1 className="text-3xl sm:text-4xl font-bold my-10">
          Blog Post Views
        </h1>

        {postViews.map((postView, index) => (
          <div key={postView.slug}>
            <div className="my-4 space-x-4 flex justify-between items-center">
              <Link href={postView.slug}>
                <a className="text-lg sm:text-xl font-semibold">
                  {postView.title}
                </a>
              </Link>

              <p className="text-base sm:text-lg font-medium">
                {postView.hits}
              </p>
            </div>

            {index !== postViews.length - 1 ? <hr /> : null}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Views;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();

  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });

  const postViews = [];

  for (const post of allPostsData) {
    const document: any = await client.query(
      q.Get(q.Match(q.Index("hits_by_slug"), `/${post.id}`))
    );

    postViews.push({
      title: post.title,
      slug: `/${post.id}`,
      hits: document.data.hits,
    });
  }

  return {
    props: { postViews },
    revalidate: 1,
  };
};
