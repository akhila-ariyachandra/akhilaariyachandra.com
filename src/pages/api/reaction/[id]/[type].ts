import admin from "src/lib/firebaseAdmin";
import { NextApiHandler } from "next";

const Reaction: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const type = req.query.type as string;
  const uniqueId = req.headers.uniqueid as string;

  const db = admin.firestore();
  const reactionRef = db
    .collection("pages")
    .doc(id)
    .collection("reactions")
    .doc(type);
  const reactionData = await reactionRef.get();

  if (!reactionData.exists) {
    return res.status(200).send({
      count: 0,
      reacted: false,
    });
  } else {
    const reacted: boolean = uniqueId
      ? reactionData.data().uniqueIds.includes(uniqueId)
      : false;

    return res.status(200).send({
      count: reactionData.data().uniqueIds.length,
      reacted,
    });
  }
};

export default Reaction;
