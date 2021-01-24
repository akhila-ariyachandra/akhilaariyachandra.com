import faunadb from "faunadb";
import config from "src/config";
import admin from "src/lib/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

const RegisterHit = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
  const db = admin.firestore();

  const id = req.query.id as string;
  const slug = `/${id}`;

  if (!id) {
    return res.status(400).json({
      message: "Article slug not provided",
    });
  }

  const pageRef = db.collection("pages").doc(id);
  let page = await pageRef.get();

  // Create the document or add the hits values
  if (!page.exists || !page.data().hits) {
    // Check if value exists in Fauna
    const doesDocExist = await client.query(
      q.Exists(q.Match(q.Index("hits_by_slug"), slug))
    );

    if (!doesDocExist) {
      await pageRef.set(
        {
          hits: 0,
        },
        { merge: true }
      );
    } else {
      // Get current value from Fauna
      const document: any = await client.query(
        q.Get(q.Match(q.Index("hits_by_slug"), slug))
      );

      const hits = document.data.hits;

      await pageRef.set(
        {
          hits,
        },
        { merge: true }
      );
    }
  }

  if (req.method === "POST") {
    // Don't increment in development and preview environments
    const host = new URL(config.siteUrl);
    if (host.hostname === req.headers.host) {
      await pageRef.update({
        hits: admin.firestore.FieldValue.increment(1),
      });
    }
  }

  page = await pageRef.get();

  return res.status(200).send(page.data().hits);
};

export default RegisterHit;
