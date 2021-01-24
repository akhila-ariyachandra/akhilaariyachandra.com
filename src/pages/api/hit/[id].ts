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
      message: "Article id not provided",
    });
  }

  // Check if document exists in Cloud Firestore
  const hitRef = db.collection("hits").doc(id);
  let hit = await hitRef.get();

  if (!hit.exists) {
    // Check if values is present in Fauna
    const faunaDocument: any = await client.query(
      q.Get(q.Match(q.Index("hits_by_slug"), slug))
    );

    await hitRef.set({
      count: faunaDocument ? faunaDocument.data.hits : 0,
    });
  }

  if (req.method === "POST") {
    // Don't increment in development and preview environments
    const host = new URL(config.siteUrl);
    if (host.hostname === req.headers.host) {
      await hitRef.update({
        count: admin.firestore.FieldValue.increment(1),
      });
    }
  }

  hit = await hitRef.get();

  return res.status(200).send(hit.data().count);
};

export default RegisterHit;
