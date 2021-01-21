import admin from "src/lib/firebaseAdmin";
import { ReactionType } from "src/lib/types";
import { NextApiHandler } from "next";

const Reaction: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const type = req.query.type as string;

  const db = admin.firestore();
  const reactionsCollection = db.collection("reactions");
  const reactionDoc = reactionsCollection.doc(id);
  const reaction = await reactionDoc.get();

  if (!reaction.exists) {
    return res.status(404).send("ID doesn't exist");
  }

  // Check for reaction type
  if (!(type in ReactionType)) {
    return res.status(400).send("Invalid Type");
  }

  const typeCollection = reactionDoc.collection("types");
  const typeDoc = typeCollection.doc(type);
  const typeData = await typeDoc.get();

  if (!typeData.exists) {
    return res.status(200).send(0);
  } else {
    return res.status(200).send(typeData.data().count);
  }
};

export default Reaction;
