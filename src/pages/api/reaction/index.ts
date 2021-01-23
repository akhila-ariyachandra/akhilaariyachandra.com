import admin from "src/lib/firebaseAdmin";
import type { NextApiHandler } from "next";
import { ReactionType } from "src/lib/types";

const Reaction: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const {
      headers: { uuid },
      body: { id, type },
    } = req;

    if (!uuid) {
      return res.status(401).send("Unauthorized");
    }

    if (!id || !type) {
      return res.status(400).send("Incorrect Body");
    }

    // Check for reaction type
    if (!(type in ReactionType)) {
      return res.status(400).send("Invalid Type");
    }

    const db = admin.firestore();
    const typeRef = db
      .collection("reactions")
      .doc(id)
      .collection("types")
      .doc(type);
    const typeData = await typeRef.get();

    let operation: admin.firestore.FieldValue;

    if (!typeData.exists) {
      operation = admin.firestore.FieldValue.arrayUnion(uuid);
    } else {
      if (typeData.data().uniqueIds.includes(uuid)) {
        operation = admin.firestore.FieldValue.arrayRemove(uuid);
      } else {
        operation = admin.firestore.FieldValue.arrayUnion(uuid);
      }
    }

    await typeRef.set({
      uniqueIds: operation,
    });

    return res.status(200).send("OK");
  } else {
    return res.status(405).send("Incorrect Method");
  }
};

export default Reaction;
