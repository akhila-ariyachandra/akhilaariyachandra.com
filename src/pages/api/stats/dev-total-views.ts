import axios from "axios";
import type { NextApiHandler } from "next";

const DEVTotalViews: NextApiHandler = async (req, res) => {
  const { data } = await axios.request({
    url: "https://dev.to/api/articles/me/published",
    headers: {
      "api-key": process.env.DEV_API_KEY,
    },
  });

  const totalViews = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.page_views_count,
    0
  );

  // Cache the response
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).send(totalViews);
};

export default DEVTotalViews;
