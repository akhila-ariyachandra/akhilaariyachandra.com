import admin from "src/lib/firebaseAdmin";
import type { NextApiHandler } from "next";

const TotalViews: NextApiHandler = async (req, res) => {
  let totalViews = 0;

  const db = admin.firestore();
  const pagesRef = db.collection("pages");
  const pagesSnapshot = await pagesRef.get();

  if (!pagesSnapshot.empty) {
    pagesSnapshot.forEach((doc) => {
      const hits = doc.data().hits ?? 0;

      totalViews = totalViews + hits;
    });
  }

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  return res.status(200).send(totalViews);
};

export default TotalViews;
