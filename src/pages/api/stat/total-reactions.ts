import admin from "src/lib/firebaseAdmin";
import type { NextApiHandler } from "next";

const TotalReactions: NextApiHandler = async (req, res) => {
  let totalReactions = 0;

  const db = admin.firestore();
  const pagesRef = db.collection("pages");
  const pagesSnapshot = await pagesRef.get();

  const pageIds: string[] = [];

  if (!pagesSnapshot.empty) {
    pagesSnapshot.forEach((doc) => {
      pageIds.push(doc.id);
    });
  }

  for await (const id of pageIds) {
    const reactionsRef = pagesRef.doc(id).collection("reactions");
    const reactionsSnapshot = await reactionsRef.get();

    if (!reactionsSnapshot.empty) {
      reactionsSnapshot.forEach((doc) => {
        const reactions = doc.data().uniqueIds?.length ?? 0;

        totalReactions = totalReactions + reactions;
      });
    }
  }

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  return res.status(200).send(totalReactions);
};

export default TotalReactions;
