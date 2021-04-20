import admin from "@/lib/firebase-admin";
import type { NextApiHandler } from "next";
import { ReactionType } from "@/lib/types";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const Reaction: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const db = getFirestore(admin);

    const {
      headers: { uniqueid: uniqueId },
      body: { id, type },
    } = req;

    if (!uniqueId) {
      return res.status(401).send("Unauthorized");
    }

    if (!id || !type) {
      return res.status(400).send("Incorrect Body");
    }

    // Check for reaction type
    if (!(type in ReactionType)) {
      return res.status(400).send("Invalid Type");
    }

    const reactionRef = db
      .collection("pages")
      .doc(id)
      .collection("reactions")
      .doc(type);
    const reactionData = await reactionRef.get();

    let operation: FieldValue;

    if (!reactionData.exists) {
      operation = FieldValue.arrayUnion(uniqueId);
    } else {
      if (reactionData.data().uniqueIds.includes(uniqueId)) {
        operation = FieldValue.arrayRemove(uniqueId);
      } else {
        operation = FieldValue.arrayUnion(uniqueId);
      }
    }

    await reactionRef.set(
      {
        uniqueIds: operation,
      },
      { merge: true }
    );

    return res.status(200).send("OK");
  } else {
    return res.status(405).send("Incorrect Method");
  }
};

export default Reaction;
