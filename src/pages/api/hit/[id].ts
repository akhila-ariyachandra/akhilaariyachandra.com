import faunadb from "faunadb";
import config from "src/config";
import type { NextApiRequest, NextApiResponse } from "next";

const RegisterHit = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });

  const {
    query: { id },
  } = req;
  const slug = `/${id}`;

  if (!slug) {
    return res.status(400).json({
      message: "Article slug not provided",
    });
  }

  // Check and see if the doc exists.
  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index("hits_by_slug"), slug))
  );

  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection("hits"), {
        data: { slug, hits: 0 },
      })
    );
  }

  // Fetch the document for-real
  const document: any = await client.query(
    q.Get(q.Match(q.Index("hits_by_slug"), slug))
  );

  if (req.method === "POST") {
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
  }

  return res.status(200).json({
    hits: document.data.hits,
  });
};

export default RegisterHit;
