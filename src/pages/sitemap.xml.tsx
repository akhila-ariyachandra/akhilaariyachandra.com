import Error from "next/error";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { NextPage, GetServerSideProps } from "next";

type Props = {
  error: boolean;
};

const Sitemap: NextPage<Props> = ({ error }) => {
  if (error) {
    return <Error statusCode={500} />;
  } else {
    return null;
  }
};

export default Sitemap;

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const { origin } = absoluteUrl(ctx.req);

    const response = await axios.get(`${origin}/api/sitemap`);

    ctx.res.setHeader("Content-Type", "application/xml");
    ctx.res.write(response.data);
    ctx.res.end();

    return { props: { error: false } };
  } catch (error) {
    console.error("> error: ", error);
    return { props: { error: true } };
  }
};
