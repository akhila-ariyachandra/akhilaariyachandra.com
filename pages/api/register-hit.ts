import faunadb from "faunadb";
import config from "src/config";
import { NextApiRequest, NextApiResponse } from "next";
import { removeTrailingSlash } from "src/lib/helpers";

const RegisterHit = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });

  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(400).json({
      message: "Article slug not provided",
    });
  }

  // Check and see if the doc exists.
  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index("hits_by_slug"), removeTrailingSlash(slug)))
  );

  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection("hits"), {
        data: { slug: removeTrailingSlash(slug), hits: 0 },
      })
    );
  }

  // Fetch the document for-real
  const document: any = await client.query(
    q.Get(q.Match(q.Index("hits_by_slug"), removeTrailingSlash(slug)))
  );

  // Don't increment in development and preview environments
  const host = new URL(config.siteUrl);
  if (host.hostname === req.headers.host) {
    await client.query(
      q.Update(document.ref, {
        data: {
          hits: document.data.hits + 1,
        },
      })
    );
  }

  return res.status(200).json({
    hits: document.data.hits,
  });
};

export default RegisterHit;
