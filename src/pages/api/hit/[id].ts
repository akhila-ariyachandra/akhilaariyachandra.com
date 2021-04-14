import config from "@/lib/config";
import admin from "@/lib/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

const RegisterHit = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = admin.firestore();

  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({
      message: "Article slug not provided",
    });
  }

  const pageRef = db.collection("pages").doc(id);
  let page = await pageRef.get();

  // Create the document or add the hits values
  if (!page.exists || !page.data().hits) {
    await pageRef.set(
      {
        hits: 0,
      },
      { merge: true }
    );
  }

  if (req.method === "POST") {
    // Update page documents with page title and slug
    const { title, slug } = req.body;
    await pageRef.update({
      title,
      slug,
    });

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
