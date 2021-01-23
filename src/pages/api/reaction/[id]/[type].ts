import admin from "src/lib/firebaseAdmin";
import { NextApiHandler } from "next";

const Reaction: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const type = req.query.type as string;
  const uuid = req.headers.uuid as string;

  const db = admin.firestore();
  const typeRef = db
    .collection("reactions")
    .doc(id)
    .collection("types")
    .doc(type);
  const typeData = await typeRef.get();

  if (!typeData.exists) {
    return res.status(200).send({
      count: 0,
      reacted: false,
    });
  } else {
    const reacted: boolean = uuid
      ? typeData.data().uniqueIds.includes(uuid)
      : false;

    return res.status(200).send({
      count: typeData.data().uniqueIds.length,
      reacted,
    });
  }
};

export default Reaction;
